import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/ProductService";
import { Link } from "react-router-dom";

import "./style.css";

function ProductCard({ products: suppliedProducts }) {
  const [loadedProducts, setLoadedProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      if (suppliedProducts !== undefined) return;
      const response = await getProductsInfo();
      setLoadedProducts(response);
    }

    loadProducts();
  }, [suppliedProducts]);

  const products = suppliedProducts ?? loadedProducts;

  return (
    <>
      {products.map((product) => (
        <Link
        key={product.id}
        to={`/produto/${product.id}`}
        className="product-link"
    >
          <div className="product-card">
              <img className="product-img-card" src={product.image} alt={product.name}></img>
              <div className="product-info-card">
                  <div className="product-name-card">{product.name}</div>
                  <div className="product-price-card">R$ {product.price}</div>
              </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ProductCard;

