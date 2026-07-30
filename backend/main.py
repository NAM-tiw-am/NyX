from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.database import engine
from backend.database.session import Base

# Import all models so Alembic/SQLAlchemy can see them
import backend.models  # noqa: F401

# Routers
from backend.api import (
    users,
    income,
    expenses,
    budgets,
    goals,
    investments,
    insurance,
    dashboard,
    demo,
    inventory,
    achievements_quests,
    notifications,
    ai,
)

app = FastAPI(
    title="FinQuest API",
    description="""
## 🐉 FinQuest — Gamified Personal Finance RPG

Your financial life, reimagined as an RPG adventure.

### Features
- 🧙 **Character System** — Create your hero with class, avatar & customization
- 💰 **Income & Expense Tracking** — Every entry affects your HP and XP
- 🛡️ **Insurance Buffs** — Real insurance = real in-game protection
- 📈 **Investment Portfolio** — Track returns and level up your wealth
- 🏆 **Achievements** — Unlock badges as you hit financial milestones
- ⚔️ **Daily Quests** — Earn gold through consistent financial habits
- 🦉 **Athena AI** — Your AI owl companion for financial insights
- 🏪 **Item Shop** — Spend gold on cosmetic items
- 📊 **Dashboard** — Complete financial + RPG status in one call
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allows all origins — fine for a hackathon project.
# For production, replace ["*"] with your frontend URL(s).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,   # must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Total-Count"],  # for pagination metadata
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(users.router)
app.include_router(income.router)
app.include_router(expenses.router)
app.include_router(budgets.router)
app.include_router(goals.router)
app.include_router(investments.router)
app.include_router(insurance.router)
app.include_router(dashboard.router)
app.include_router(demo.router)
app.include_router(inventory.router)
app.include_router(achievements_quests.router)
app.include_router(notifications.router)
app.include_router(ai.router)


# ── Root & Health ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "🐉 Welcome to FinQuest API",
        "docs": "/docs",
        "version": "1.0.0",
        "status": "online",
    }


@app.get("/health", tags=["Root"])
def health_check():
    return {"status": "healthy", "app": settings.APP_NAME, "env": settings.APP_ENV}
