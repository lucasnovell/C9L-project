import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/navigation";
import ProductCard from "../components/productCard";
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
    <div>
      <Navigation></Navigation>
      <main className="search-results">
        <h1>Resultados para “{query}”</h1>
        {loading && <p>Buscando produtos...</p>}
        {error && <p className="search-error">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="search-products"><ProductCard products={products} /></div>
        )}
      </main>
    </div>
  );
}

export default SearchResults;
