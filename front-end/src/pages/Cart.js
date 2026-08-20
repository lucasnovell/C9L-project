import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonSubmit from "../components/buttonSubmit";
import { getCart } from "../services/CartService";
import "./styles/cart.css"

const formatPrice = (value) => Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCart() {
      try {
        const response = await getCart();
        setCart(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  if (loading) {
    return <p className="cart-message">Carregando carrinho...</p>;
  }

  if (error) {
    return <p className="cart-message">{error}</p>;
  }

  return (
    <div className="cart-body">
    <div className="path">
        <p><Link 
        className="home-link"
        to={`/`}>Home</Link> {`>`} carrinho</p>
        <div className="user">user</div>
    </div>
    <div className="total-top">
        <p>TOTAL: {formatPrice(cart.total)}</p>
        <ButtonSubmit>Finalizar Compra</ButtonSubmit>
    </div>
    <hr />
    <div className="products-checkout">
        {cart.items.length === 0 ? (
          <p className="cart-message">Seu carrinho está vazio.</p>
        ) : (
          cart.items.map((item, index) => (
            <div key={item.id}>
              <div className="product-cart">
                  <img
                    className="img"
                    src={item.productImage}
                    alt={item.productName}
                  />
                  <div className="product-checkout-info">
                      <p className="name">{item.productName}</p>
                      <input className="qtd" type="number" min="1" value={item.quantity} readOnly></input>
                      <div>
                          <p>{formatPrice(item.subtotal)}</p>
                          <button>Remover</button>
                      </div>
                  </div>
              </div>
              {index < cart.items.length - 1 && <hr />}
            </div>
          ))
        )}
    </div>
    <hr />
    <div className="total-bottom">
        <p className="subtotal">Sub. Total  <span>{formatPrice(cart.total)}</span></p>
        <p className="frete">Frete  <span>{formatPrice(0)}</span></p>
        <p className="sale">Desconto  <span>{formatPrice(0)}</span></p>
        <hr />
        <div  className="total">
            <p>TOTAL</p>
            <div>
                <p>{formatPrice(cart.total)}</p>
                <button>Finalizar Compra</button>
            </div>
        </div>
        
    </div>
    </div>
  );
}

export default Cart;
