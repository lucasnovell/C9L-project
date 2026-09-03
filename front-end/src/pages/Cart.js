import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navigation from "../components/navigation";
import Button, { ButtonLink } from "../components/button";
import { deleteCartItem, getCart, updateCartItemQuantity } from "../services/CartService";

import "./styles/cart.css";

const formatPrice = (value) => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState(null);

  useEffect(() => {
    async function loadCart() {
      try {
        setCart(await getCart());
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  const handleSessionExpired = (requestError) => {
    if (requestError.message === "Sua sessão expirou. Faça login novamente.") navigate("/login");
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setActionError("");
      setUpdatingItemId(itemId);
      await deleteCartItem(itemId);
      setCart(await getCart());
    } catch (requestError) {
      setActionError(requestError.message);
      handleSessionExpired(requestError);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity === item.quantity) return;

    try {
      setActionError("");
      setUpdatingItemId(item.id);
      setCart(await updateCartItemQuantity(item.id, newQuantity));
    } catch (requestError) {
      setActionError(requestError.message);
      handleSessionExpired(requestError);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const pageState = (title, message, isError = false) => (
    <div className="site-page">
      <Navigation variant="home" />
      <main className={`site-container page-state ${isError ? "page-state--error" : ""}`} role={isError ? "alert" : "status"}>
        <strong>{title}</strong>
        {message && <span>{message}</span>}
      </main>
    </div>
  );

  if (loading) return pageState("Carregando carrinho...");
  if (error) return pageState("Não foi possível carregar o carrinho.", error, true);

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="site-page cart-page">
      <Navigation variant="home" />
      <main className="site-container cart-main">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link><span aria-hidden="true">/</span><span>Carrinho</span>
        </nav>

        <header className="cart-heading">
          <div>
            <h1 className="page-title">Seu carrinho</h1>
            <p>{itemCount} {itemCount === 1 ? "item" : "itens"} na sua seleção</p>
          </div>
          <strong>{formatPrice(cart.total)}</strong>
        </header>

        {location.state?.successMessage && <p className="cart-alert cart-alert--success" role="status">{location.state.successMessage}</p>}
        {actionError && <p className="cart-alert cart-alert--error" role="alert">{actionError}</p>}

        <div className="cart-layout">
          <section className="cart-items surface-card" aria-label="Produtos no carrinho">
            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <strong>Seu carrinho está vazio.</strong>
                <p>Explore o catálogo e encontre a tecnologia ideal para você.</p>
                <ButtonLink to="/" variant="primary" size="medium">Voltar ao catálogo</ButtonLink>
              </div>
            ) : (
              cart.items.map(item => (
                <article className="cart-item" key={item.id}>
                  <img src={item.productImage} alt={item.productName} />
                  <div className="cart-item__content">
                    <h2>{item.productName}</h2>
                    <div className="cart-item__bottom">
                      <label className="quantity-control">
                        <span>Quantidade</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          disabled={updatingItemId === item.id}
                          onChange={(event) => handleQuantityChange(item, Number(event.target.value))}
                        />
                      </label>
                      <div className="cart-item__price">
                        <strong>{formatPrice(item.subtotal)}</strong>
                        <Button
                          type="button"
                          variant="ghost"
                          size="small"
                          loading={updatingItemId === item.id}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="cart-summary surface-card" aria-labelledby="summary-title">
            <h2 id="summary-title">Resumo do pedido</h2>
            <dl>
              <div><dt>Subtotal</dt><dd>{formatPrice(cart.total)}</dd></div>
              <div><dt>Frete</dt><dd>{formatPrice(0)}</dd></div>
              <div><dt>Desconto</dt><dd>{formatPrice(0)}</dd></div>
              <div className="cart-summary__total"><dt>Total</dt><dd>{formatPrice(cart.total)}</dd></div>
            </dl>
            <Button type="button" variant="primary" size="large" disabled={cart.items.length === 0} onClick={() => navigate("/checkout")}>
              Finalizar compra
            </Button>
            <ButtonLink to="/" variant="ghost" size="medium">Continuar comprando</ButtonLink>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Cart;
