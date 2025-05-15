from fastapi import APIRouter
import json
import os

router = APIRouter()
PUBLISHED_PATH = "app/data/published.json"

@router.get("/published")
def get_published():
    if not os.path.exists(PUBLISHED_PATH):
        return []
    with open(PUBLISHED_PATH, "r") as f:
        return json.load(f)
