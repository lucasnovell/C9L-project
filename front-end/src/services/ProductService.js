const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

async function requestProducts(path, errorMessage) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`);
    } catch (error) {
        throw new Error("Não foi possível conectar ao servidor. Verifique se o back-end está iniciado.");
    }

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    const productsJSON = await response.json();
    return productsJSON.content;
}

export async function getProductsInfo() {
    return await requestProducts("/product", "Não foi possível carregar os produtos.");
}

export async function searchProducts(query) {
    const params = new URLSearchParams({ query, size: "100" });
    return await requestProducts(`/product/search?${params}`, "Não foi possível realizar a busca.");
}

