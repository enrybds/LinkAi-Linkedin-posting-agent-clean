from pydantic import BaseModel
from typing import Optional, List

class ProfileBase(BaseModel):
    name: str

class ProfileCreate(ProfileBase):
    pass

class Profile(ProfileBase):
    id: int
    access_token: Optional[str] = None
    actor: Optional[str] = None

    class Config:
        orm_mode = True

class AuthUrl(BaseModel):
    auth_url: str
