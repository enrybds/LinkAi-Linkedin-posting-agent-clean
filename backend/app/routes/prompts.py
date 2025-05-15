from fastapi import APIRouter, HTTPException
from typing import List
import json
import os

PROMPTS_FILE = os.path.join(os.path.dirname(__file__), '../data/prompts.json')

router = APIRouter()

@router.get("/", response_model=List[dict])
def list_prompts():
    try:
        with open(PROMPTS_FILE, 'r') as f:
            prompts = json.load(f)
        return prompts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=dict)
def add_prompt(prompt: dict):
    try:
        with open(PROMPTS_FILE, 'r+') as f:
            prompts = json.load(f)
            new_id = max([p['id'] for p in prompts], default=0) + 1
            prompt['id'] = new_id
            prompts.append(prompt)
            f.seek(0)
            json.dump(prompts, f, indent=2)
            f.truncate()
        return prompt
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{prompt_id}", response_model=dict)
def update_prompt(prompt_id: int, prompt: dict):
    try:
        with open(PROMPTS_FILE, 'r+') as f:
            prompts = json.load(f)
            for i, p in enumerate(prompts):
                if p['id'] == prompt_id:
                    prompt['id'] = prompt_id
                    prompts[i] = prompt
                    break
            else:
                raise HTTPException(status_code=404, detail="Prompt no encontrado")
            f.seek(0)
            json.dump(prompts, f, indent=2)
            f.truncate()
        return prompt
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
