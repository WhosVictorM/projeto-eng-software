import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (event) => {
      event.preventDefault();
      // Simule a lógica de login aqui
      if (email === 'admin@email.com' && password === 'admin') {
        navigate("/dashboard");
      } else {
        setError('Invalid email or password');
      }
    };

  return (
    <div className='app-container'>
      <div className="l-container">
        <span className="title">Storage Management</span>
        <span className="sub-title">Login</span>
        <form className="form" on onSubmit={handleLogin}>
          <input className="l-input" type="email" placeholder="Enter your E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="l-input" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="l-button" type="submit">Log In</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="p-register">Don't have account? <Link className="a-register" to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}
