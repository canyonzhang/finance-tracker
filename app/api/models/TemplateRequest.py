from pydantic import BaseModel
from typing import List

class BudgetItem(BaseModel):
    name: str
    amount: float
    saving: bool # True == positive, False == negative

# Follows with JSON sent to us from TemplateModal.tsx
class TemplateCreateRequest(BaseModel):
    name: str
    paycheckCount: int
    totalPay: float
    includeExtraIncome: bool
    extraIncomeLabel: str
    budgetItems: List[BudgetItem] # list of BudgetItem objects
    location: str # city, state, country