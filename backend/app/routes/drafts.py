from fastapi import APIRouter, HTTPException
from app.models.drafts import Draft, DraftCreate
import json
import os
from datetime import datetime

router = APIRouter()
DRAFTS_PATH = "app/data/drafts.json"

def load_drafts():
    if not os.path.exists(DRAFTS_PATH):
        return []
    with open(DRAFTS_PATH, "r") as f:
        return json.load(f)

def save_drafts(drafts):
    with open(DRAFTS_PATH, "w") as f:
        json.dump(drafts, f, ensure_ascii=False, indent=2)

@router.get("/drafts")
def get_drafts():
    return load_drafts()

@router.post("/drafts")
def create_draft(draft: DraftCreate):
    drafts = load_drafts()
    new_id = (max([d["id"] for d in drafts]) + 1) if drafts else 1
    now = datetime.utcnow().isoformat()
    new_draft = draft.dict()
    new_draft["id"] = new_id
    new_draft["created_at"] = now
    new_draft["updated_at"] = now
    new_draft["published"] = False
    drafts.append(new_draft)
    save_drafts(drafts)
    return new_draft

@router.put("/drafts/{draft_id}")
def update_draft(draft_id: int, draft: DraftCreate):
    drafts = load_drafts()
    idx = next((i for i, d in enumerate(drafts) if d["id"] == draft_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Draft not found")
    now = datetime.utcnow().isoformat()
    updated = draft.dict()
    updated["id"] = draft_id
    updated["created_at"] = drafts[idx]["created_at"]
    updated["updated_at"] = now
    updated["published"] = drafts[idx].get("published", False)
    drafts[idx] = updated
