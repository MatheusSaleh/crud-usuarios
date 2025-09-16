import { useState } from "react";

export default function UserForm({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) return;

    addUser({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
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
        placeholder="Confirme sua Senha"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
