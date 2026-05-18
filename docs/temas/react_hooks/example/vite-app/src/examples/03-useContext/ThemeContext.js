import { createContext, useContext } from 'react';

// 1️⃣ Crear el contexto. El valor null es solo el default
//    cuando no hay un Provider encima en el árbol.
export const ThemeContext = createContext(null);

// Hook personalizado para consumir el contexto de forma más limpia
export function useTheme() {
  return useContext(ThemeContext);
}
