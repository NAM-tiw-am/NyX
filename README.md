# 🐉 FinQuest — Gamified Personal Finance RPG

> Transform your financial life into an epic RPG adventure. Track income, slay debt monsters, level up your character, and unlock achievements as you build real financial habits.

---

## 📖 Overview

FinQuest is a modern finance management platform that makes budgeting and expense tracking feel like a game. Users earn XP, unlock achievements, complete daily quests, maintain streaks, and get AI-powered financial insights — all while building genuine financial discipline.

---

## 🛠 Tech Stack

### Backend (this repo — `backend` branch)

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI (Python 3.11+) |
| Database | PostgreSQL (hosted on Supabase) |
| ORM | SQLAlchemy 2.0 |
| Migrations | Alembic |
| AI | Google Gemini API (`google-genai`) |
| Server | Uvicorn |
| Deployment | Vercel (Python serverless) |

### Frontend (separate repo/branch)

| Layer | Technology |
|-------|-----------|
| Framework | React + Next.js (TypeScript) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| State | Zustand |
| Data Fetching | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Deployment | Vercel |

---

## 🗂 Project Structure

```
Team-NyX-backend/
├── api/
│   └── index.py              # Vercel Python entry point
├── app/
│   ├── api/                  # Route handlers (one file per feature)
│   │   ├── achievements_quests.py
│   │   ├── ai.py
│   │   ├── budgets.py
│   │   ├── dashboard.py
│   │   ├── expenses.py
│   │   ├── goals.py
│   │   ├── income.py
│   │   ├── insurance.py
│   │   ├── inventory.py
│   │   ├── investments.py
│   │   ├── notifications.py
│   │   └── users.py
│   ├── database/             # DB session and connection
│   ├── models/               # SQLAlchemy ORM models
│   ├── schemas/              # Pydantic request/response schemas
│   ├── services/             # Business logic (gamification, AI)
│   ├── config.py             # Settings from .env
│   └── main.py               # FastAPI app + CORS + router registration
├── alembic/                  # Database migrations
├── .env.example              # Environment variable template
├── requirements.txt          # Python dependencies
├── vercel.json               # Vercel deployment config
└── README.md
```

---

## ⚡ Local Development Setup

### Prerequisites

- Python 3.11+
- A PostgreSQL database (free tier on [Supabase](https://supabase.com) works perfectly)
- Google Gemini API key ([get one free](https://aistudio.google.com/app/apikey))

### 1. Clone the repo

```bash
git clone https://github.com/NAM-tiw-am/Team-NyX---Moksh-berawala.git
cd Team-NyX---Moksh-berawala
git checkout backend
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
GEMINI_API_KEY=your_gemini_api_key_here
APP_ENV=development
APP_NAME=FinQuest
```

### 5. Run database migrations

```bash
alembic upgrade head
```

### 6. Start the development server

```bash
uvicorn app.main:app --reload --port 8000
```

The API is now running at:

| URL | Purpose |
|-----|---------|
| `http://127.0.0.1:8000` | API root |
| `http://127.0.0.1:8000/docs` | ✅ Swagger UI (interactive API docs) |
| `http://127.0.0.1:8000/redoc` | ReDoc API docs |
| `http://127.0.0.1:8000/health` | Health check |

---

## 🔌 Frontend Integration Guide

### ⚠️ No Auth System — User Identity via `user_id`

This is a hackathon project — there is no JWT or session system.
User identity works like this:

1. On first app launch → call `POST /users/` with character details
2. Store the returned `user.id` in `localStorage`:
   ```js
   localStorage.setItem("finquest_user_id", user.id)
   ```
3. Include it in **every API request URL**:
   ```js
   const userId = localStorage.getItem("finquest_user_id")
   fetch(`/users/${userId}/dashboard/`)
   ```

### Base URL

```
# Local development
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

# Production (after Vercel deploy)
NEXT_PUBLIC_API_BASE_URL=https://your-backend.vercel.app
```

### CORS

- **Development:** All origins allowed (`*`) — no config needed.
- **Production:** Update `main.py` `allow_origins` to your Vercel frontend URL.

---

## 📡 API Endpoints

> 💡 Full interactive docs with request/response schemas at **`/docs`**

### Users & Character

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/` | Create character (onboarding) |
| `GET` | `/users/{id}` | Get user profile |
| `PATCH` | `/users/{id}` | Update character cosmetics |
| `GET` | `/users/` | List all users (leaderboard) |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/{id}/dashboard/` | ⭐ Master data — returns everything in one call |

### Income

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `POST` | `/users/{id}/income/` | — | Add income source |
| `GET` | `/users/{id}/income/` | `from_date`, `to_date`, `skip`, `limit` | List income |
| `GET` | `/users/{id}/income/{income_id}` | — | Get single income |
| `PATCH` | `/users/{id}/income/{income_id}` | — | Update income |
| `DELETE` | `/users/{id}/income/{income_id}` | — | Delete income |

### Expenses

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `POST` | `/users/{id}/expenses/` | — | Log expense |
| `GET` | `/users/{id}/expenses/` | `category`, `from_date`, `to_date`, `skip`, `limit` | List expenses |
| `GET` | `/users/{id}/expenses/{expense_id}` | — | Get single expense |
| `PATCH` | `/users/{id}/expenses/{expense_id}` | — | Update expense |
| `DELETE` | `/users/{id}/expenses/{expense_id}` | — | Delete expense |

### Budgets

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `POST` | `/users/{id}/budgets/` | — | Create budget |
| `GET` | `/users/{id}/budgets/` | `month`, `year` | List budgets |
| `PATCH` | `/users/{id}/budgets/{budget_id}` | — | Update budget |
| `DELETE` | `/users/{id}/budgets/{budget_id}` | — | Delete budget |

### Savings Goals

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/{id}/goals/` | Create goal |
| `GET` | `/users/{id}/goals/` | List goals |
| `GET` | `/users/{id}/goals/{goal_id}` | Get goal |
| `PATCH` | `/users/{id}/goals/{goal_id}` | Update goal progress |
| `DELETE` | `/users/{id}/goals/{goal_id}` | Delete goal |

### Investments

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `POST` | `/users/{id}/investments/` | — | Add investment |
| `GET` | `/users/{id}/investments/` | `skip`, `limit` | List investments |
| `GET` | `/users/{id}/investments/{inv_id}` | — | Get investment |
| `PATCH` | `/users/{id}/investments/{inv_id}` | — | Update investment |
| `DELETE` | `/users/{id}/investments/{inv_id}` | — | Soft delete |

### Insurance

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/{id}/insurance/` | Add insurance |
| `GET` | `/users/{id}/insurance/` | List insurance |
| `PATCH` | `/users/{id}/insurance/{ins_id}` | Update insurance |
| `DELETE` | `/users/{id}/insurance/{ins_id}` | Delete insurance |

### Gamification

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/{id}/achievements/` | Get achievements + unlock status |
| `GET` | `/users/{id}/quests/` | Get today's daily quests |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/{id}/notifications/` | Get latest 50 notifications |
| `PATCH` | `/users/{id}/notifications/{n_id}/read` | Mark one as read |
| `PATCH` | `/users/{id}/notifications/read-all` | Mark all as read |

### Inventory / Shop

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/{id}/inventory/shop` | Browse available items |
| `POST` | `/users/{id}/inventory/buy` | Purchase an item with gold |
| `GET` | `/users/{id}/inventory/` | View owned items |
| `POST` | `/users/{id}/inventory/{item_id}/equip` | Equip item |

### Athena AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/{id}/ai/analyze` | Run AI financial analysis (Gemini) |
| `GET` | `/users/{id}/ai/report` | Get latest monthly AI report |

### Root

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API info |
| `GET` | `/health` | Health check |

---

## 🗄 Database

**PostgreSQL via Supabase** (free tier)

### Running Migrations

```bash
# Apply all migrations (run this before first use)
alembic upgrade head

# Check current migration state
alembic current

# Rollback one step
alembic downgrade -1
```

---

## 🚀 Deployment

### Backend → Vercel

The backend deploys as a **Python Serverless Function** on Vercel.

#### Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: ready for deployment"
git push origin backend
```

#### Step 2 — Import into Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `/` (backend branch)
4. Set **Framework Preset** to `Other`
5. Add Environment Variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `GEMINI_API_KEY` | Your Gemini API key |
| `APP_ENV` | `production` |
| `APP_NAME` | `FinQuest` |

6. Click **Deploy**

> ✅ The `vercel.json` in this repo handles all routing automatically via `api/index.py`.

#### Step 3 — Note your backend URL

After deploy, Vercel gives you a URL like:
```
https://team-nyx-backend.vercel.app
```

Share this with the frontend dev as `NEXT_PUBLIC_API_BASE_URL`.

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the frontend GitHub repo
3. Set Framework to `Next.js`
4. Add Environment Variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend.vercel.app` |

5. Click **Deploy**

---

### GitHub — Branches

| Branch | Purpose |
|--------|---------|
| `backend` | FastAPI backend (this branch) |
| `main` / `frontend` | Next.js frontend |

> **Vercel auto-deploys on every push** to the connected branch. No CI/CD config needed for a hackathon.

---

## 📋 Error Response Format

All errors follow FastAPI's default format:

```json
{
  "detail": "User not found"
}
```

Validation errors return:

```json
{
  "detail": [
    {
      "loc": ["body", "amount"],
      "msg": "value is not a valid float",
      "type": "type_error.float"
    }
  ]
}
```

**HTTP Status Codes used:**

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `204` | Deleted (no content) |
| `400` | Bad request |
| `404` | Resource not found |
| `409` | Conflict (e.g. duplicate username) |
| `422` | Validation error |

---

## 🌟 Key Features

- 🧙 **Character System** — Create your hero with class, avatar & customization
- 💰 **Income & Expense Tracking** — Every entry affects your HP and XP
- 🛡️ **Insurance Buffs** — Real insurance = real in-game protection
- 📈 **Investment Portfolio** — Track returns and level up your wealth
- 🏆 **Achievements** — Unlock badges as you hit financial milestones
- ⚔️ **Daily Quests** — Earn gold through consistent financial habits
- 🦉 **Athena AI** — AI owl companion for personalized financial insights
- 🏪 **Item Shop** — Spend gold on cosmetic items
- 📊 **Dashboard** — Complete financial + RPG status in one API call

---

## 🔮 Future Scope

- JWT Authentication + Google OAuth
- WebSocket real-time notifications
- Receipt OCR upload
- UPI / bank integration
- Leaderboard with friends
- AI Financial Coach chat
- Credit score analysis

---

## Built with ❤️ by Team NyX

> Empowering people to build better financial habits — one quest at a time.