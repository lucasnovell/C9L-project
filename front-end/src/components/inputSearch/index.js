import './style.css'

function InputSearch({ value, onChange, onFocus, placeholder = "Buscar produto", ariaLabel = "Buscar produto" }) {
  return (
      <input
        className="input-search"
        type="search"
        id="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
      />
  );
}

export default InputSearch;
