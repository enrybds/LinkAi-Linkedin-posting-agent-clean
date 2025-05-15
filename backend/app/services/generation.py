import asyncio
import openai
from app.config import settings

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

async def generate_text(topic: str, instrucciones: str = None) -> str:
    """
    Genera el texto final de un post de LinkedIn a partir del tema y unas instrucciones (prompt).
    """
    if instrucciones is None:
        instrucciones = f"""
Eres Enrique Bartolomé De Saá, experto en tu sector. Escribe un post para LinkedIn sobre el siguiente tema: {topic}.
Sigue estas instrucciones:
- Hazlo personal y auténtico: cuenta historias reales, usa anécdotas, aprendizajes y emociones genuinas. No temas mostrar vulnerabilidad o fracasos.
- Habla con voz cercana y natural, como si lo contaras a un amigo. Evita tecnicismos y frases hechas.
- Da valor: comparte consejos, aprendizajes, errores, datos o recursos útiles.
- Incluye llamada a la acción o pregunta para animar a la conversación.
- Si el tema lo permite, usa humor, memes o referencias culturales.
- Incluye imágenes propias o relevantes (si se genera imagen).
- Sé breve pero impactante (300-800 caracteres).
- Si el tema lo permite, incluye datos curiosos o memes.
"""
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": instrucciones}
            ],
            max_tokens=600,
            temperature=0.7
        )
    )
    return response.choices[0].message.content.strip()

async def generate_image(prompt: str) -> dict:
    loop = asyncio.get_event_loop()
    try:
        response = await loop.run_in_executor(
            None,
            lambda: client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                size="1024x1024"
            )
        )
        url = None
        image_base64 = None
