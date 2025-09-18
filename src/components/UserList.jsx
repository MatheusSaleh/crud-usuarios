export default function UserList({ users = [], onEdit, deleteUser }) {
  if (!users || users.length === 0) {
    return <p>Nenhum usuário cadastrado ainda.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
  <table className="w-full text-sm text-left text-gray-600">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
      <tr>
        <th scope="col" className="px-6 py-3">Nome</th>
        <th scope="col" className="px-6 py-3">Email</th>
        <th scope="col" className="px-6 py-3">Criado em</th>
        <th scope="col" className="px-6 py-3">Atualizado em</th>
        <th scope="col" className="px-6 py-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {users.map((user) => (
        <tr
          key={user.id}
          className="hover:bg-gray-50 transition-colors"
        >
          <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">{new Date(user.created_at).toLocaleString()}</td>
          <td className="px-6 py-4">{new Date(user.updated_at).toLocaleString()}</td>
          <td className="px-6 py-4 flex justify-center space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-medium shadow-sm transition"
            >
              Editar
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm transition"
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
