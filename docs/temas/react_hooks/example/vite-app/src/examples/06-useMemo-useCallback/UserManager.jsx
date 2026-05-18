import { useState, useCallback, memo } from 'react';

// useCallback memoriza la FUNCIÓN para que su referencia no cambie en cada render.
// Útil cuando pasas callbacks a componentes memoizados con React.memo.

// React.memo evita que UserItem se re-renderice si sus props no cambian.
// Sin useCallback, deleteUser sería una función NUEVA en cada render del padre
// → React.memo la detectaría como prop cambiada → re-render igual.
const UserItem = memo(function UserItem({ user, onDelete }) {
  console.log(`Renderizando UserItem #${user.id}`);
  return (
    <li>
      <span>{user.name}</span>
      <button className="btn-danger" onClick={() => onDelete(user.id)}>
        Eliminar
      </button>
    </li>
  );
});

const INITIAL_USERS = [
  { id: 1, name: 'Ana García' },
  { id: 2, name: 'Carlos López' },
  { id: 3, name: 'María Torres' },
];

export default function UserManager() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');

  // useCallback: misma referencia mientras las deps no cambien
  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []); // sin deps → la función nunca se recrea

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuario..."
        style={{ width: '100%', marginBottom: '0.75rem' }}
      />
      <ul>
        {filtered.map((user) => (
          <UserItem key={user.id} user={user} onDelete={deleteUser} />
        ))}
      </ul>
      {filtered.length === 0 && <small>Sin resultados.</small>}
      <p style={{ color: '#57606a', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Abre la consola (F12) y escribe en el buscador: UserItem NO se re-renderiza.
      </p>
    </div>
  );
}
