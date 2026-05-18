import { useState, useEffect } from 'react';

// Custom hook: función que empieza con "use" y usa otros hooks.
// Encapsula la lógica fetch + loading + error para reutilizarla en cualquier componente.
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reiniciar el estado al cambiar la URL
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]); // se vuelve a ejecutar cuando cambia la URL

  return { data, loading, error };
}
