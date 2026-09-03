import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InputSearch from "../inputSearch";
import { getLoggedUser, removeToken } from "../../services/AuthService";

import './style.css'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 8H6" />
      <circle cx="9.5" cy="19" r="1" />
      <circle cx="17.5" cy="19" r="1" />
    </svg>
  );
}

function Navigation({ variant = "default" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const isHomeVariant = variant === "home";
  const isHomePage = location.pathname === "/";
  const activeCategory = location.pathname === "/busca" ? searchParams.get("q") : null;

  const categoryLinkClass = (categoryQuery, extraClass = "") => {
    const isActive = activeCategory === categoryQuery;
    return `category-menu__link ${isActive ? "category-menu__link--active" : ""} ${extraClass}`.trim();
  };

  useEffect(() => {
    async function loadLoggedUser() {
      try {
        const user = await getLoggedUser();
        setLoggedUser(user);
      } catch {
        setLoggedUser(null);
      }
    }

    loadLoggedUser();
  }, []);

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

  const handleLogout = () => {
    removeToken();
    setLoggedUser(null);
    navigate("/");
  };

  if (isHomeVariant) {
    return (
      <header className="store-header">
        <div className="store-promo" role="status">
          <span>Frete grátis em produtos selecionados</span>
          <span className="store-promo__detail">Tecnologia certa, entrega segura.</span>
        </div>

        <nav className="site-navigation site-navigation--home" aria-label="Navegação principal">
          <div className="site-navigation__shell">
            <div className="site-navigation__top">
              <Link className="home-link brand" to="/" aria-label="C9L Store — início">
                <span className="brand__symbol" aria-hidden="true">C9</span>
                <span className="brand__name">C9L<span>STORE</span></span>
              </Link>

              <div className="search search--home" ref={searchRef}>
                <form className="search-form search-form--home" onSubmit={handleSubmit} role="search">
                  <InputSearch
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Busque notebooks, periféricos e muito mais"
                    ariaLabel="Buscar no catálogo"
                  />
                  <button type="submit" className="search-button search-button--home" aria-label="Buscar">
                    <SearchIcon />
                  </button>
                </form>
                {showSuggestions && recentSearches.length > 0 && (
                  <div className="recent-searches recent-searches--home">
                    <span>Buscas recentes</span>
                    {recentSearches.map(item => (
                      <button key={item} type="button" onClick={() => performSearch(item)}>
                        <SearchIcon />
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="nav-right nav-right--home">
                <div className="user-services user-services--home">
                  {loggedUser ? (
                    <button className="account-action" type="button" onClick={handleLogout}>
                      <span className="account-action__eyebrow">Olá, {loggedUser.name?.split(" ")[0] || "cliente"}</span>
                      <span>Sair da conta</span>
                    </button>
                  ) : (
                    <Link className="account-action" to="/login">
                      <span className="account-action__eyebrow">Boas-vindas</span>
                      <span>Entrar ou cadastrar</span>
                    </Link>
                  )}
                </div>
                <Link className="cart-link cart-link--home" to="/cart" aria-label="Abrir carrinho">
                  <CartIcon />
                  <span>Carrinho</span>
                </Link>
                <button
                  className="mobile-menu-button"
                  type="button"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="home-category-menu"
                  onClick={() => setMobileMenuOpen(open => !open)}
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span className="sr-only">{mobileMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
                </button>
              </div>
            </div>

            <div
              id="home-category-menu"
              className={`category-menu ${mobileMenuOpen ? "category-menu--open" : ""}`}
            >
              <Link className={`category-menu__link ${isHomePage ? "category-menu__link--active" : ""}`} to="/" aria-current={isHomePage ? "page" : undefined}>Início</Link>
              <Link className={categoryLinkClass("notebook")} to="/busca?q=notebook" aria-current={activeCategory === "notebook" ? "page" : undefined}>Notebooks</Link>
              <Link className={categoryLinkClass("monitor")} to="/busca?q=monitor" aria-current={activeCategory === "monitor" ? "page" : undefined}>Monitores</Link>
              <Link className={categoryLinkClass("mouse")} to="/busca?q=mouse" aria-current={activeCategory === "mouse" ? "page" : undefined}>Periféricos</Link>
              <Link className={categoryLinkClass("console")} to="/busca?q=console" aria-current={activeCategory === "console" ? "page" : undefined}>Games</Link>
              <Link className={categoryLinkClass("smartphone")} to="/busca?q=smartphone" aria-current={activeCategory === "smartphone" ? "page" : undefined}>Smartphones</Link>
              <Link className={categoryLinkClass("ssd", "category-menu__link--offer")} to="/busca?q=ssd" aria-current={activeCategory === "ssd" ? "page" : undefined}>Ofertas</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
      <nav className="site-navigation">
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
                {loggedUser ? (
                  <button className="logout-button" type="button" onClick={handleLogout}>
                    Sair
                  </button>
                ) : (
                  <>
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
                  </>
                )}
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
