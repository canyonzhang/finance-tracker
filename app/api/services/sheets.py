import gspread
from dotenv import load_dotenv
import os
import logging
from functools import lru_cache
from time import time

load_dotenv()
logger = logging.getLogger("uvicorn.access")

_cache = {}
TTL = 14400  # 4 hours

# add manual time based caching
def get_sheet_data():
    if "data" in _cache and time() - _cache["timestamp"] < TTL:
        logger.info("Cache Hit")
        return _cache["data"]
    logger.info("Refreshing cache from Google Sheets")
    gc = gspread.service_account(filename="credentials.json")
    data = {}
    for worksheet in gc.open_by_key(os.getenv("GOOGLE_SHEET_ID")).worksheets():
        data[worksheet.title] = worksheet.get_all_values()
    _cache["data"] = data
    _cache["timestamp"] = time()
    logger.info("Cache Miss")
    return _cache["data"]
# allows a user to create a new template and save it to the Google Sheets
# def create_new_template():
