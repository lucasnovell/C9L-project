import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import "./styles/cadastro.css"

function Cadastro() {
  return (
    <div className="Cadastro">
        <h1>Complete seu cadastro</h1>
        <div className="form">
        <InputCadastro type="text" id="name" placeholder="Nome completo"></InputCadastro>
        <InputCadastro type="mail" id="mail" placeholder="Digite seu email"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Escolha uma senha"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Confirme sua senha"></InputCadastro>
        </div>
        <ButtonSubmit>Cadastrar</ButtonSubmit>
    </div>
  );
}

export default Cadastro;