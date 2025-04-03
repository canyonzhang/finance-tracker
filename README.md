# 📊 Finance Tracker

A personal finance tracking application built with FastAPI. This tool is designed to help you monitor your income, spending, and net worth, while integrating with services like Google Sheets and Plaid for real-time data tracking.

## 🌟 Goals

- Learn FastAPI and backend architecture
- Visualize personal financial trends over time
- Integrate with Google Sheets and bank APIs (e.g. Plaid)
- Build a user-friendly UI with interactive charts

## ✅ Current Features

- Pulls financial data from Google Sheets
- FastAPI server with modular structure
- Simple UI rendered using Jinja2

## 🛠 Tech Stack

- **Backend**: FastAPI
- **Frontend**: Jinja2 (for now), eventually React or HTMX
- **Data Source**: Google Sheets (via gspread)
- **Environment**: Python 3.11+ with virtual environment
- **Other**: dotenv for secrets, pandas for data handling

## 🚀 Getting Started

```bash
# activate environment
source venv/bin/activate

# install dependencies
pip install -r requirements.txt

# run server
uvicorn app.main:app --reload
```
