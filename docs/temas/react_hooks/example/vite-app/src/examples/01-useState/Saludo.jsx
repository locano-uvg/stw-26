import { useState } from 'react';

// Input controlado: el value del <input> siempre viene de React,
// y cada tecla llama a onChange → setNombre → re-render.
export default function Saludo() {
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <label>Tu nombre</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe algo..."
        style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }}
      />
      <p style={{ fontSize: '1.1rem' }}>
        Hola, <strong>{nombre || 'desconocido'}</strong> 👋
      </p>
    </div>
  );
}
