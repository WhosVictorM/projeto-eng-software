import React from "react"
import {Routes, Route} from 'react-router-dom';
import ProductList from "./components/Dashboard/MainMenu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./styles/globals.css"
import AboutUs from "./components/AboutUs/AboutUs";



export default function App() {

  
    
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProductList />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}


