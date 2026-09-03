import Button from "../button";

import './style.css'

function ButtonSubmit({ children, onClick, type = "submit", disabled = false, loading = false, variant = "primary", size = "large", className = "" }) {
  return (
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        variant={variant}
        size={size}
        className={`button-submit ${className}`.trim()}
      >
        {children}
      </Button>
  );
}

export default ButtonSubmit;
