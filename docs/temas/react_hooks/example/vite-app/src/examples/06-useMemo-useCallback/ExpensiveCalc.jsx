import { useState, useMemo } from 'react';

// useMemo memoriza el RESULTADO de una función.
// Solo recalcula cuando cambian las dependencias del array.
// Escribir en el input NO recalcula porque no está en el array.
function calcularSuma(n) {
  console.log('🔥 Recalculando suma costosa con n =', n);
  let sum = 0;
  for (let i = 0; i < 1_000_000; i++) sum += i;
  return sum + n;
}

export default function ExpensiveCalc() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Solo recalcula cuando count cambia, no cuando cambia text
  const resultado = useMemo(() => calcularSuma(count), [count]);

  return (
    <div>
      <p>
        <strong>Resultado costoso:</strong>{' '}
        <span style={{ color: '#0969da', fontWeight: 700 }}>
          {resultado.toLocaleString()}
        </span>
      </p>

      <div style={{ marginTop: '0.75rem' }}>
        <button onClick={() => setCount((c) => c + 1)}>
          Incrementar count ({count}) — recalcula
        </button>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <label>Escribir aquí NO recalcula (gracias a useMemo):</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="escribe algo..."
          style={{ display: 'block', width: '100%', marginTop: '0.3rem' }}
        />
      </div>

      <p style={{ color: '#57606a', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Abre la consola (F12) para ver cuándo se recalcula.
      </p>
    </div>
  );
}
