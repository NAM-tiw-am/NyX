# Vercel Python entry point — imports the FastAPI app from backend/main.py
# Vercel looks for a file at api/index.py as the serverless handler.
from backend.main import app
