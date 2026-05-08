import {useNavigate} from 'react-router'

function Register() {

  const navigate=useNavigate();

  const onRegister=()=>{
    navigate("/login")
  }
  return (
    <div>
      <button onClick={onRegister}>Register</button>
    </div>
  )
}

export default Register