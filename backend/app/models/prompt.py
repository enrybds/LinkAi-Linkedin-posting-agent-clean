from pydantic import BaseModel

class PromptInstruction(BaseModel):
    instructions: str

class PromptPair(BaseModel):
    post_prompt: str
    image_prompt: str

class PromptGenerated(BaseModel):
    prompt: str
