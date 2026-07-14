import { useNavigate } from "react-router-dom";

import './style.css'

function ButtonSubmit({children, page}) {
  return (
      <button type="submit">{children}</button>
  );
}

export default ButtonSubmit;