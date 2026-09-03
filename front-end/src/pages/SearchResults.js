import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/navigation";
import ProductCard from "../components/productCard";
import SiteFooter from "../components/footer";
import { searchProducts } from "../services/ProductService";
import "./styles/searchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      setLoading(true);
      setError("");
      try {
        setProducts(query ? await searchProducts(query) : []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, [query]);

  return (
    <div className="site-page search-page">
      <Navigation variant="home" />
      <main className="site-container search-results">
        <div className="search-results__heading">
          <span>Resultado da busca</span>
          <h1 className="page-title">Resultados para “{query}”</h1>
        </div>
        {loading && <div className="page-state" role="status"><strong>Buscando produtos...</strong></div>}
        {error && <div className="page-state page-state--error" role="alert"><strong>Não foi possível realizar a busca.</strong><span>{error}</span></div>}
        {!loading && !error && products.length === 0 && (
          <div className="page-state surface-card"><strong>Nenhum produto encontrado.</strong><span>Tente buscar por outro nome ou categoria.</span></div>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="search-products"><ProductCard products={products} variant="home" /></div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export default SearchResults;
