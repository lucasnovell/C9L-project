import './style.css'

function InputCadastro({type, id, placeholder, value, onChange}) {
  return (
      <input type={type} id={id} placeholder={placeholder} value={value}
      onChange={onChange}></input>
  );
}

export default InputCadastro;