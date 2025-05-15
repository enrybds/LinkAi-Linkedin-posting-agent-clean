# Plan de Proyecto: App de Creación y Publicación de Posts en LinkedIn

## 1. Introducción
Una plataforma web que permita generar automáticamente textos e imágenes (y opcionalmente vídeos) para posts en LinkedIn, adaptables a múltiples marcas o perfiles.

## 2. Objetivos
- Automatizar la creación de contenido para LinkedIn.
- Soportar perfiles/marcas configurables.
- Generar imágenes (y vídeos).
- Publicar directamente en LinkedIn vía API.

## 3. Requisitos

### Funcionales
- Registro y gestión de uno o varios perfiles LinkedIn.
- Editor de texto con plantillas y variables por marca.
- Generación de imágenes (OpenAI DALL·E, Stable Diffusion, etc.).
- (Opcional) Generación de vídeos cortos.
- Programación y publicación automática vía LinkedIn API (OAuth2).
- Historial y seguimiento de publicaciones.

### No funcionales
- Escalable (microservicios / contenedores).
- Seguro (almacenamiento cifrado de tokens).
- Modular y mantenible.
- UI/UX moderna y responsiva.

## 4. Metodología
- Enfoque ágil (Sprints de 2 semanas).
- Reunión de kick-off, demo al final de cada sprint, retrospectiva.

## 5. Fases del Proyecto

### Fase 1: Análisis y Diseño de Requisitos
- Actividades:
  - Reunir requisitos detallados.
  - Definir casos de uso y flujos.
  - Especificar endpoints de LinkedIn API y cuotas.
  - Seleccionar motores de IA para texto, imagen y vídeo.
- Entregables: Documento de requisitos y diagrama de casos de uso.

### Fase 2: Arquitectura y Diseño
- Actividades:
  - Definir arquitectura general (backend, frontend, servicios IA).
  - Diseño de base de datos.
  - Diagramas de secuencia para creación y publicación.
  - Wireframes de UI.
- Entregables: Diagrama de arquitectura, esquema de BD, prototipos UI.

### Fase 3: Infraestructura y CI/CD
