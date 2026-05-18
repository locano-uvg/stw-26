import { useReducer } from 'react';

// La función reductora vive FUERA del componente: recibe el estado
// actual y una "acción", y devuelve el NUEVO estado (sin mutar el anterior).
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'add':       return { count: state.count + action.payload };
    case 'reset':     return { count: 0 };
    default:          return state;
  }
}

export default function CounterReducer() {
  // useReducer(reducer, estadoInicial) → [state, dispatch]
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="counter-num">{state.count}</div>

      {/* dispatch envía la "acción" al reducer */}
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button className="btn-success" onClick={() => dispatch({ type: 'add', payload: 10 })}>+10</button>
      <button className="btn-success" onClick={() => dispatch({ type: 'add', payload: 100 })}>+100</button>
      <button className="btn-danger" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
