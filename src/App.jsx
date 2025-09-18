import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import EditUserModal from "./components/EditUserModal";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/users?page=${page}`
      );
      const data = await response.json();
      setUsers(data.data || []);
      setPagination(data.meta || null);
      setCurrentPage(data.meta?.current_page || 1);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  const addUser = async (user) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Erro ao adicionar usuário");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Erro ao atualizar usuário");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar usuário");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Cadastro de Usuários
        </h1>

        {/* Formulário */}
        <UserForm addUser={addUser} />

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-6">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Lista de usuários */}
        {!loading && (
          <>
            <div className="mt-6">
              <UserList
                users={users}
                onEdit={(user) => setEditingUser(user)}
                deleteUser={deleteUser}
              />
            </div>

            {/* Modal */}
            {editingUser && (
              <EditUserModal
                user={editingUser}
                onClose={() => setEditingUser(null)}
                onSave={updateUser}
              />
            )}

            {/* Paginação */}
            {pagination && (
              <div className="flex justify-center mt-8 space-x-2">
                {pagination.links.map((link, index) => {
                  if (link.label === "...") {
                    return (
                      <span
                        key={index}
                        className="px-3 py-1 text-gray-500 select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={index}
                      disabled={!link.page}
                      onClick={() => fetchUsers(link.page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                    ${
                      link.active
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                    }
                    ${!link.page ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                    >
                      {link.label
                        .replace("&laquo;", "«")
                        .replace("&raquo;", "»")}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
