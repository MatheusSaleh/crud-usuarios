import { useState, useEffect } from "react";

export default function EditUserModal({ user, onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Atualiza os campos quando o user mudar
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
      setPasswordConfirmation("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) return;
    onSave(user.id, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
