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
        logger.info("Serving from cache")
        return _cache["data"]
    logger.info("Refreshing cache from Google Sheets")
    gc = gspread.service_account(filename="credentials.json")
    ...
    _cache["data"] = data
    _cache["timestamp"] = time()
    return data
