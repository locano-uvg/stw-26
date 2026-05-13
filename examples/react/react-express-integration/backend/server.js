const express = require("express");
const cors = require("cors");
const { uid } = require("uid");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let usuarios = [
  { id: uid(), name: "Luis", description: "Jugador", level: 90 },
  { id: uid(), name: "Ana", description: "Maestra", level: 100 },
  { id: uid(), name: "Carlos", description: "Estudiante", level: 45 },
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuario/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

app.post("/usuario", (req, res) => {
  const { name, description, level } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es requerido" });

  const nuevo = { id: uid(), name, description: description || "", level: level || 1 };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

app.put("/usuario/:id", (req, res) => {
  const index = usuarios.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  const { name, description, level } = req.body;
  usuarios[index] = { ...usuarios[index], name, description, level };
  res.json(usuarios[index]);
});

app.delete("/usuario/:id", (req, res) => {
  const index = usuarios.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  usuarios.splice(index, 1);
  res.json({ message: "Usuario eliminado", usuarios });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
