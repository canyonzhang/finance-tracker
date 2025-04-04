from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi import Request
from fastapi.responses import JSONResponse
from app.services.sheets import get_sheet_data
import logging


logger = logging.getLogger("uvicorn.access")

router = APIRouter()

@router.get("/sheet", response_class=HTMLResponse)
def read_sheet(request: Request):
    sheet_data = get_sheet_data()
    return JSONResponse(content=sheet_data)

@router.get("/sheet/{month}", response_class=HTMLResponse)
def read_month(month: str, request: Request):
    sheet_data = get_sheet_data()
    month_data = sheet_data.get(month)
    logger.info("Sheet data for %s fetched successfully: %s", month, month_data)
    return JSONResponse(content={"month": month, "data": month_data})