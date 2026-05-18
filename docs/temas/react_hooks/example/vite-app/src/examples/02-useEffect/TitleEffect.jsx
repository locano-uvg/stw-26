import { useState, useEffect } from 'react';

// useEffect se ejecuta DESPUÉS del render.
// El array [count] es la lista de dependencias: el efecto solo corre
// cuando count cambia. Mira el título de la pestaña del navegador.
export default function TitleEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicks: ${count} — React Hooks`;
  }, [count]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#57606a', marginBottom: '0.75rem' }}>
        Mira el título de la pestaña del navegador 👆
      </p>
      <div className="counter-num">{count}</div>
      <button onClick={() => setCount(count + 1)}>
        +1 (cambia el título)
      </button>
    </div>
  );
}
