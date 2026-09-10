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
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchToggleRef = useRef(null);
  const restoreSearchFocusRef = useRef(false);
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
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else if (restoreSearchFocusRef.current) {
      searchToggleRef.current?.focus();
      restoreSearchFocusRef.current = false;
    }
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    // Keep this aligned with the desktop breakpoint in navigation/style.css.
    const compactViewport = window.matchMedia("(width < 64rem)");
    const handleViewportChange = () => {
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setShowSuggestions(false);
    };
    compactViewport.addEventListener("change", handleViewportChange);
    return () => compactViewport.removeEventListener("change", handleViewportChange);
  }, []);

  const closeSearch = () => {
    restoreSearchFocusRef.current = true;
    setSearchOpen(false);
    setShowSuggestions(false);
  };

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
    if (searchOpen) closeSearch();
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
      <header className={`store-header ${searchOpen ? "store-header--search-open" : ""}`}>
        <div className="store-promo" role="status">
          <span>Frete grátis em produtos selecionados</span>
          <span className="store-promo__detail">Tecnologia certa, entrega segura.</span>
        </div>

        <nav className="site-navigation site-navigation--home" aria-label="Navegação principal">
          <div className="site-navigation__shell">
            <div className="site-navigation__top">
              <Link className="home-link brand" to="/" aria-label="C9L Store — início">
                <span className="brand__symbol" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" role="img" aria-label="C9L">
                    <path fill="#155EEF" d="M14 0H34.4A5.6 5.6 0 0 1 40 5.6V26A14 14 0 0 1 26 40H5.6A5.6 5.6 0 0 1 0 34.4V14A14 14 0 0 1 14 0Z"/>
                    <g fill="#fff" transform="translate(-4.5859375 0)">
                      <path transform="translate(10.0378125 25.8203125)" d="M6.1484375,0.15625C5.1015625,0.15625 4.162760257720947,-0.0755208432674408 3.33203125,-0.5390625 2.5013020038604736,-1.0026041269302368 1.8450520038604736,-1.6796875 1.36328125,-2.5703125 0.8815103769302368,-3.4609375 0.640625,-4.541666507720947 0.640625,-5.8125 0.640625,-7.093749523162842 0.8841145634651184,-8.1796875 1.37109375,-9.0703125 1.8580728769302368,-9.9609375 2.5182290077209473,-10.638020515441895 3.3515625,-11.1015625 4.1848955154418945,-11.565103530883789 5.1171875,-11.796875 6.1484375,-11.796875 6.8411455154418945,-11.796875 7.4817705154418945,-11.701822280883789 8.0703125,-11.51171875 8.658853530883789,-11.321614265441895 9.1796875,-11.044270515441895 9.6328125,-10.6796875 10.0859375,-10.315103530883789 10.454426765441895,-9.868489265441895 10.73828125,-9.33984375 11.022134780883789,-8.811197280883789 11.205728530883789,-8.208333015441895 11.2890625,-7.53125L8.5,-7.53125C8.453125,-7.8177080154418945 8.3671875,-8.07421875 8.2421875,-8.30078125 8.1171875,-8.52734375 7.95703125,-8.721353530883789 7.76171875,-8.8828125 7.56640625,-9.044270515441895 7.338541507720947,-9.166666030883789 7.078125,-9.25 6.8177080154418945,-9.333333015441895 6.53125,-9.375 6.21875,-9.375 5.651041507720947,-9.375 5.16015625,-9.234375 4.74609375,-8.953125 4.33203125,-8.671875 4.014322757720947,-8.266926765441895 3.79296875,-7.73828125 3.5716145038604736,-7.209635257720947 3.4609375,-6.5677080154418945 3.4609375,-5.8125 3.4609375,-5.0364580154418945 3.57421875,-4.3841142654418945 3.80078125,-3.85546875 4.02734375,-3.3268227577209473 4.3450517654418945,-2.9296875 4.75390625,-2.6640625 5.162760257720947,-2.3984375 5.6458330154418945,-2.265625 6.203125,-2.265625 6.515625,-2.265625 6.8020830154418945,-2.3072915077209473 7.0625,-2.390625 7.322916030883789,-2.4739582538604736 7.5520830154418945,-2.5963540077209473 7.75,-2.7578125 7.947916507720947,-2.9192707538604736 8.111978530883789,-3.11328125 8.2421875,-3.33984375 8.372395515441895,-3.566406011581421 8.4609375,-3.8229165077209473 8.5078125,-4.109375L11.296875,-4.109375C11.244791030883789,-3.5885415077209473 11.096353530883789,-3.0768227577209473 10.8515625,-2.57421875 10.606770515441895,-2.0716145038604736 10.266926765441895,-1.61328125 9.83203125,-1.19921875 9.397134780883789,-0.78515625 8.872395515441895,-0.4557291567325592 8.2578125,-0.2109375 7.643228530883789,0.033854156732559204 6.940103530883789,0.15625 6.1484375,0.15625z"/>
                      <path transform="translate(20.65625 25.8203125)" d="M5.0703125,0.1796875C4.2630205154418945,0.1796875 3.5494790077209473,0.020833320915699005 2.9296875,-0.296875 2.3098957538604736,-0.6145832538604736 1.8138020038604736,-1.0416666269302368 1.44140625,-1.578125 1.0690103769302368,-2.1145832538604736 0.8463541269302368,-2.7083334922790527 0.7734375,-3.359375L3.4921875,-3.359375C3.5755207538604736,-2.984375 3.7591145038604736,-2.6940102577209473 4.04296875,-2.48828125 4.326822757720947,-2.2825520038604736 4.6692705154418945,-2.1796875 5.0703125,-2.1796875 5.549479007720947,-2.1796875 5.94921875,-2.3216145038604736 6.26953125,-2.60546875 6.589843273162842,-2.8893227577209473 6.828124523162842,-3.2916665077209473 6.984375,-3.8125 7.140624523162842,-4.3333330154418945 7.218749523162842,-4.9427080154418945 7.21875,-5.640625L7.1484375,-5.640625C6.992187023162842,-5.296875 6.764322280883789,-5 6.46484375,-4.75 6.1653642654418945,-4.5 5.822916507720947,-4.30859375 5.4375,-4.17578125 5.0520830154418945,-4.04296875 4.643229007720947,-3.9765625 4.2109375,-3.9765625 3.5130205154418945,-3.9765625 2.8958330154418945,-4.13671875 2.359375,-4.45703125 1.8229166269302368,-4.77734375 1.40234375,-5.21875 1.09765625,-5.78125 0.79296875,-6.34375 0.640625,-6.984375 0.640625,-7.703125 0.640625,-8.510416030883789 0.8307291269302368,-9.225259780883789 1.2109375,-9.84765625 1.5911457538604736,-10.470051765441895 2.1184895038604736,-10.955728530883789 2.79296875,-11.3046875 3.4674477577209473,-11.653645515441895 4.2473955154418945,-11.825520515441895 5.1328125,-11.8203125 5.768229007720947,-11.8203125 6.373697757720947,-11.716145515441895 6.94921875,-11.5078125 7.5247392654418945,-11.299478530883789 8.036458015441895,-10.96875 8.484375,-10.515625 8.932291030883789,-10.0625 9.287759780883789,-9.467447280883789 9.55078125,-8.73046875 9.813801765441895,-7.9934892654418945 9.9453125,-7.09375 9.9453125,-6.03125 9.9453125,-5.0677080154418945 9.830728530883789,-4.203125 9.6015625,-3.4375 9.372395515441895,-2.671875 9.044270515441895,-2.01953125 8.6171875,-1.48046875 8.190103530883789,-0.94140625 7.6770830154418945,-0.5299478769302368 7.078125,-0.24609375 6.479166507720947,0.037760406732559204 5.8098955154418945,0.1796875 5.0703125,0.1796875z M5.140625,-5.9140625C5.401041507720947,-5.9140625 5.643229007720947,-5.9622392654418945 5.8671875,-6.05859375 6.0911455154418945,-6.154947757720947 6.28515625,-6.2890625 6.44921875,-6.4609375 6.61328125,-6.6328125 6.740885257720947,-6.83203125 6.83203125,-7.05859375 6.9231767654418945,-7.28515625 6.96875,-7.53125 6.96875,-7.796875 6.96875,-8.145833015441895 6.890625,-8.4609375 6.734375,-8.7421875 6.578125,-9.0234375 6.36328125,-9.247395515441895 6.08984375,-9.4140625 5.81640625,-9.580728530883789 5.502604007720947,-9.6640625 5.1484375,-9.6640625 4.8046875,-9.6640625 4.4934892654418945,-9.58203125 4.21484375,-9.41796875 3.9361977577209473,-9.25390625 3.7174477577209473,-9.029947280883789 3.55859375,-8.74609375 3.3997395038604736,-8.462239265441895 3.3203125,-8.143228530883789 3.3203125,-7.7890625 3.3203125,-7.4296875 3.3997395038604736,-7.109375 3.55859375,-6.828125 3.7174477577209473,-6.546875 3.933593511581421,-6.32421875 4.20703125,-6.16015625 4.48046875,-5.99609375 4.791666507720947,-5.9140625 5.140625,-5.9140625z"/>
                      <path transform="translate(29.9621875 25.8203125)" d="M0.9140625 0L0.90625-11.640625H3.65625L3.6640625-2.25H8.5234375L8.53125 0Z"/>
                    </g>
                  </svg>
                </span>
                <span className="brand__name">C9L<span>STORE</span></span>
              </Link>

              <div className="search search--home" id="header-search" ref={searchRef}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    if (searchOpen) closeSearch();
                    else setShowSuggestions(false);
                  }
                }}>
                <button className="compact-search-button search-back-button" type="button"
                  aria-label="Fechar busca e voltar à navegação" onClick={closeSearch}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h15" /></svg>
                </button>
                <form className="search-form search-form--home" onSubmit={handleSubmit} role="search">
                  <InputSearch
                    inputRef={searchInputRef}
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
                <button className="compact-search-button search-toggle-button" type="button"
                  ref={searchToggleRef} aria-label="Abrir busca" aria-expanded={searchOpen}
                  aria-controls="header-search" onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}>
                  <SearchIcon />
                </button>
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
