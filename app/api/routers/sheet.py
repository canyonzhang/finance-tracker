from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi import Request
from fastapi.responses import JSONResponse
from app.api.services.sheets import get_sheet_data
from app.api.services.sheets import create_new_template
import logging
from app.api.models.TemplateRequest import TemplateCreateRequest

logger = logging.getLogger("finance-tracker")
logger.setLevel(logging.INFO)
router = APIRouter()

@router.get("/sheet", response_class=HTMLResponse)
def read_sheet(request: Request):
    sheet_data = get_sheet_data()
    return JSONResponse(content=sheet_data)

@router.get("/sheet/{month}", response_class=HTMLResponse)
def read_month(month: str, request: Request):
    sheet_data = get_sheet_data()
    month_data = sheet_data.get(month)
    # logger.info("Sheet data for %s fetched successfully: %s", month, month_data)
    return JSONResponse(content={"month": month, "data": month_data})

@router.post("/create-template", response_class=HTMLResponse)
# receive the payload as a TemplateCreateRequest object 
def create_sheet(payload: TemplateCreateRequest) -> JSONResponse: 
    create_new_template(payload) # we can forward the payload to our services
    return result

