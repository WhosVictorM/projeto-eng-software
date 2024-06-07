import React from "react"
import {Routes, Route} from 'react-router-dom';
import ProductList from "./components/ProductList/ProductsList";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./styles/globals.css"



export default function App() {

  
    
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProductList />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}


