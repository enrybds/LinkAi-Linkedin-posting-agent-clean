import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function PublishedManager() {
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublished();
  }, []);

  async function fetchPublished() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/published`);
      setPublished(res.data);
      setError("");
    } catch (err) {
      setError("Error al cargar publicaciones");
    }
    setLoading(false);
  }

  return (
    <div style={{maxWidth: 700, margin: '0 auto'}}>
      <h2 style={{color:'#2563eb',marginBottom:18,fontWeight:700}}>Publicaciones</h2>
      {loading && <div style={{color:'#5b7fa6'}}>Cargando...</div>}
      {error && <div style={{color:'#b71c1c'}}>{error}</div>}
      {published.length === 0 && !loading && (
        <div style={{color:'#7ba4d6',background:'#fafdff',border:'1.5px dashed #b5c2d6',borderRadius:12,padding:'32px 18px',textAlign:'center',marginBottom:18}}>
          No tienes publicaciones aún.
        </div>
      )}
      <ul style={{padding:0,listStyle:'none'}}>
        {published.map(p => (
          <li key={p.id} style={{background:'#fafbfc',border:'1px solid #e0e3ea',borderRadius:12,padding:18,marginBottom:18, boxShadow:'0 2px 12px rgba(26,58,123,0.04)'}}>
            <div style={{fontSize:17, color:'#5b7fa6', fontWeight:600, marginBottom:6}}>{p.topic}</div>
            <div style={{fontSize:15, color:'#7ba4d6', marginBottom:8, whiteSpace:'pre-line'}}>{p.text}</div>
            {p.image_url && (
              <img src={p.image_url} alt="Imagen" style={{maxWidth:120, borderRadius:8, marginBottom:8}} />
            )}
            <div style={{fontSize:12, color:'#b5c2d6', marginTop:8}}>
              Publicado: {p.published_at ? new Date(p.published_at).toLocaleString() : "-"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
