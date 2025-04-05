from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import sheet

app = FastAPI()
app.include_router(sheet.router, prefix="/api")
# Allow your React frontend to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
