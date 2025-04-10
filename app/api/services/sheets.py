import gspread
from dotenv import load_dotenv
import os
import logging
from functools import lru_cache
from time import time
from app.api.models.TemplateRequest import TemplateCreateRequest

load_dotenv()
logger = logging.getLogger("finance-tracker")
logger.setLevel(logging.INFO)

_cache = {}
TTL = 14400  # 4 hours
gc = gspread.service_account(filename="credentials.json")
# add manual time based caching
def get_sheet_data():
    if "data" in _cache and time() - _cache["timestamp"] < TTL:
        logger.info("Cache Hit")
        return _cache["data"]
    logger.info("Refreshing cache from Google Sheets")
    data = {}
    for worksheet in gc.open_by_key(os.getenv("GOOGLE_SHEET_ID")).worksheets():
        data[worksheet.title] = worksheet.get_all_values()
    _cache["data"] = data
    _cache["timestamp"] = time()
    logger.info("Cache Miss")
    return _cache["data"]
# allows a user to create a new template and save it to the Google Sheets
def create_new_template(payload : TemplateCreateRequest):
    spreadsheet = gc.open_by_key(os.getenv("GOOGLE_SHEET_ID"))
    # INCOME SECTION
    worksheet = spreadsheet.add_worksheet(title=payload.name, rows="100", cols="10")
    generate_income_section(worksheet, payload)
    # BUDGETING SECTION
    generate_budget_section(worksheet, payload)
    logger.info("Template %s created successfully", payload.name)

def generate_income_section(worksheet, payload):
    cur_row = 1
    worksheet.merge_cells(f"A{cur_row}:C{cur_row}")
    worksheet.update(f"A{cur_row}:C{cur_row}", [["INCOME SECTION"]])
    worksheet.update("A{cur_row}:C{cur_row}", [["INCOME", "Expected", "Actual"]])
    # Calculate per-paycheck value
    paycheck_value = round(payload.totalPay / payload.paycheckCount, 2)
    income_rows = []
    # Add paycheck rows
    for i in range(payload.paycheckCount):
        income_rows.append([f"Paycheck {i+1}", f"${paycheck_value:,.2f}", "$0.00"])
    # Add optional extra income
    if payload.includeExtraIncome:
        income_rows.append([payload.extraIncomeLabel, "", "$0.00"])
    # Add TOTAL INCOME (sum of totalPay)
    income_rows.append(["TOTAL INCOME", f"${payload.totalPay:,.2f}", "$0.00"])
    # Add pulled from sinking fund
    income_rows.append(["Pulled from sinking fund", "", ""])
    # Add final TOTAL row
    income_rows.append(["TOTAL", f"${payload.totalPay:,.2f}", "$0.00"])
    # Write to sheet starting at A2
    worksheet.update(f"A2:C{2 + len(income_rows) - 1}", income_rows)

def generate_budget_section(worksheet, payload: TemplateCreateRequest):
    cur_row = 11
    worksheet.merge_cells(f"A{cur_row}:D{cur_row}")
    worksheet.update(f"A{cur_row}:D{cur_row}", [["BUDGET SECTION"]])
    worksheet.update("A{cur_row}:D{cur_row}", [["EXPENSE", "BUDGET", "ACTUAL", "DIFFERENCE"]])
    expenses = payload.budgetItems
    for expense in expenses:
        name, budget, saving = expense.name, expense.amount, expense.saving
        worksheet.update(f"A{cur_row+1}:D{cur_row+1}", [[name, budget, "0.00", int(budget) - int(saving) if saving else int(budget) + int(saving)]])    
        cur_row += 1
    # Taxes (static row)
    worksheet.update(f"A{cur_row}:D{cur_row}", [["Taxes", "$3000.00", "$0.00", "=B{cur_row}-C{cur_row}"]])
    cur_row += 1
    # track total saving based on expenses marking saving == True
    worksheet.update(f"A{cur_row+1}:D{cur_row+1}", [["TOTAL SAVED", sum(expense.amount for expense in expenses if expense.saving), "0.00", sum(int(expense.amount) - int(expense.saving) if expense.saving else int(expense.amount) + int(expense.saving) for expense in expenses)]])
    cur_row += 1
    # track net spending vs saving as the  difference between total saving expenses - total non saving expenses
    total_saving = sum(exp.amount for exp in expenses if exp.saving)
    total_spending = sum(exp.amount for exp in expenses if not exp.saving)
    net_saved = payload.totalPay - total_spending - get_tax_amount(payload)
    cur_row += 1
    worksheet.update(f"A{cur_row+1}:D{cur_row+1}",[["NET SAVING", f"${net_saved:,.2f}", "$0.00", f"=${net_saved:.2f}"]])

def get_tax_amount(payload: TemplateCreateRequest) -> float:
    # Example simplified effective tax rates by major city (2025 estimated averages)
    CITY_TAX_RATES = {
        "NEW YORK CITY": 0.304,
        "SAN FRANCISCO": 0.297,
        "LOS ANGELES": 0.295,
        "CHICAGO": 0.285,
        "AUSTIN": 0.267,
        "MIAMI": 0.265,
        "SEATTLE": 0.27,
        "ATLANTA": 0.275,
        "BOSTON": 0.29,
        "DENVER": 0.28,
        "WASHINGTON DC": 0.285,
        "MINNEAPOLIS": 0.28,
        "PHOENIX": 0.265,
        "LAS VEGAS": 0.26,
        "PHILADELPHIA": 0.29,
        "DALLAS": 0.266,
        "HOUSTON": 0.266,
        "DETROIT": 0.28,
        "CHARLOTTE": 0.27,
        "SAN DIEGO": 0.293,
        "SAN JOSE": 0.296,
        "PORTLAND": 0.278,
        "COLUMBUS": 0.272,
        "INDIANAPOLIS": 0.27,
        "JACKSONVILLE": 0.265,
        "NASHVILLE": 0.27,
        "OKLAHOMA CITY": 0.268,
        "MILWAUKEE": 0.275,
        "LOUISVILLE": 0.273,
        "MEMPHIS": 0.268,
        "RALEIGH": 0.27,
        "NEW ORLEANS": 0.275,
        "SALT LAKE CITY": 0.27,
        "KANSAS CITY": 0.274,
        "ALBUQUERQUE": 0.266,
        "TUCSON": 0.265
    }

    city = payload.location.upper().strip()
    rate = CITY_TAX_RATES.get(city, 0.08)  # Default to 8% if city not listed

    estimated_tax = round(payload.totalPay * rate, 2)
    return estimated_tax