import { getToken, removeToken } from "./AuthService";
import API_URL from "./API";

export async function checkout() {
    const token = getToken();

    if (!token) {
        throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        removeToken();
        throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    if (!response.ok) {
        throw new Error("Não foi possível finalizar a compra.");
    }

    return await response.json();
}
