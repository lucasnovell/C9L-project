import InputCadastro from "../components/inputCadastro"
import ButtonSubmit from "../components/buttonSubmit"

import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/cadastro.css"

function Cadastro() {
  return (
    <div className="Cadastro">
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <h1>Complete seu cadastro</h1>
        <div className="form">
        <InputCadastro type="text" id="name" placeholder="Nome completo"></InputCadastro>
        <InputCadastro type="mail" id="mail" placeholder="Digite seu email"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Escolha uma senha"></InputCadastro>
        <InputCadastro type="password" id="password" placeholder="Confirme sua senha"></InputCadastro>
        </div>
        <ButtonSubmit page="/Login">Cadastrar</ButtonSubmit>
        </BrowserRouter>
    </div>
  );
}

export default Cadastro;