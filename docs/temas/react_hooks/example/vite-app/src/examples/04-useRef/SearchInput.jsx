import { useRef } from 'react';

// useRef crea un objeto { current: ... } que persiste entre renders.
// Al conectarlo a un elemento con ref={...}, current apunta al nodo del DOM.
// Cambiar .current NO provoca re-render (a diferencia de useState).
export default function SearchInput() {
  // 1) Crear la referencia
  const inputRef = useRef(null);

  return (
    <div>
      {/* 2) Conectar la ref al elemento del DOM */}
      <input ref={inputRef} placeholder="Buscar..." />

      <button
        onClick={() => {
          // 3) Acceder al DOM con .current
          inputRef.current.focus();
        }}
      >
        Enfocar input
      </button>

      <button
        className="btn-success"
        onClick={() => {
          inputRef.current.value = '¡Hola desde useRef!';
          inputRef.current.focus();
        }}
      >
        Llenar y enfocar
      </button>

      <button
        className="btn-ghost"
        onClick={() => {
          inputRef.current.value = '';
          inputRef.current.focus();
        }}
      >
        Limpiar
      </button>
    </div>
  );
}
