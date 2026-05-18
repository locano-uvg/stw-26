import { useState } from 'react';
import { useFetch } from './useFetch';
import { useToggle } from './useToggle';

// Combina useFetch (datos remotos) y useToggle (boolean) en un solo componente.
export default function CustomHookDemo() {
  const [resource, setResource] = useState('posts');
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/${resource}?_limit=4`
  );
  const [showRaw, toggleRaw] = useToggle(false);

  const resources = ['posts', 'users', 'comments', 'todos'];

  return (
    <div>
      {/* Selector de recurso — cambia la URL → useFetch vuelve a hacer fetch */}
      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {resources.map((r) => (
          <button
            key={r}
            className={resource === r ? 'btn-success' : 'btn-ghost'}
            onClick={() => setResource(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* useToggle para mostrar/ocultar JSON crudo */}
      <button
        className="btn-ghost"
        onClick={toggleRaw}
        style={{ marginBottom: '0.75rem' }}
      >
        {showRaw ? '🙈 Ocultar JSON' : '👁 Ver JSON crudo'}
      </button>

      {loading && <p>⏳ Cargando {resource}...</p>}
      {error   && <p style={{ color: '#f85149' }}>Error: {error}</p>}

      {data && !showRaw && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.title ?? item.name ?? item.body?.slice(0, 50)}
              </span>
              <span
                style={{
                  background: '#ddf4ff',
                  color: '#0969da',
                  borderRadius: 20,
                  padding: '0.1rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                #{item.id}
              </span>
            </li>
          ))}
        </ul>
      )}

      {data && showRaw && (
        <pre
          style={{
            background: '#f6f8fa',
            border: '1px solid #d0d7de',
            borderRadius: 6,
            padding: '0.75rem',
            fontSize: '0.72rem',
            overflow: 'auto',
            maxHeight: 200,
            color: '#24292f',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
