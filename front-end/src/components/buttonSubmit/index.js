import { useNavigate } from "react-router-dom";

import './style.css'

function ButtonSubmit({children, page}) {
  const navigate = useNavigate();
  return (
      <button type="submit" onClick={() => navigate(page)}>{children}</button>
  );
}

export default ButtonSubmit;