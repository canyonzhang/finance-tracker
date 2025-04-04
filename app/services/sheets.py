import gspread
from dotenv import load_dotenv
import os
import logging

load_dotenv()
logger = logging.getLogger("uvicorn.access")

gc = gspread.service_account(filename="credentials.json") # opens based off the credentials.json generated from the google sheets service
# account created in google cloud
sheet = gc.open_by_key(os.getenv("GOOGLE_SHEET_ID")).sheet1

def get_sheet_data():
    data = {}
    # loop over the list of dictionaries returned from the google sheet id, 
    for worksheet in gc.open_by_key(os.getenv("GOOGLE_SHEET_ID")).worksheets():
        data[worksheet.title] = worksheet.get_all_values()
    return data 