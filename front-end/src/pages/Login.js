import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { login } from "../services/AuthService";

import "./styles/auth.css"

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
     e.preventDefault();
    const user = {
      email,
      password
    };
    try{
      await login(user);
      alert("Login realizado com sucesso");
      navigate("/");
    }catch (error){
      console.error(error);

      alert("Email ou senha invalidos");
    }
  };

  return (
    <div className="auth-page">
      <Link className="auth-brand" to="/" aria-label="Voltar para a C9L Store">
        <span className="brand__symbol" aria-hidden="true">C9</span>
        <span className="brand__name">C9L<span>STORE</span></span>
      </Link>

      <main className="auth-card surface-card">
        <Link className="auth-close" to="/" aria-label="Fechar e voltar para o início">×</Link>
        <header className="auth-heading">
          <span className="auth-eyebrow">Boas-vindas de volta</span>
          <h1>Entre na sua conta</h1>
          <p>Acesse seus pedidos e continue suas compras.</p>
        </header>

        <form className="auth-form" onSubmit={handleLogin}>
          <InputCadastro
            label="E-mail"
            type="email"
            id="mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <InputCadastro
            label="Senha"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <ButtonSubmit>Entrar</ButtonSubmit>
          <p className="auth-switch">
            Não tem uma conta ainda? <Link to="/cadastro">Registre-se.</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
