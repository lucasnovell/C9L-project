

import './style.css'

function ButtonSubmit({children, onClick, type = "submit"}) {
  return (
      <button type={type} onClick={onClick}> {children} </button>
  );
}

export default ButtonSubmit;
