from fastapi import FastAPI
from app.config import settings
from app.routes.auth import router as auth_router
from app.routes.posts import router as posts_router
from app.routes.prompts import router as prompts_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(posts_router, prefix="/posts", tags=["posts"])
app.include_router(prompts_router, prefix="/prompts", tags=["prompts"])

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}
