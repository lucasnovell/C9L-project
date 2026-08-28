import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputSearch from "../inputSearch";

import './style.css'

function Navigation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    try {
      setRecentSearches(JSON.parse(localStorage.getItem("recentProductSearches")) || []);
    } catch {
      setRecentSearches([]);
    }
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const closeSuggestions = (event) => {
      if (!searchRef.current?.contains(event.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", closeSuggestions);
    return () => document.removeEventListener("mousedown", closeSuggestions);
  }, []);

  const performSearch = (searchValue) => {
    const normalizedQuery = searchValue.trim();
    if (!normalizedQuery) return;

    const updatedSearches = [
      normalizedQuery,
      ...recentSearches.filter(item => item.toLowerCase() !== normalizedQuery.toLowerCase())
    ].slice(0, 5);

    localStorage.setItem("recentProductSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    setQuery(normalizedQuery);
    setShowSuggestions(false);
    navigate(`/busca?q=${encodeURIComponent(normalizedQuery)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    performSearch(query);
  };

  return (
      <nav>
        <Link
            className="home-link"
            to={`/`}>
              <div className="logo" alt="">LOGO</div>
          </Link>
          <div className="search" ref={searchRef}>
            <form className="search-form" onSubmit={handleSubmit}>
              <InputSearch
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="search-button">Buscar</button>
            </form>
            {showSuggestions && recentSearches.length > 0 && (
              <div className="recent-searches">
                <span>Buscas recentes</span>
                {recentSearches.map(item => (
                  <button key={item} type="button" onClick={() => performSearch(item)}>
                    {item}
                  </button>
                ))}
              </div>
            )}
              <ul className="menu-options">
                <li>Categoria 1</li>
                <li>Categoria 2</li>
                <li>Categoria 3</li>
                <li>Categoria 4</li>
              </ul>
          </div> 
          <div className="nav-right">
            
              <div className="user-services">
                <Link
            className="register-link"
            to={`/cadastro`}>
              <span>Cadastrar</span>
              </Link>
                <Link
            className="register-link"
            to={`/login`}>
              <span>Entrar</span>
              </Link>
              </div>
            
            <Link 
            className="cart-link"
            to={`/cart`}>
              <div className="cart">cart</div>
            </Link>
            
          </div>
          
        </nav>
  );
}

export default Navigation;
