# React + Express Integration

Ejemplo completo de una aplicación full stack que conecta un frontend en React con un backend en Express.

## Estructura

```
react-express-integration/
├── backend/          # API REST con Express
│   ├── server.js
│   └── package.json
├── frontend/         # Interfaz con React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── UserList.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserItem.jsx
│   │   └── hooks/
│   │       └── useUsers.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Instrucciones

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 3. Correr ambos servidores

Abrir **dos terminales**:

```bash
# Terminal 1 - Backend
cd backend
npm start
# → API corriendo en http://localhost:3001
```

```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
# → React corriendo en http://localhost:5173
```

### 4. Abrir en el navegador

Ir a `http://localhost:5173` para ver la aplicación.

## Funcionalidades

- Listar usuarios (GET)
- Crear usuario (POST)
- Actualizar usuario (PUT)
- Eliminar usuario (DELETE)
- Manejo de estados de carga y errores
- Custom hook reutilizable para la API
