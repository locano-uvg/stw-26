import { useState, useRef } from 'react';

// Guardar el id del interval en una ref: NO queremos re-render al cambiarlo,
// solo necesitamos recordarlo para poder hacer clearInterval más adelante.
export default function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null); // guarda el id sin causar re-render

  const start = () => {
    if (intervalRef.current) return; // ya está corriendo
    intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="counter-num">{time}s</div>
      <button className="btn-success" onClick={start}>▶ Iniciar</button>
      <button onClick={stop}>⏸ Detener</button>
      <button className="btn-danger" onClick={reset}>↻ Reset</button>
    </div>
  );
}
