import "./styles/productPage.css"

function ProductPage() {

  return (
    <>
    <div className="product-info">  
        <div className="product-image">
            FOTO
        </div>
        <div className="buy-info">
            <h3 className="name">NOME DO PRODUTO</h3>
            <div className="rating">
                Avaliação<br/>
                ⭐⭐⭐⭐⭐
            </div>
            <p className="price">R$999,99</p>
            <button className="buy">Comprar agora</button>
            <button className="add-cart">Adicionar ao carrinho</button>
        </div>
    </div>
    <div className="product-description">
        <h4>Descrição</h4>
        <p>blá blá blá</p>
    </div>
    <div className="product-rating">
        <h4>Opiniões</h4>
        <div>
            blá blá blá
        </div>
    </div>
    </>
  );
}

export default ProductPage;