from fastapi import APIRouter, HTTPException
from app.config import settings
from app.models.auth import ProfileCreate, Profile, AuthUrl
import httpx
import urllib.parse
import json
import os

router = APIRouter()

PROFILES_FILE = "profiles.json"

def load_profiles():
    if os.path.exists(PROFILES_FILE):
        with open(PROFILES_FILE, "r") as f:
            data = json.load(f)
            return [Profile(**p) for p in data]
    return []

def save_profiles():
    with open(PROFILES_FILE, "w") as f:
        json.dump([p.dict() for p in profiles], f)

# Carga perfiles al iniciar
profiles = load_profiles()

@router.post("/profiles", response_model=Profile)
async def create_profile(profile: ProfileCreate):
    new_id = (max([p.id for p in profiles], default=0) + 1)
    new_profile = Profile(id=new_id, name=profile.name, access_token=None, actor=None)
    profiles.append(new_profile)
    save_profiles()
    return new_profile

@router.get("/profiles", response_model=list[Profile])
async def list_profiles():
    return profiles

@router.get("/linkedin/{profile_id}", response_model=AuthUrl)
async def get_linkedin_auth_url(profile_id: int):
    profile = next((p for p in profiles if p.id == profile_id), None)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    state = str(profile_id)
    # Usar scopes válidos según LinkedIn actual: profile y w_member_social
    params = {
        "response_type": "code",
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "state": state,
