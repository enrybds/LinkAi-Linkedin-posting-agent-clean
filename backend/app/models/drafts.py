from pydantic import BaseModel
from typing import Optional

class Draft(BaseModel):
    id: int
    profile_id: int
    topic: str
    text: str
    image_url: Optional[str] = None
    image_base64: Optional[str] = None
    prompt_id: Optional[int] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    published: bool = False

class DraftCreate(BaseModel):
    profile_id: int
    topic: str
    text: str
    image_url: Optional[str] = None
    image_base64: Optional[str] = None
    prompt_id: Optional[int] = None
