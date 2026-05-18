import { useState } from 'react';

// Estado con objeto: NUNCA mutar directamente.
// Siempre crear un objeto nuevo con spread (...) para que React detecte el cambio.
export default function UserProfile() {
  const [user, setUser] = useState({ name: 'Ana', level: 1 });

  return (
    <div className="demo-grid-2">
      <div>
        <label>Nombre</label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }}
        />
        <label>Nivel</label>
        <input
          type="number"
          value={user.level}
          onChange={(e) => setUser({ ...user, level: Number(e.target.value) })}
          style={{ display: 'block', width: '100%' }}
        />
      </div>
      <div className="demo-card">
        <small>Estado actual (JSON):</small>
        <pre style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#0969da' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
