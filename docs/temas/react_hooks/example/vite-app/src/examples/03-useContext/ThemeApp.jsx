import { useState } from 'react';
import { ThemeContext, useTheme } from './ThemeContext';

// 2️⃣ Provider: envuelve el árbol y pone el valor disponible
function ThemeApp() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <ToggleButton />
        <ContentBox />
        <DeepNested />
      </div>
    </ThemeContext.Provider>
  );
}

// Componente que CAMBIA el tema
function ToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
    </button>
  );
}

// Componente que LEE el tema
function ContentBox() {
  const { theme } = useTheme();
  const styles =
    theme === 'light'
      ? { background: '#fff', color: '#24292f', border: '1px solid #d0d7de' }
      : { background: '#0d1117', color: '#e6edf3', border: '1px solid #30363d' };

  return (
    <div style={{ ...styles, padding: '0.55rem 1rem', borderRadius: 6, fontSize: '0.875rem' }}>
      Caja: tema <strong>{theme}</strong>
    </div>
  );
}

// Componente profundamente anidado (sin pasar props)
function DeepNested() {
  return <Inner />;
}

function Inner() {
  const { theme } = useTheme();
  return (
    <span
      style={{
        background: '#ddf4ff',
        color: '#0969da',
        borderRadius: 20,
        padding: '0.25rem 0.7rem',
        fontSize: '0.78rem',
        fontWeight: 600,
      }}
    >
      Componente anidado lee: <strong>{theme}</strong>
    </span>
  );
}

export default ThemeApp;
