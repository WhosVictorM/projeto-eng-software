import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        email,
        username: name,
        password,
      });

      console.log('Response:', response);
      
      if (response.status === 201) {
        // Redirecionar para a página de login após o registro bem-sucedido
        navigate("/login");
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className='app-container'>
      <div className="l-container">
        <span className="title">Storage Management</span>
        <span className="sub-title">Sign Up</span>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="l-input"
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="l-input"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="l-input"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="l-button" type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="p-register">Already have an account? <Link className="a-register" to="/login">Log In</Link></p>
      </div>
    </div>
  );
}