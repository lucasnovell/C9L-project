import { useEffect, useState } from "react";
import { getProductsInfo } from "../../services/ProductService";

import "./style.css";

function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await getProductsInfo();
      setProducts(response);
    }

    loadProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <div className="product-card">
            <img className="product-img-card" src={product.image} alt=""></img>
            <div className="product-info-card">
                <div className="product-name-card">{product.name}</div>
                <div className="product-price-card">R$ {product.price}</div>
            </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;

