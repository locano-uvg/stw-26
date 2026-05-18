import { useState, useEffect } from 'react';

// Patrón clásico de fetch: 3 estados (data, loading, error).
// El array vacío [] hace que el efecto corra solo al montar el componente.
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data.slice(0, 5)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // [] → solo al montar

  if (loading) return <p>⏳ Cargando usuarios...</p>;
  if (error)   return <p style={{ color: '#f85149' }}>Error: {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <span>
            <strong>{u.name}</strong>{' '}
            <small>· {u.email}</small>
          </span>
          <span
            style={{
              background: '#ddf4ff',
              color: '#0969da',
              borderRadius: 20,
              padding: '0.1rem 0.55rem',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            #{u.id}
          </span>
        </li>
      ))}
    </ul>
  );
}
