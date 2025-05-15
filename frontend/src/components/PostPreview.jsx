import React, { useState } from "react";
import "./LinkedInMockup.css";

export default function PostPreview({ text, imageUrl, imageBase64, onTextChange, onPublish, onSaveDraft, loading }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => { setEditMode(false); setEditedText(text); };
  const handleSave = () => { setEditMode(false); onTextChange(editedText); };

  // Decide qué mostrar como imagen
  let imgSrc = null;
  if (imageUrl) {
    imgSrc = imageUrl;
  } else if (imageBase64) {
    imgSrc = `data:image/png;base64,${imageBase64}`;
  }

  return (
    <div className="linkedin-post-mockup">
      <div className="linkedin-header">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="linkedin-avatar" />
        <div>
          <div className="linkedin-name">Tu Nombre</div>
          <div className="linkedin-role">AI & Data Enthusiast</div>
        </div>
      </div>
      <div className="linkedin-content">
        {editMode ? (
          <textarea
            rows={6}
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            style={{width: '100%', marginBottom: 8}}
          />
        ) : (
          <p>{text}</p>
        )}
        {imgSrc && (
          <img src={imgSrc} alt="preview" className="linkedin-image" />
        )}
      </div>
      <div className="linkedin-actions">
        {editMode ? (
          <>
            <button onClick={handleSave} disabled={loading}>Guardar</button>
            <button onClick={handleCancel} disabled={loading} style={{background:'#eee',color:'#333'}}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} disabled={loading} style={{marginRight:12}}>Editar</button>
            <button onClick={onPublish} disabled={loading} style={{marginRight:12}}>Publicar</button>
            <button onClick={onSaveDraft} disabled={loading}>Guardar borrador</button>
          </>
        )}
      </div>
    </div>
  );
}
