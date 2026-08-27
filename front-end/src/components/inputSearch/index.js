import './style.css'

function InputSearch({ value, onChange, onFocus }) {
  return (
      <input
        type="search"
        id="search"
        placeholder="Buscar produto"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
      />
  );
}

export default InputSearch;
