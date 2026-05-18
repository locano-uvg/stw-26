import { useState, useCallback } from 'react';

// Custom hook mínimo: abstrae el patrón boolean toggle.
// useCallback garantiza que la función toggle no cambie de referencia entre renders.
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}
