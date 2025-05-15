import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import PromptsManager from "./components/PromptsManager";
import PromptInstructionForm from "./components/PromptInstructionForm";
import PostPreview from "./components/PostPreview";
import DraftsManager from "./components/DraftsManager";
import PublishedManager from "./components/PublishedManager";
import { generatePost, publishPost } from "./api/backend";
import "./styles.css";
import "./components/LinkedInMockup.css";
import liinkaiLogo from './assets/liinkai-logo.png';

export default function App() {
  const [section, setSection] = useState('generator'); // 'generator', 'drafts', 'published', 'prompts'
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ text: "", image_url: "", image_base64: "" });
  const [profileId] = useState(1); // Por ahora, perfil fijo
  const [error, setError] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  // Paso 1: tema → post+imagen
  const handleGeneratePost = async (topic, includeImage) => {
    if (!selectedPrompt) {
      setError("Selecciona un prompt antes de generar el post.");
      return;
    }
    setLoading(true); setError("");
    try {
      const res = await generatePost(topic, includeImage, profileId, selectedPrompt.id);
      setPost(res);
      setStep(2);
    } catch (e) {
      setError("Error generando publicación: " + (e?.response?.data?.detail || e.message));
    } finally { setLoading(false); }
  };


  

  // Paso 3: publicar
  const handlePublish = async () => {
    setLoading(true); setError("");
    try {
      await publishPost(profileId, post.text, post.image_url);
      alert("¡Publicado en LinkedIn!");
      setStep(1); setPrompts({ post_prompt: "", image_prompt: "" }); setPost({ text: "", image_url: "", image_base64: "" });
    } catch (e) {
      setError("Error publicando: " + (e?.response?.data?.detail || e.message));
    } finally { setLoading(false); }
  };
