import { useState } from 'react';

// ── Ejemplos de useState ──────────────────────────────
import Counter       from './examples/01-useState/Counter.jsx';
import Saludo        from './examples/01-useState/Saludo.jsx';
import UserProfile   from './examples/01-useState/UserProfile.jsx';
import TodoList      from './examples/01-useState/TodoList.jsx';

// ── Ejemplos de useEffect ─────────────────────────────
import TitleEffect   from './examples/02-useEffect/TitleEffect.jsx';
import UserList      from './examples/02-useEffect/UserList.jsx';
import Clock         from './examples/02-useEffect/Clock.jsx';

// ── Ejemplo de useContext ─────────────────────────────
import ThemeApp      from './examples/03-useContext/ThemeApp.jsx';

// ── Ejemplos de useRef ────────────────────────────────
import SearchInput   from './examples/04-useRef/SearchInput.jsx';
import StopWatch     from './examples/04-useRef/StopWatch.jsx';

// ── Ejemplo de useReducer ─────────────────────────────
import CounterReducer from './examples/05-useReducer/CounterReducer.jsx';

// ── Ejemplos de useMemo / useCallback ─────────────────
import ExpensiveCalc from './examples/06-useMemo-useCallback/ExpensiveCalc.jsx';
import UserManager   from './examples/06-useMemo-useCallback/UserManager.jsx';

// ── Ejemplos de Custom Hooks ──────────────────────────
import CustomHookDemo from './examples/07-customHooks/CustomHookDemo.jsx';

// ─────────────────────────────────────────────────────
// Registro de todos los ejemplos
// ─────────────────────────────────────────────────────
const GROUPS = [
  {
    hook: 'useState',
    label: '01 · useState',
    desc: 'Estado local. Cada llamada a set<X> provoca un nuevo render.',
    color: '#61dafb',
    examples: [
      {
        id: 'useState-counter',
        label: 'Counter',
        desc: 'Contador numérico. Muestra la sintaxis básica de useState.',
        Component: Counter,
        code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
      },
      {
        id: 'useState-saludo',
        label: 'Saludo (input controlado)',
        desc: 'Input cuyo value viene de React. Cada tecla dispara onChange → setState.',
        Component: Saludo,
        code: `import { useState } from 'react';

export default function Saludo() {
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola, <strong>{nombre || 'desconocido'}</strong> 👋</p>
    </div>
  );
}`,
      },
      {
        id: 'useState-objeto',
        label: 'UserProfile (objeto)',
        desc: 'Estado con objeto. Usar spread { ...prev, campo: valor } para no mutar.',
        Component: UserProfile,
        code: `import { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({ name: 'Ana', level: 1 });

  return (
    <input
      value={user.name}
      // Spread: crea objeto nuevo conservando los demás campos
      onChange={(e) => setUser({ ...user, name: e.target.value })}
    />
  );
}`,
      },
      {
        id: 'useState-todo',
        label: 'TodoList (array)',
        desc: 'Estado con array. Agregar con spread, eliminar con filter.',
        Component: TodoList,
        code: `import { useState } from 'react';

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setItems([...items, { id: Date.now(), text }]);
    setText('');
  };

  const remove = (id) =>
    setItems(items.filter((item) => item.id !== id));

  return ( /* ... */ );
}`,
      },
    ],
  },
  {
    hook: 'useEffect',
    label: '02 · useEffect',
    desc: 'Efectos secundarios: fetch, timers, DOM. Corre después del render.',
    color: '#d2a8ff',
    examples: [
      {
        id: 'useEffect-title',
        label: 'TitleEffect',
        desc: 'Cambia el título de la pestaña cuando count cambia. Array de deps: [count].',
        Component: TitleEffect,
        code: `import { useState, useEffect } from 'react';

export default function TitleEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Clicks: \${count}\`;
  }, [count]); // solo corre cuando count cambia

  return <button onClick={() => setCount(count + 1)}>+1</button>;
}`,
      },
      {
        id: 'useEffect-fetch',
        label: 'UserList (fetch + 3 estados)',
        desc: 'Patrón clásico: data, loading, error. Array vacío [] → solo al montar.',
        Component: UserList,
        code: `import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // [] → una sola vez al montar

  if (loading) return <p>Cargando...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
      },
      {
        id: 'useEffect-clock',
        label: 'Clock (cleanup)',
        desc: 'Devolver una función del efecto = cleanup. Libera el interval al desmontar.',
        Component: Clock,
        code: `import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);

    // 🧹 Cleanup: se llama al desmontar o antes del siguiente efecto
    return () => clearInterval(id);
  }, []);

  return <h2>{time.toLocaleTimeString()}</h2>;
}`,
      },
    ],
  },
  {
    hook: 'useContext',
    label: '03 · useContext',
    desc: 'Comparte datos entre componentes sin prop drilling.',
    color: '#ffa657',
    examples: [
      {
        id: 'useContext-theme',
        label: 'ThemeApp (tema claro/oscuro)',
        desc: '3 pasos: createContext → Provider → useContext en cualquier hijo.',
        Component: ThemeApp,
        code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
      <Content />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Cambiar tema
    </button>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  return <div>Tema actual: {theme}</div>;
}`,
      },
    ],
  },
  {
    hook: 'useRef',
    label: '04 · useRef',
    desc: 'Referencia persistente que NO provoca re-render al cambiar.',
    color: '#7ee787',
    examples: [
      {
        id: 'useRef-dom',
        label: 'SearchInput (acceso al DOM)',
        desc: 'Conectar ref={...} a un elemento para acceder a él con .current.',
        Component: SearchInput,
        code: `import { useRef } from 'react';

export default function SearchInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Buscar..." />
      <button onClick={() => inputRef.current.focus()}>
        Enfocar
      </button>
    </div>
  );
}`,
      },
      {
        id: 'useRef-stopwatch',
        label: 'StopWatch (valores internos)',
        desc: 'Guardar el id del interval sin provocar re-renders innecesarios.',
        Component: StopWatch,
        code: `import { useState, useRef } from 'react';

export default function StopWatch() {
  const [time, setTime]   = useState(0);
  const intervalRef = useRef(null); // NO re-renderiza al cambiar

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return ( /* ... */ );
}`,
      },
    ],
  },
  {
    hook: 'useReducer',
    label: '05 · useReducer',
    desc: 'Estado complejo con múltiples acciones: (state, action) → newState.',
    color: '#f778ba',
    examples: [
      {
        id: 'useReducer-counter',
        label: 'CounterReducer',
        desc: 'Reducer con 4 acciones: increment, decrement, add(payload), reset.',
        Component: CounterReducer,
        code: `import { useReducer } from 'react';

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
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'add', payload: 10 })}>+10</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`,
      },
    ],
  },
  {
    hook: 'useMemo / useCallback',
    label: '06 · useMemo / useCallback',
    desc: 'Evitar recálculos costosos y re-crear funciones en cada render.',
    color: '#d29922',
    examples: [
      {
        id: 'useMemo-calc',
        label: 'ExpensiveCalc (useMemo)',
        desc: 'useMemo memoriza el resultado. Solo recalcula cuando cambia la dep.',
        Component: ExpensiveCalc,
        code: `import { useState, useMemo } from 'react';

export default function ExpensiveCalc() {
  const [count, setCount] = useState(0);
  const [text, setText]   = useState('');

  // Solo recalcula cuando count cambia (no cuando cambia text)
  const resultado = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) sum += i;
    return sum + count;
  }, [count]);

  return (
    <div>
      <p>Resultado: {resultado}</p>
      <button onClick={() => setCount(c => c + 1)}>+count</button>
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}`,
      },
      {
        id: 'useCallback-manager',
        label: 'UserManager (useCallback + memo)',
        desc: 'useCallback estabiliza la ref de la función para no re-renderizar hijos memoizados.',
        Component: UserManager,
        code: `import { useState, useCallback, memo } from 'react';

// memo: solo re-renderiza si las props cambian
const UserItem = memo(function UserItem({ user, onDelete }) {
  console.log('Render UserItem', user.id);
  return (
    <li>
      {user.name}
      <button onClick={() => onDelete(user.id)}>Eliminar</button>
    </li>
  );
});

export default function UserManager() {
  const [users, setUsers] = useState([...]);

  // useCallback: misma referencia → UserItem no se re-renderiza al cambiar
  // otros estados del padre
  const deleteUser = useCallback((id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  return <ul>{users.map(u => <UserItem key={u.id} user={u} onDelete={deleteUser} />)}</ul>;
}`,
      },
    ],
  },
  {
    hook: 'Custom Hooks',
    label: '07 · Custom Hooks',
    desc: 'Funciones que empiezan con "use" y encapsulan lógica reutilizable.',
    color: '#3fb950',
    examples: [
      {
        id: 'custom-hooks-demo',
        label: 'useFetch + useToggle',
        desc: 'useFetch abstrae data/loading/error. useToggle envuelve el patrón boolean.',
        Component: CustomHookDemo,
        code: `// useFetch.js
export function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(r => r.json()).then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// useToggle.js
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Uso en un componente:
const { data, loading } = useFetch('/api/posts');
const [open, toggleOpen] = useToggle(false);`,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────
// Componente de bloque de código con botón copiar
// ─────────────────────────────────────────────────────
function CodeBlock({ code, filename }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API no disponible en todos los contextos */
    }
  };

  return (
    <div className="code-wrap">
      <div className="code-header">
        <span className="code-lang">{filename}</span>
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
          {copied ? '✓ Copiado' : '⧉ Copiar'}
        </button>
      </div>
      <pre className="code">{code}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// App principal
// ─────────────────────────────────────────────────────
export default function App() {
  const [activeId, setActiveId] = useState('useState-counter');

  // Encontrar el ejemplo activo
  let activeExample = null;
  let activeGroup = null;
  for (const group of GROUPS) {
    const ex = group.examples.find((e) => e.id === activeId);
    if (ex) { activeExample = ex; activeGroup = group; break; }
  }

  return (
    <>
      <header className="app-header">
        <h1>React Hooks <span>· Ejemplos</span></h1>
        <small>STW 2026 · Universidad del Valle de Guatemala</small>
      </header>

      <div className="app-layout">
        {/* ── SIDEBAR ────────────────────────────── */}
        <aside className="sidebar">
          {GROUPS.map((group) => (
            <div className="sidebar-group" key={group.hook}>
              <div
                className="sidebar-group-title"
                style={{ color: group.color }}
              >
                {group.label}
              </div>
              {group.examples.map((ex) => (
                <button
                  key={ex.id}
                  className={`sidebar-btn${activeId === ex.id ? ' active' : ''}`}
                  onClick={() => setActiveId(ex.id)}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* ── MAIN ───────────────────────────────── */}
        <main className="main">
          {activeExample && activeGroup && (
            <>
              <div className="example-header">
                <div
                  className="example-hook-tag"
                  style={{
                    background: `${activeGroup.color}18`,
                    color: activeGroup.color,
                    borderColor: `${activeGroup.color}44`,
                  }}
                >
                  {activeGroup.hook}
                </div>
                <div className="example-title">{activeExample.label}</div>
                <div className="example-desc">{activeExample.desc}</div>
              </div>

              {/* Demo en vivo */}
              <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                Demo en vivo
              </p>
              <div className="demo-box">
                <activeExample.Component />
              </div>

              <hr className="section-divider" />

              {/* Código */}
              <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                Código
              </p>
              <CodeBlock
                code={activeExample.code}
                filename={activeExample.label + '.jsx'}
              />

              {/* Callout con tips por hook */}
              <HookTip hook={activeGroup.hook} exampleId={activeExample.id} />
            </>
          )}
        </main>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────
// Tips contextuales por hook
// ─────────────────────────────────────────────────────
const TIPS = {
  useState: {
    icon: '💡',
    type: 'callout-info',
    title: 'Cómo funciona useState',
    body: 'Al llamar a set<X>(), React vuelve a ejecutar toda la función componente. La siguiente vez que useState() se llama, devuelve el valor actualizado (no el inicial).',
  },
  useEffect: {
    icon: '⚙️',
    type: 'callout-info',
    title: '3 formas del array de dependencias',
    body: '[] → solo al montar | [var] → cuando var cambia | (sin array) → en cada render. Siempre devuelve una función cleanup si registras listeners o timers.',
  },
  useContext: {
    icon: '🔌',
    type: 'callout-success',
    title: '3 pasos para Context',
    body: '1) createContext()  →  2) <Context.Provider value={...}>  →  3) useContext(Context) en cualquier hijo, sin importar qué tan anidado esté.',
  },
  useRef: {
    icon: '📦',
    type: 'callout-info',
    title: 'useRef vs useState',
    body: 'useState causa re-render al cambiar. useRef NO. Usa useRef para el DOM y para guardar valores "internos" que no necesitas mostrar en pantalla.',
  },
  useReducer: {
    icon: '🔀',
    type: 'callout-success',
    title: '¿Cuándo usar useReducer?',
    body: 'Cuando el estado tiene múltiples campos o muchas formas de actualización. La función reducer vive fuera del componente y es fácil de testear aisladamente.',
  },
  'useMemo / useCallback': {
    icon: '⚠️',
    type: 'callout-warn',
    title: 'No optimices prematuramente',
    body: 'useMemo y useCallback tienen un costo propio. Úsalos solo cuando tengas un problema medible de rendimiento. La mayoría de los componentes no los necesitan.',
  },
  'Custom Hooks': {
    icon: '♻️',
    type: 'callout-success',
    title: 'Regla del nombre',
    body: 'Todo hook personalizado debe empezar con "use". Esto permite que ESLint y React DevTools detecten las reglas de hooks automáticamente.',
  },
};

function HookTip({ hook }) {
  const tip = TIPS[hook];
  if (!tip) return null;
  return (
    <div className={`callout ${tip.type}`} style={{ marginTop: '1rem' }}>
      <strong>{tip.icon} {tip.title}</strong>
      {tip.body}
    </div>
  );
}
