

import './style.css'

function ButtonSubmit({children, onClick, type = "submit", disabled = false}) {
  return (
      <button type={type} onClick={onClick} disabled={disabled}> {children} </button>
  );
}

export default ButtonSubmit;
