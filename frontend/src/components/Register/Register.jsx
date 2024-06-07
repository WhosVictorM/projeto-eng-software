import React from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
    <div className='app-container'>
        <div className="l-container">
            <span className="title">Storage Management</span>
            <span className="sub-title">Sign Up</span>
            <form className="form">
            <input className="l-input" type="email" placeholder="Enter your E-mail"/>
            <input className="l-input" type="text" placeholder="Enter your Name"/>
            <input className="l-input" type="password" placeholder="Enter your Password"/>
            <button className="l-button">Submit</button>
            </form>
            <p className="p-register">Already an have account? <Link className="a-register" to="/login">Log In</Link></p>
        </div>
      </div>
    )
  }
  