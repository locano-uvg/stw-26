# React Hooks — Ejemplos para clase · STW 2026

Colección de ejemplos pequeños y aislados de los principales React Hooks,
organizados para que puedas copiar cada componente directamente a tu proyecto.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en el navegador.

## Estructura

Cada hook vive en su propia carpeta dentro de `src/examples/`. Los archivos
son autónomos: puedes copiar cualquier `.jsx` a tu proyecto Vite y funcionará
con solo agregar el `import` correspondiente.

```
src/examples/
├── 01-useState/        Counter, Saludo, UserProfile, TodoList
├── 02-useEffect/       TitleEffect, UserList (fetch), Clock (cleanup)
├── 03-useContext/      ThemeContext + ThemeApp
├── 04-useRef/          SearchInput (DOM), StopWatch (valores internos)
├── 05-useReducer/      CounterReducer
├── 06-useMemo-useCallback/  ExpensiveCalc, UserManager
└── 07-customHooks/     useFetch, useToggle, CustomHookDemo
```

## Cheat Sheet

| Hook | Para qué sirve | Devuelve |
|---|---|---|
| `useState` | Estado local del componente | `[valor, setValor]` |
| `useEffect` | Efectos secundarios (fetch, timers, DOM) | nada (puede devolver cleanup) |
| `useContext` | Leer un valor compartido sin prop drilling | El valor del Provider |
| `useRef` | Acceder al DOM o guardar valores sin re-render | `{ current: ... }` |
| `useReducer` | Estado complejo con múltiples acciones | `[state, dispatch]` |
| `useMemo` | Memorizar un valor calculado | El valor cacheado |
| `useCallback` | Memorizar una función | La función cacheada |

## Reglas de los Hooks

1. Solo llamarlos en el **nivel superior** del componente (nunca dentro de `if`, `for` o funciones anidadas).
2. Solo dentro de **componentes funcionales** o **custom hooks**.
3. Los custom hooks deben empezar con `use`.
