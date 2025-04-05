import gspread
from dotenv import load_dotenv
import os
import logging
from functools import lru_cache
from time import time
from app.api.models.TemplateRequest import TemplateCreateRequest

load_dotenv()
logger = logging.getLogger("uvicorn.access")

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
    worksheet = spreadsheet.add_worksheet(title=payload.name, rows="100", cols="10")
    generate_income_section(worksheet, payload)
    # BUDGETING SECTION


def generate_income_section(worksheet, payload):
    # INCOME SECTION
    worksheet.update("A1:C1", [["INCOME", "Expected", "Actual"]])
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

# def generate_budget_header(worksheet, start_row: int):
    