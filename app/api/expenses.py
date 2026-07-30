from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import User, Expense, Budget
from app.models.expense import ExpenseCategory
from app.models.budget import BudgetCategory
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseOut, ExpenseCreateResponse
from app.services.gamification import process_expense_event

router = APIRouter(prefix="/users/{user_id}/expenses", tags=["Expenses"])


def _get_user(user_id: int, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def _update_budget(user_id: int, category: ExpenseCategory, amount: float, db: Session):
    """Automatically increment budget spending when an expense is logged."""
    from datetime import date
    today = date.today()
    budget_cat = BudgetCategory(category.value) if category.value in BudgetCategory.__members__.values() else None
    if not budget_cat:
        return

    budget = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.category == budget_cat,
        Budget.month == today.month,
        Budget.year == today.year,
    ).first()

    if budget:
        budget.current_spent += amount
        # Warning notifications handled inside gamification


@router.post("/", response_model=ExpenseCreateResponse, status_code=201)
def add_expense(user_id: int, payload: ExpenseCreate, db: Session = Depends(get_db)):
    """Log a new expense. Triggers HP damage + full gamification pipeline."""
    user = _get_user(user_id, db)

    expense = Expense(user_id=user_id, **payload.model_dump())
    db.add(expense)
    db.flush()

    _update_budget(user_id, expense.category, expense.amount, db)
    gamification = process_expense_event(user, expense, db)

    db.commit()
    db.refresh(expense)

    return ExpenseCreateResponse(expense=expense, gamification=gamification)


@router.get("/", response_model=List[ExpenseOut])
def list_expenses(
    user_id: int,
    category: Optional[ExpenseCategory] = Query(None),
    db: Session = Depends(get_db)
):
    _get_user(user_id, db)
    query = db.query(Expense).filter(Expense.user_id == user_id)
    if category:
        query = query.filter(Expense.category == category)
    return query.order_by(Expense.date_spent.desc()).all()


@router.get("/{expense_id}", response_model=ExpenseOut)
def get_expense(user_id: int, expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(
        Expense.id == expense_id, Expense.user_id == user_id
    ).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@router.patch("/{expense_id}", response_model=ExpenseOut)
def update_expense(user_id: int, expense_id: int, payload: ExpenseUpdate, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(
        Expense.id == expense_id, Expense.user_id == user_id
    ).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(expense, field, value)

    db.commit()
    db.refresh(expense)
    return expense


@router.delete("/{expense_id}", status_code=204)
def delete_expense(user_id: int, expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(
        Expense.id == expense_id, Expense.user_id == user_id
    ).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
