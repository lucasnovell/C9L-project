export async function getProductsInfo() {
    const response = await fetch("http://localhost:8080/product");
    const productsJSON = await response.json();
    const products = productsJSON.content;
    return products;
}

export async function searchProducts(query) {
    const params = new URLSearchParams({ query, size: "100" });
    const response = await fetch(`http://localhost:8080/product/search?${params}`);

    if (!response.ok) {
        throw new Error("Não foi possível realizar a busca.");
    }

    const productsJSON = await response.json();
    return productsJSON.content;
}

