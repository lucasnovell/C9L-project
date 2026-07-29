import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import { useNavigate } from "react-router-dom";

import "./styles/login.css"

function Login() {
  const navigate = useNavigate();

  return (
    <div className="Login">
        <h1>Entre na sua conta</h1>
        <div className="form">
        <InputCadastro type="mail" id="mail" placeholder="Digite seu email"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Digite sua senha"></InputCadastro>
        </div>
        <ButtonSubmit onClick={() => navigate("/home")}>Entrar</ButtonSubmit>
    </div>
  );
}

export default Login;