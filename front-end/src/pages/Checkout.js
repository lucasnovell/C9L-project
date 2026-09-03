import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "../components/navigation";
import ButtonSubmit from "../components/buttonSubmit";
import InputCadastro from "../components/inputCadastro";
import { checkout } from "../services/OrderService";

import "./styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [referencePoint, setReferencePoint] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [finishingPurchase, setFinishingPurchase] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!street.trim() || !number.trim() || !zipCode.trim() || !paymentMethod) {
      alert("Preencha todos os campos obrigatórios para finalizar a compra.");
      return;
    }

    try {
      setFinishingPurchase(true);
      await checkout();
      setStreet("");
      setNumber("");
      setComplement("");
      setZipCode("");
      setReferencePoint("");
      setPaymentMethod("");
      navigate("/cart", { state: { successMessage: "Compra realizada com sucesso!" } });
    } catch (error) {
      alert(error.message);
      if (error.message === "Sua sessão expirou. Faça login novamente.") navigate("/login");
    } finally {
      setFinishingPurchase(false);
    }
  };

  return (
    <div className="site-page checkout-page">
      <Navigation variant="home" />
      <main className="site-container checkout-content">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link><span aria-hidden="true">/</span>
          <Link to="/cart">Carrinho</Link><span aria-hidden="true">/</span>
          <span>Finalizar compra</span>
        </nav>

        <header className="checkout-heading">
          <h1 className="page-title">Finalizar compra</h1>
          <p>Revise os dados de entrega e escolha a forma de pagamento.</p>
        </header>

        <form className="checkout-form surface-card" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Endereço de entrega</legend>
            <div className="checkout-fields">
              <div className="checkout-field--wide">
                <InputCadastro label="Rua" type="text" id="street" placeholder="Nome da rua" value={street}
                  onChange={(event) => setStreet(event.target.value)} autoComplete="street-address" required />
              </div>
              <InputCadastro label="Número" type="text" id="number" placeholder="Número" value={number}
                onChange={(event) => setNumber(event.target.value)} autoComplete="address-line2" required />
              <InputCadastro label="Complemento" type="text" id="complement" placeholder="Complemento (opcional)" value={complement}
                onChange={(event) => setComplement(event.target.value)} />
              <InputCadastro label="CEP" type="text" id="zipCode" placeholder="00000-000" value={zipCode}
                onChange={(event) => setZipCode(event.target.value)} autoComplete="postal-code" required />
              <div className="checkout-field--wide">
                <InputCadastro label="Ponto de referência" type="text" id="referencePoint" placeholder="Ponto de referência (opcional)" value={referencePoint}
                  onChange={(event) => setReferencePoint(event.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Forma de pagamento</legend>
            <label className="form-field" htmlFor="paymentMethod">
              <span className="form-field__label">Pagamento</span>
              <select id="paymentMethod" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} required>
                <option value="">Selecione a forma de pagamento</option>
                <option value="credit-card">Cartão de crédito</option>
                <option value="pix">Pix</option>
              </select>
            </label>
          </fieldset>

          <div className="checkout-actions">
            <ButtonSubmit disabled={finishingPurchase}>
              {finishingPurchase ? "Finalizando..." : "Pagar e finalizar"}
            </ButtonSubmit>
            <Link to="/cart">Voltar ao carrinho</Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Checkout;
