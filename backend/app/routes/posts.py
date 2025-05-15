from fastapi import APIRouter, HTTPException
from app.models.posts import PostCreate, GeneratedContent, PublishRequest
from app.services.generation import generate_text, generate_image
from app.routes.auth import profiles
import httpx

router = APIRouter()

import json

@router.post("/generate", response_model=GeneratedContent)
async def generate_content(post: PostCreate):
    profile = next((p for p in profiles if p.id == post.profile_id), None)
    if not profile or not profile.access_token:
        raise HTTPException(status_code=404, detail="Perfil no encontrado o no autenticado")
    # Obtener instrucciones del prompt seleccionado
    prompt_instructions = None
    if post.prompt_id:
        with open("app/data/prompts.json", "r") as f:
            prompts = json.load(f)
            prompt = next((p for p in prompts if p["id"] == post.prompt_id), None)
            if not prompt:
                raise HTTPException(status_code=404, detail="Prompt no encontrado")
            prompt_instructions = prompt["instructions"]
    text = await generate_text(post.topic, prompt_instructions)
    image_url = None
    image_base64 = None
    if post.include_image:
        image_result = await generate_image(post.topic)
        image_url = image_result.get("url")
        image_base64 = image_result.get("image_base64")
    print(f"[DEBUG] Imagen generada para el post: url={image_url}, base64={image_base64 is not None}")
    return GeneratedContent(text=text, image_url=image_url, image_base64=image_base64)

@router.post("/publish")
async def publish_post(request: PublishRequest):
    profile = next((p for p in profiles if p.id == request.profile_id), None)
    if not profile or not profile.access_token or not profile.actor:
        raise HTTPException(status_code=404, detail="Perfil no encontrado o no autenticado")
    headers = {
        "Authorization": f"Bearer {profile.access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
    }
    author = profile.actor
    
    print(f"[DEBUG] Author enviado a LinkedIn: {author}")
    print(f"[DEBUG] Access token (primeros 10 chars): {profile.access_token[:10]}... (longitud: {len(profile.access_token)})")
    payload = {
        "author": author,
