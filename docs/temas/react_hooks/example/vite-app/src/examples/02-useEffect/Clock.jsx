import { useState, useEffect } from 'react';

// Cleanup: la función que devuelves del efecto se ejecuta al desmontar
// el componente (o antes de correr el efecto nuevamente).
// Sin clearInterval → el timer sigue vivo aunque el componente desaparezca.
export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return; // si está pausado, no registra el interval

    const id = setInterval(() => setTime(new Date()), 1000);

    // 🧹 Cleanup: libera el interval al desmontar o cuando running cambia
    return () => clearInterval(id);
  }, [running]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '2.25rem',
          fontWeight: 700,
          color: '#0969da',
          margin: '0.5rem 0 1rem',
        }}
      >
        {time.toLocaleTimeString()}
      </div>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? '⏸ Pausar' : '▶ Reanudar'}
      </button>
    </div>
  );
}
