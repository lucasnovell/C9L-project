import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

      navigate("/cart", {
        state: { successMessage: "Compra realizada com sucesso!" }
      });
    } catch (error) {
      alert(error.message);

      if (error.message === "Sua sessão expirou. Faça login novamente.") {
        navigate("/login");
      }
    } finally {
      setFinishingPurchase(false);
    }
  };

  return (
    <div className="Checkout">
      <div className="checkout-path">
        <p>
          <Link className="home-link" to="/">Home</Link> {`>`} <Link className="home-link" to="/cart">carrinho</Link> {`>`} finalizar compra
        </p>
      </div>

      <main className="checkout-content">
        <h1>Finalizar compra</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Endereço de entrega</h2>

          <InputCadastro
            type="text"
            id="street"
            placeholder="Nome da rua"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            required
          />
          <InputCadastro
            type="text"
            id="number"
            placeholder="Número"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
          />
          <InputCadastro
            type="text"
            id="complement"
            placeholder="Complemento (opcional)"
            value={complement}
            onChange={(event) => setComplement(event.target.value)}
          />
          <InputCadastro
            type="text"
            id="zipCode"
            placeholder="CEP"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            required
          />
          <InputCadastro
            type="text"
            id="referencePoint"
            placeholder="Ponto de referência (opcional)"
            value={referencePoint}
            onChange={(event) => setReferencePoint(event.target.value)}
          />

          <h2>Forma de pagamento</h2>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            required
          >
            <option value="">Selecione a forma de pagamento</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="pix">Pix</option>
          </select>

          <ButtonSubmit disabled={finishingPurchase}>
            {finishingPurchase ? "Finalizando..." : "Pagar e Finalizar"}
          </ButtonSubmit>
        </form>
      </main>
    </div>
  );
}

export default Checkout;
