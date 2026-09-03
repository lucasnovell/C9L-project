import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductsInfo } from "../services/ProductService";
import { addCartItem } from "../services/CartService";
import Navigation from "../components/navigation";
import Button from "../components/button";
import SiteFooter from "../components/footer";

import "./styles/productPage.css";

const formatPrice = (value) => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await getProductsInfo();
        setProduct(products.find(item => item.id === Number(id)));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addCartItem(product.id, 1);
      alert("Produto adicionado ao carrinho.");
    } catch (requestError) {
      alert(requestError.message);
      if (requestError.message === "Sua sessão expirou. Faça login novamente.") navigate("/login");
    } finally {
      setAddingToCart(false);
    }
  };

  const renderState = (title, message, isError = false) => (
    <div className="site-page">
      <Navigation variant="home" />
      <main className={`site-container page-state ${isError ? "page-state--error" : ""}`} role={isError ? "alert" : "status"}>
        <strong>{title}</strong>
        {message && <span>{message}</span>}
      </main>
    </div>
  );

  if (loading) return renderState("Carregando produto...");
  if (error) return renderState("Não foi possível carregar o produto.", error, true);
  if (!product) return renderState("Produto não encontrado.", "Volte ao catálogo e escolha outra opção.", true);

  return (
    <div className="site-page product-page">
      <Navigation variant="home" />
      <main className="site-container product-page__main">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link><span aria-hidden="true">/</span><span>{product.name}</span>
        </nav>

        <section className="product-view surface-card" aria-labelledby="product-title">
          <div className="product-gallery">
            <span className="product-view__badge">Seleção C9L</span>
            <img className="product-image" alt={product.name} src={product.image} />
          </div>
          <div className="buy-info">
            <span className="product-view__eyebrow">Tecnologia</span>
            <h1 className="page-title" id="product-title">{product.name}</h1>
            <div className="product-view__rating" aria-label="Avaliação: cinco de cinco estrelas">
              <span aria-hidden="true">★★★★★</span>
              <small>5,0</small>
            </div>
            <div className="product-view__price">
              <span>À vista no Pix</span>
              <strong>{formatPrice(product.price)}</strong>
              <small>ou 10x de {formatPrice(Number(product.price) / 10)} sem juros</small>
            </div>
            <p className="product-view__stock">Produto disponível</p>
            <div className="product-view__actions">
              <Button type="button" variant="primary" size="large">Comprar agora</Button>
              <Button type="button" variant="secondary" size="large" onClick={handleAddToCart} loading={addingToCart}>
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </section>

        <section className="product-content surface-card" aria-labelledby="description-title">
          <h2 id="description-title">Descrição</h2>
          <p>{product.description}</p>
        </section>

        <section className="product-content surface-card" aria-labelledby="reviews-title">
          <h2 id="reviews-title">Opiniões</h2>
          <p className="product-reviews-empty">Nenhuma avaliação publicada ainda.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default ProductPage;
