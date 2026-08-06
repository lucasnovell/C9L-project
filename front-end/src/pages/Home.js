import Navigation from "../components/navigation";
import ProductCard from "../components/productCard"

import "./styles/home.css"


function Home() {
  return (
    <div className="Home">
        <Navigation></Navigation>
        <header>BANNER DE PROMOÇÕES</header>
        <div className="home-products">
            <ProductCard></ProductCard>
        </div>
    </div>
  );
}

export default Home;