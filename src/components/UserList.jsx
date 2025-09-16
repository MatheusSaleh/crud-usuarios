export default function UserList({ users = [], onEdit, deleteUser }) {
  if (!users || users.length === 0) {
    return <p>Nenhum usuário cadastrado ainda.</p>;
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Criado em</th>
          <th>Atualizado em</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.created_at).toLocaleString()}</td>
            <td>{new Date(user.updated_at).toLocaleString()}</td>
            <td>
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-500 text-white p-1 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white p-1"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
