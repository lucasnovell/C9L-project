import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import "./styles/cadastro.css"

function Login() {
  return (
    <div className="Login">
        <h1>Entre na sua conta</h1>
        <div className="form">
        <InputCadastro type="mail" id="mail" placeholder="Digite seu email"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Digite sua senha"></InputCadastro>
        </div>
        <ButtonSubmit>Entrar</ButtonSubmit>
    </div>
  );
}

export default Login;