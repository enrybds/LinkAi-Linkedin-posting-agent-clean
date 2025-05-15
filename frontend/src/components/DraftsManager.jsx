import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function DraftsManager({ onEditDraft }) {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDrafts();
  }, []);

  async function fetchDrafts() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/drafts`);
      setDrafts(res.data);
      setError("");
    } catch (err) {
      setError("Error al cargar borradores");
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que quieres borrar este borrador?")) return;
    await axios.delete(`${API_BASE}/drafts/${id}`);
    fetchDrafts();
  }

  async function handlePublish(id) {
    await axios.post(`${API_BASE}/drafts/${id}/publish`);
    fetchDrafts();
  }

  return (
    <div style={{maxWidth: 700, margin: '0 auto'}}>
      <h2 style={{color:'#2563eb',marginBottom:18,fontWeight:700}}>Borradores</h2>
      {loading && <div style={{color:'#5b7fa6'}}>Cargando...</div>}
      {error && <div style={{color:'#b71c1c'}}>{error}</div>}
      {drafts.length === 0 && !loading && (
        <div style={{color:'#7ba4d6',background:'#fafdff',border:'1.5px dashed #b5c2d6',borderRadius:12,padding:'32px 18px',textAlign:'center',marginBottom:18}}>
          No tienes borradores guardados.
        </div>
      )}
      <ul style={{padding:0,listStyle:'none'}}>
        {drafts.map(d => (
          <li key={d.id} style={{background:'#fafbfc',border:'1px solid #e0e3ea',borderRadius:12,padding:18,marginBottom:18, boxShadow:'0 2px 12px rgba(26,58,123,0.04)'}}>
            <div style={{fontWeight:600,marginBottom:6}}>{d.topic}</div>
            <div style={{color:'#444',marginBottom:8}}>{d.text}</div>
            <div style={{fontSize:13,color:'#7a7a7a',marginBottom:8}}>
              Creado: {d.created_at} | Última edición: {d.updated_at}
            </div>
            <button onClick={() => onEditDraft && onEditDraft(d)} style={{marginRight:12}}>Editar</button>
            <button onClick={() => handlePublish(d.id)} style={{marginRight:12}}>Publicar</button>
            <button onClick={() => handleDelete(d.id)} style={{background:'#f44336'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
