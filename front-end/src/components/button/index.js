import { Link } from "react-router-dom";

import "./style.css";

function getButtonClasses(variant, size, className = "") {
  return `button button--${variant} button--${size} ${className}`.trim();
}

function Button({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      className={getButtonClasses(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="button__spinner" aria-hidden="true" />}
      <span>{loading ? "Carregando" : children}</span>
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) {
  return (
    <Link className={getButtonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export default Button;
