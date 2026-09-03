import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/ProductService";
import { Link } from "react-router-dom";

import "./style.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductCard({ products: suppliedProducts, variant = "default" }) {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(suppliedProducts === undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      if (suppliedProducts !== undefined) return;

      try {
        const response = await getProductsInfo();
        setLoadedProducts(response);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [suppliedProducts]);

  const products = suppliedProducts ?? loadedProducts;
  const isHomeVariant = variant === "home";

  if (loading) {
    if (isHomeVariant) {
      return (
        <div className="product-loading" role="status" aria-label="Carregando produtos">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="product-skeleton" key={index} aria-hidden="true">
              <span className="product-skeleton__image" />
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      );
    }
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    if (isHomeVariant) {
      return (
        <div className="product-state product-state--error" role="alert">
          <strong>Não foi possível carregar os produtos.</strong>
          <span>{error}</span>
        </div>
      );
    }
    return <p>{error}</p>;
  }

  return (
    <>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/produto/${product.id}`}
          className={`product-link ${isHomeVariant ? "product-link--home" : ""}`}
          aria-label={`Ver ${product.name}`}
        >
          <article className={`product-card ${isHomeVariant ? "product-card--home" : ""}`}>
            <div className="product-image-wrap">
              {isHomeVariant && <span className="product-badge">Seleção C9L</span>}
              <img className="product-img-card" src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="product-info-card">
              {isHomeVariant && <span className="product-kicker">Tecnologia</span>}
              <h3 className="product-name-card">{product.name}</h3>
              {isHomeVariant && product.description && (
                <p className="product-description-card">{product.description}</p>
              )}
              <div className="product-price-group">
                {isHomeVariant && <span className="product-payment-label">À vista no Pix</span>}
                <span className="product-price-card">
                  {isHomeVariant ? currencyFormatter.format(Number(product.price)) : `R$ ${product.price}`}
                </span>
                {isHomeVariant && Number(product.price) > 0 && (
                  <span className="product-installment">
                    ou 10x de {currencyFormatter.format(Number(product.price) / 10)} sem juros
                  </span>
                )}
              </div>
              {isHomeVariant && (
                <span className="product-card__cta">Ver produto <span aria-hidden="true">→</span></span>
              )}
            </div>
          </article>
        </Link>
      ))}
    </>
  );
}

export default ProductCard;
