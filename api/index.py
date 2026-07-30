# Vercel Python entry point — imports the FastAPI app from app/main.py
# Vercel looks for a file at api/index.py as the serverless handler.
from app.main import app
