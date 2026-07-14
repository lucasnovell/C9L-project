import { useState } from "react";
import { register } from "../services/AuthService"
import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"


import "./styles/cadastro.css"

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
        name,
        email,
        password
    }

    try{
      const response = await register(user)
      console.log(response);
      alert("Usuário cadastrado com sucesso")
    }
    catch(error){
      console.error(error)
      alert("Erro ao cadastrar usuário")
    }

    
  }

  return (
    <div className="Cadastro">   
        <h1>Complete seu cadastro</h1>
        <form className="form" onSubmit={handleSubmit}>
        <InputCadastro type="text" id="name" placeholder="Nome completo" value={name}
    onChange={ (e) => setName(e.target.value)}></InputCadastro>
        <InputCadastro type="mail" id="mail" placeholder="Digite seu email" value={email}
    onChange={ (e) => setEmail(e.target.value)}></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Escolha uma senha" value={password}
    onChange={ (e) => setPassword(e.target.value)}></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Confirme sua senha"></InputCadastro>
        <ButtonSubmit>Cadastrar</ButtonSubmit>
        </form>    
    </div>
  );
}

export default Cadastro;