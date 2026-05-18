import { useState } from 'react';

// useState guarda un valor entre renders.
// setCount provoca un nuevo render con el valor actualizado.
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="counter-num">{count}</div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button className="btn-danger" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}
