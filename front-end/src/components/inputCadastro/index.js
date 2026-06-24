import './style.css'

function InputCadastro({type, id, placeholder}) {
  return (
      <input type={type} id={id} placeholder={placeholder}></input>
  );
}

export default InputCadastro;