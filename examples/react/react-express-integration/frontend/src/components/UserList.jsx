import UserItem from "./UserItem";

function UserList({ users, loading, onEdit, onDelete }) {
  if (loading) return <p className="loading">Cargando usuarios...</p>;

  if (users.length === 0) {
    return <p className="empty">No hay usuarios registrados</p>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default UserList;
