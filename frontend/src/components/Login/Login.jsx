import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      }
    }, [navigate]);
  
    const handleLogin = async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post("http://localhost:3001/api/auth/login", {
          email,
          password
        });

        console.log('Response:', response); // Log da resposta completa

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('welcomeMessage', response.data.message)
          
          // Redirecione para a página de dashboard
          navigate("/dashboard");
        } else {
          // Se a resposta não contiver um token, exiba uma mensagem de erro
          setError('Login failed');
        }
      } catch (error) {
        console.error('Error:', error); // Log do erro completo
        // Se houver um erro, exiba uma mensagem de erro genérica
        setError('An error occurred while logging in.');
      }
    };

  return (
    <div className='app-container'>
      <div className="l-container">
        <span className="title">Storage Management</span>
        <span className="sub-title">Login</span>
        <form className="form" onSubmit={handleLogin}>
          <input className="l-input" type="email" placeholder="Enter your E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="l-input" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="l-button" type="submit">Log In</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="p-register">Don't have account? <Link className="a-register" to="/register">Sign Up</Link></p>
      </div>
    </div>
  )
}
