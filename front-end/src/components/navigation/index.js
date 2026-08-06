import InputSearch from "../inputSearch";

import './style.css'

function Navigation() {
  return (
      <nav>
          <div className="logo" alt="">LOGO</div>
          <div className="search">
            <InputSearch></InputSearch>
              <ul className="menu-options">
                <li>Categoria 1</li>
                <li>Categoria 2</li>
                <li>Categoria 3</li>
                <li>Categoria 4</li>
              </ul>
          </div> 
          <div className="nav-right">
            <div className="user">user</div>
            <div className="cart">cart</div>
          </div>
          
        </nav>
  );
}

export default Navigation;