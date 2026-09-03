import './style.css'

function InputCadastro({ label, type, id, placeholder, value, onChange, required, className = "", ...props }) {
  return (
      <label className="form-field" htmlFor={id}>
        <span className="form-field__label">{label || placeholder}</span>
        <input
          className={`form-input ${className}`.trim()}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      </label>
  );
}

export default InputCadastro;
