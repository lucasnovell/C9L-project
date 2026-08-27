import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductsInfo } from "../services/ProductService";
import { addCartItem } from "../services/CartService";

import "./styles/productPage.css"



function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

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

    const handleAddToCart = async () => {
        try {
            setAddingToCart(true);
            await addCartItem(product.id, 1);
            alert("Produto adicionado ao carrinho.");
        } catch (error) {
            alert(error.message);
            if (error.message === "Sua sessão expirou. Faça login novamente.") {
                navigate("/login");
            }
        } finally {
            setAddingToCart(false);
        }
    };

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
                    <button
                        className="add-cart"
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                    >
                        {addingToCart ? "Adicionando..." : "Adicionar ao carrinho"}
                    </button>
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
