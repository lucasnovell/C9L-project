import { useState } from "react";
import { register } from "../services/AuthService"
import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"
import { useNavigate } from "react-router-dom";


import "./styles/cadastro.css"

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
    <div className="Cadastro">   
        <h1>Complete seu cadastro</h1>
        <form className="form" onSubmit={handleSubmit}>
        <InputCadastro type="text" id="name" placeholder="Nome completo" value={name}
    onChange={ (e) => setName(e.target.value)}></InputCadastro>
        <InputCadastro type="email" id="email" placeholder="Digite seu email" value={email}
    onChange={ (e) => setEmail(e.target.value)}></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Escolha uma senha" value={password} required
    onChange={ (e) => setPassword(e.target.value)}></InputCadastro>
        <InputCadastro type="password" id="confirmPassword" placeholder="Confirme sua senha" value={confirmPassword} required
    onChange={ (e) => setConfirmPassword(e.target.value)}></InputCadastro>
        <ButtonSubmit>Cadastrar</ButtonSubmit>
        </form>    
    </div>
  );
}

export default Cadastro;
