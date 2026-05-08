import {useNavigate} from 'react-router'

function Login() {

  const navigate=useNavigate();

  const onLogin=()=>{
    navigate("/dashboard");
  }

  return (
    <div>
      <button onClick={onLogin} >Login</button>
    </div>
  )
}

export default Login