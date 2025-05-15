import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function PromptsManager({ onSelectPrompt, selectedPrompt }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // id or null
  const [form, setForm] = useState({ name: "", instructions: "" });

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/prompts/`);
      setPrompts(res.data);
    } catch (e) {
      setError("Error cargando prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrompts(); }, []);

  const handleSelect = async (id) => {
    await axios.post(`${API_BASE}/prompts/select/${id}`);
    fetchPrompts();
  };

  const handleEdit = (prompt) => {
    setEditing(prompt.id);
    setForm({ name: prompt.name, instructions: prompt.instructions });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/prompts/${id}`);
    fetchPrompts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`${API_BASE}/prompts/${editing}`, form);
    } else {
      await axios.post(`${API_BASE}/prompts/`, form);
    }
    setForm({ name: "", instructions: "" });
    setEditing(null);
    fetchPrompts();
  };

  return (
    <div style={{maxWidth: 700, margin: '0 auto'}}>
      <h2 style={{color:'#2563eb',marginBottom:18,fontWeight:700}}>Prompts</h2>
      {loading && <div style={{color:'#5b7fa6'}}>Cargando...</div>}
      {error && <div style={{color:'#b71c1c'}}>{error}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:24}}>
        <input
          type="text"
          placeholder="Nombre del prompt"
          value={form.name}
          onChange={e => setForm(f => ({...f, name: e.target.value}))}
          style={{marginRight:12}}
        />
        <input
          type="text"
          placeholder="Instrucciones"
          value={form.instructions}
          onChange={e => setForm(f => ({...f, instructions: e.target.value}))}
          style={{width:300,marginRight:12}}
        />
        <button type="submit">{editing ? "Actualizar" : "Añadir"}</button>
        {editing && <button type="button" onClick={() => {setEditing(null);setForm({name:"",instructions:""});}} style={{marginLeft:8}}>Cancelar</button>}
      </form>
      <ul style={{padding:0,listStyle:'none'}}>
        {prompts.map(p => (
          <li key={p.id} style={{background:'#fafbfc',border:'1px solid #e0e3ea',borderRadius:12,padding:18,marginBottom:18, boxShadow:'0 2px 12px rgba(26,58,123,0.04)'}}>
            <div style={{fontWeight:600,marginBottom:6}}>{p.name}</div>
            <div style={{color:'#444',marginBottom:8}}>{p.instructions}</div>
            <button onClick={() => onSelectPrompt && onSelectPrompt(p)} style={{marginRight:12, background: selectedPrompt?.id === p.id ? '#0073b1' : undefined, color: selectedPrompt?.id === p.id ? '#fff' : undefined}}>
              {selectedPrompt?.id === p.id ? 'Seleccionado' : 'Seleccionar'}
            </button>
            <button onClick={() => handleEdit(p)} style={{marginRight:12}}>Editar</button>
            <button onClick={() => handleDelete(p.id)} style={{background:'#f44336'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
