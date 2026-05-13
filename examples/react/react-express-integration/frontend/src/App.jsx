import { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { useUsers } from "./hooks/useUsers";

function App() {
  const { users, loading, error, refetch } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  const handleCreated = () => {
    refetch();
  };

  const handleUpdated = () => {
    setEditingUser(null);
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/usuario/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Gestión de Usuarios</h1>
      <p className="subtitle">React + Express Full Stack</p>

      <div className="container">
        <section className="form-section">
          <h2>{editingUser ? "Editar Usuario" : "Crear Usuario"}</h2>
          <UserForm
            onSuccess={editingUser ? handleUpdated : handleCreated}
            editingUser={editingUser}
            onCancel={() => setEditingUser(null)}
          />
        </section>

        <section className="list-section">
          <h2>
            Usuarios
            <button className="btn-refresh" onClick={refetch} disabled={loading}>
              Actualizar
            </button>
          </h2>

          {error && <p className="error">Error: {error}</p>}

          <UserList
            users={users}
            loading={loading}
            onEdit={setEditingUser}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
