function UserItem({ user, onEdit, onDelete }) {
  return (
    <li className="user-item">
      <div className="user-info">
        <h3>
          {user.name}
          <span className="level-badge">Lvl {user.level}</span>
        </h3>
        <p>{user.description}</p>
      </div>
      <div className="user-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(user)}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(user.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default UserItem;
