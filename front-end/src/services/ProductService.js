export async function getProductsInfo() {
    const response = await fetch("http://localhost:8080/product");
    const productsJSON = await response.json();
    const products = productsJSON.content;
    return products;
}

