from pydantic import BaseModel
from typing import Optional

class PostCreate(BaseModel):
    profile_id: int
    topic: str
    include_image: bool = False
    prompt_id: int = None

class GeneratedContent(BaseModel):
    text: str
    image_url: Optional[str] = None
    image_base64: Optional[str] = None

class PublishRequest(BaseModel):
    profile_id: int
    text: str
    image_url: Optional[str] = None
