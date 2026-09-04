import { Link } from "react-router-dom";

import "./style.css";


const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div>
          <div className="brand brand--footer" aria-label="C9L Store">
            <span className="brand__symbol" aria-hidden="true">C9</span>
            <span className="brand__name">C9L<span>STORE</span></span>
          </div>
          <p>Tecnologia para acompanhar todos os seus ritmos.</p>
        </div>
        <nav aria-label="Links institucionais">
          <Link onClick={scrollToTop}>Início</Link>
          <Link to="/busca?q=notebook">Notebooks</Link>
          <Link to="/busca?q=gamer">Games</Link>
          <Link to="/cart">Carrinho</Link>
        </nav>
        <div className="site-footer__note">
          <strong>Atendimento</strong>
          <span>Consulte nossos canais na área da sua conta.</span>
        </div>
      </div>
      <div className="site-container site-footer__bottom">
        <span>© 2026 C9L Store</span>
        <span>Compra segura e experiência pensada para você.</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
