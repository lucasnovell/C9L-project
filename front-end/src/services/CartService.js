import { getToken, removeToken } from "./AuthService";
import API_URL from "./API";

export async function getCart() {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_URL}/cart`, {
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

    const response = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });

    if (response.status === 401 || response.status === 403) {
        removeToken();
        throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    if (!response.ok) {
        throw new Error("Não foi possível adicionar o produto ao carrinho.");
    }

    return await response.json();
}

export async function deleteCartItem(id) {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        removeToken();
        throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    if (!response.ok) {
        throw new Error("Não foi possível remover o produto do carrinho.");
    }
}

export async function updateCartItemQuantity(id, quantity) {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_URL}/cart/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
    });

    if (response.status === 401 || response.status === 403) {
        removeToken();
        throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    if (!response.ok) {
        throw new Error("Não foi possível atualizar a quantidade do produto.");
    }

    return await response.json();
}
