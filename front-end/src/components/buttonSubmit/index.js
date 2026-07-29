

import './style.css'

function ButtonSubmit({children, page, onClick}) {
  return (
      <button type="submit" onClick={onClick}>{children}</button>
  );
}

export default ButtonSubmit;