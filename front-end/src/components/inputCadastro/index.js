import './style.css'

function InputCadastro({type, id, placeholder, value, onChange, required}) {
  return (
      <input type={type} id={id} placeholder={placeholder} value={value}
      onChange={onChange} required={required}></input>
  );
}

export default InputCadastro;
