# 🚀 LinkAi: LinkedIn Posting Agent

Create, edit, and publish engaging LinkedIn posts with the power of AI! LinkAi combines OpenAI's content generation with LinkedIn's API to make your professional posting seamless and smart.

---

## ✨ Features

- 🎯 **AI-Powered Post Generation** (OpenAI integration)
- 📝 **Draft Management** (Save, edit, delete, and publish drafts)
- 📋 **Prompt Library** (Manage and select creative prompts)
- 📢 **One-Click Publishing** (Direct to LinkedIn)
- 🕓 **Publication History** (See all your published posts)
- 🖼️ **Optional Image Generation**

---

## 🏗️ Architecture Overview

```mermaid
flowchart TD
    A[Frontend (React)] -- Axios REST --> B[Backend (FastAPI)]
    B -- OpenAI API --> C(OpenAI)
    B -- LinkedIn API --> D(LinkedIn)
    B -- Reads/Writes --> E[Drafts/Profiles JSON]
```

- **Frontend:** Modern, responsive React UI inspired by LinkedIn's design.
- **Backend:** FastAPI handles business logic, OpenAI calls, and LinkedIn API integration.

---

## 🖥️ How It Works

1. **Select a Prompt** from the library or write your own ✍️
2. **Enter a Topic** for your post
3. **Generate Content** with AI (optionally add an image)
4. **Edit & Preview** the post in a LinkedIn-like mockup
5. **Save as Draft** or **Publish** directly to LinkedIn 🚀
6. **Manage Drafts & Published Posts** from the dashboard

---

## ⚡ Quick Start

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm start
```

- Configure your `.env` with OpenAI and LinkedIn API keys.

---

## 📂 Project Structure

```
frontend/
  └── src/
      ├── components/
      ├── api/
      └── styles.css
backend/
  └── app/
      ├── routes/
      ├── models/
      ├── services/
      └── main.py
```

---

## 🙌 Author
**Enrique Bartolomé**

---

## 🛡️ Security & Privacy
- Tokens and secrets are handled via environment variables.
- No sensitive data is stored in the repo.

---

> _"Let AI help you shine on LinkedIn!"_
