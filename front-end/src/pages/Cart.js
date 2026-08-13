import { Link } from "react-router-dom";
import ButtonSubmit from "../components/buttonSubmit";
import "./styles/cart.css"


function Cart() {
  return (
    <div className="cart-body">
    <div className="path">
        <p><Link 
        className="home-link"
        to={`/`}>Home</Link> {`>`} carrinho</p>
        <div className="user">user</div>
    </div>
    <div className="total-top">
        <p>TOTAL: R$ 000,00</p>
        <ButtonSubmit>Finalizar Compra</ButtonSubmit>
    </div>
    <hr />
    <div className="products-checkout">
        <div className="product-cart">
            <div className="img">FOTO</div>
            <div className="product-checkout-info">
                <p className="name">NOME DO PRODUTO</p>
                <input className="qtd" type="number" min="1" defaultValue={1}></input>
                <div>
                    <p>R$ 00,00</p>
                    <button>Remover</button>
                </div>
            </div>
        </div>
        <hr />
        <div className="product-cart">
            <div className="img">FOTO</div>
            <div className="product-checkout-info">
                <p className="name">NOME DO PRODUTO</p>
                <input className="qtd" type="number" min="1" defaultValue={1}></input>
                <div>
                    <p>R$ 00,00</p>
                    <button>Remover</button>
                </div>
            </div>
        </div>
    </div>
    <hr />
    <div className="total-bottom">
        <p className="subtotal">Sub. Total  <span>R$000,00</span></p>
        <p className="frete">Frete  <span>R$00,00</span></p>
        <p className="sale">Desconto  <span>R$00,00</span></p>
        <hr />
        <div  className="total">
            <p>TOTAL</p>
            <div>
                <p>R$ 00,00</p>
                <button>Finalizar Compra</button>
            </div>
        </div>
        
    </div>
    </div>
  );
}

export default Cart;