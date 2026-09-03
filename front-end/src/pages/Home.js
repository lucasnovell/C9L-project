import { Link } from "react-router-dom";

import Navigation from "../components/navigation";
import ProductCard from "../components/productCard";
import { ButtonLink } from "../components/button";
import SiteFooter from "../components/footer";

import "./styles/home.css";

const categories = [
  { label: "Notebooks", query: "notebook", code: "NB" },
  { label: "Monitores", query: "monitor", code: "MN" },
  { label: "Periféricos", query: "mouse", code: "PF" },
  { label: "PC Gamer", query: "gamer", code: "PC" },
  { label: "Smartphones", query: "smartphone", code: "SP" },
  { label: "Consoles", query: "console", code: "GM" },
];

function Home() {
  return (
    <div className="Home">
      <Navigation variant="home" />

      <main>
        <section className="home-promo-banner" aria-labelledby="promo-title">
          <div className="home-container home-promo-banner__inner">
            <div>
              <span className="home-eyebrow">Ofertas para o seu próximo upgrade</span>
              <h1 id="promo-title">Tecnologia para trabalho, estudo e diversão.</h1>
              <p>Encontre notebooks, periféricos e produtos gamer selecionados para o seu ritmo.</p>
            </div>
            <ButtonLink to="/busca?q=gamer" variant="secondary" size="large">
              Ver promoções <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </section>

        <section className="home-categories" aria-labelledby="categories-title">
          <div className="home-container">
            <div className="home-section-heading">
              <div>
                <span className="home-eyebrow">Escolha seu universo</span>
                <h2 id="categories-title">Compre por categoria</h2>
              </div>
              <Link to="/busca?q=tecnologia" className="home-text-link">
                Ver catálogo <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="category-grid">
              {categories.map(category => (
                <Link key={category.label} className="category-card" to={`/busca?q=${category.query}`}>
                  <span className="category-card__icon" aria-hidden="true">{category.code}</span>
                  <span>{category.label}</span>
                  <small>Ver produtos</small>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-products-section" id="produtos" aria-labelledby="products-title">
          <div className="home-container">
            <div className="home-section-heading home-section-heading--products">
              <div>
                <span className="home-eyebrow">Destaques para você</span>
                <h2 id="products-title">Tecnologia que combina com o seu dia</h2>
              </div>
              <p>Uma seleção para trabalhar melhor, estudar com foco e jogar no máximo.</p>
            </div>
            <div className="home-products">
              <ProductCard variant="home" />
            </div>
          </div>
        </section>

        <section className="home-cta" aria-labelledby="cta-title">
          <div className="home-container home-cta__inner">
            <div>
              <span className="home-eyebrow">Seu próximo upgrade começa aqui</span>
              <h2 id="cta-title">Encontre a peça certa para o seu setup.</h2>
            </div>
            <ButtonLink to="/busca?q=gamer" variant="secondary" size="large">
              Explorar linha gamer <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Home;
