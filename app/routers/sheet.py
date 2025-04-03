from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.services.sheets import get_sheet_data

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/sheet", response_class=HTMLResponse)
def read_sheet(request: Request):
    sheet_data = get_sheet_data()
    return templates.TemplateResponse("sheet_overview.html", {"request": request, "sheet_data": sheet_data})

@router.get("/sheet/{month}", response_class=HTMLResponse)
def read_month(month: str, request: Request):
    sheet_data = get_sheet_data()
    month_data = sheet_data.get(month)
    return templates.TemplateResponse("sheet_month.html", {"request": request, "month": month, "data": month_data})