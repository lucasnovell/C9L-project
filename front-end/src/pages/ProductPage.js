import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsInfo } from "../services/ProductService";

import "./styles/productPage.css"



function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        async function loadProduct(){

            const products = await getProductsInfo();

            const selectedProduct = products.find(
                p => p.id === Number(id)
            );

            setProduct(selectedProduct);
        }

        loadProduct();

    }, [id]);

    if (!product) {
        return <h2>Produto não encontrado</h2>;
    }

    return (
        <>
            <div className="product-info">  
                <img className="product-image" alt={product.name} src={product.image}></img>
                <div className="buy-info">
                    <h3 className="name">{product.name}</h3>
                    <div className="rating">
                        Avaliação<br/>
                        ⭐⭐⭐⭐⭐
                    </div>
                    <p className="price">R${product.price}</p>
                    <button className="buy">Comprar agora</button>
                    <button className="add-cart">Adicionar ao carrinho</button>
                </div>
            </div>
            <div className="product-description">
                <h4>Descrição</h4>
                <p>{product.description}</p>
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