import { useState } from "react";
import { register } from "../services/AuthService"
import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"
import { Link, useNavigate } from "react-router-dom";


import "./styles/auth.css"

function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    const user = {
        name,
        email,
        password
    }

    try{
      const response = await register(user)
      console.log(response);
      alert("Usuário cadastrado com sucesso")
      navigate("/login");
    }
    catch(error){
      console.error(error)
      alert("Erro ao cadastrar usuário")
    }

    
  }

  return (
    <div className="auth-page">
      <Link className="auth-brand" to="/" aria-label="Voltar para a C9L Store">
        <span className="brand__symbol" aria-hidden="true">C9</span>
        <span className="brand__name">C9L<span>STORE</span></span>
      </Link>

      <main className="auth-card auth-card--register surface-card">
        <Link className="auth-close" to="/" aria-label="Fechar e voltar para o início">×</Link>
        <header className="auth-heading">
          <span className="auth-eyebrow">Crie sua conta</span>
          <h1>Complete seu cadastro</h1>
          <p>Preencha seus dados para começar a comprar.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputCadastro label="Nome completo" type="text" id="name" placeholder="Digite seu nome" value={name}
            onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          <InputCadastro label="E-mail" type="email" id="email" placeholder="Digite seu e-mail" value={email}
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <InputCadastro label="Senha" type="password" id="password" placeholder="Escolha uma senha" value={password} required
            onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <InputCadastro label="Confirme sua senha" type="password" id="confirmPassword" placeholder="Digite a senha novamente" value={confirmPassword} required
            onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
          <ButtonSubmit>Cadastrar</ButtonSubmit>
        </form>
      </main>
    </div>
  );
}

export default Cadastro;
