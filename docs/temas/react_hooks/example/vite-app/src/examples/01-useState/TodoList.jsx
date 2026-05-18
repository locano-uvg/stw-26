import { useState } from 'react';

// Estado con array: agregar con spread, eliminar con filter.
// Nunca push/splice directamente — crea siempre un array nuevo.
export default function TodoList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Aprender useState' },
    { id: 2, text: 'Aprender useEffect' },
  ]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setItems([...items, { id: Date.now(), text }]);
    setText('');
  };

  const remove = (id) => setItems(items.filter((item) => item.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Nueva tarea... (Enter para agregar)"
          style={{ flex: 1 }}
        />
        <button onClick={add}>Agregar</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button className="btn-danger" onClick={() => remove(item.id)}>✕</button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <small>Sin tareas. ¡Agrega una!</small>}
    </div>
  );
}
