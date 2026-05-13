import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001";

function UserForm({ onSuccess, editingUser, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setDescription(editingUser.description || "");
      setLevel(editingUser.level || 1);
    } else {
      setName("");
      setDescription("");
      setLevel(1);
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingUser
        ? `${API_URL}/usuario/${editingUser.id}`
        : `${API_URL}/usuario`;

      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, level: Number(level) }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error en la petición");
      }

      setName("");
      setDescription("");
      setLevel(1);
      onSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del usuario"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
      </div>

      <div className="form-group">
        <label htmlFor="level">Nivel</label>
        <input
          id="level"
          type="number"
          min="1"
          max="100"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting
            ? "Guardando..."
            : editingUser
              ? "Actualizar"
              : "Crear Usuario"}
        </button>
        {editingUser && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
