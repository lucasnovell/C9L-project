import { getToken } from "./AuthService";

export async function getCart() {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch("http://localhost:8080/cart", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível carregar o carrinho.");
    }

    return await response.json();
}

export async function addCartItem(productId, quantity = 1) {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch("http://localhost:8080/cart/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
        throw new Error("Não foi possível adicionar o produto ao carrinho.");
    }

    return await response.json();
}
