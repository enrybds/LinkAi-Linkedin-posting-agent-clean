import React, { useState } from "react";

export default function PromptInstructionForm({ onGeneratePost, loading }) {
  const [topic, setTopic] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!topic.trim()) {
      setError("Por favor, indica el tema del post.");
      return;
    }
    onGeneratePost(topic, includeImage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <b>Tema del post</b>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Ej: IA en el trabajo diario"
        />
      </label>
      <label style={{marginTop: 12, display: 'block'}}>
        <input
          type="checkbox"
          checked={includeImage}
          onChange={e => setIncludeImage(e.target.checked)}
        />
        {" "}Generar imagen para la publicación
      </label>
      {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Generando publicación..." : "Generar publicación"}
      </button>
    </form>
  );
}
