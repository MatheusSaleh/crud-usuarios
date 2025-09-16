import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList"
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
      const response = await fetch(`http://localhost:8000/api/users?page=${page}`);
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
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
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
      const res = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
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
      const res = await fetch(`http://localhost:8000/api/users/${id}`, {
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
    <div>
      <h1>CRUD Usuários</h1>

      <UserForm addUser={addUser} />

      {/* Loader */}
      {loading && <div className="spinner"></div>}

      {/* Lista de usuários */}
      {!loading && (
        <>
          <UserList users={users} onEdit={(user) => setEditingUser(user)} deleteUser={deleteUser} />

          {editingUser && (
            <EditUserModal
              user={editingUser}
              onClose={() => setEditingUser(null)}
              onSave={updateUser}
            />
          )}

          {/* Paginação */}
          {pagination && (
            <div className="pagination">
              {pagination.links.map((link, index) => {
                // Ignorar labels "..." sem página
                if (link.label === "...") {
                  return (
                    <span key={index} className="dots">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={index}
                    disabled={!link.page}
                    onClick={() => fetchUsers(link.page)}
                    className={link.active ? "active" : ""}
                  >
                    {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
