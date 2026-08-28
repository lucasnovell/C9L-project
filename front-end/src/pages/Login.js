import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { login } from "../services/AuthService";

import "./styles/login.css"

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
    <div className="Login">
       <Link to={"/"}>
        <span>X</span>
        </Link>
        <h1>Entre na sua conta</h1>

        <form className="form" onSubmit={handleLogin}>

        <InputCadastro type="mail" id="mail" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} ></InputCadastro>

        <InputCadastro type="password" id="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}></InputCadastro>
        
        <ButtonSubmit>Entrar</ButtonSubmit>
        </form>
    </div>
  );
}

export default Login;