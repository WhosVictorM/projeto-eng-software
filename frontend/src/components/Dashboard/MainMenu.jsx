import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "./Dashboard";



export const handleLogout = (navigate) => {
  return () => {
    // Limpe o token no localStorage ao fazer logout
    localStorage.removeItem('token');
    localStorage.removeItem('welcomeMessage');
    localStorage.removeItem('username')
    navigate("/login");
  };
};

export default function ProductList() {
  const navigate = useNavigate();


  
  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não houver token, redirecione para a página de login
      navigate("/login");
    } else {
      const message = localStorage.getItem("welcomeMessage");
      if(message){
        alert(message);
        localStorage.removeItem("welcomeMessage")
      }


      // Se houver token, carregue os produtos
      axios.get("http://localhost:3001/api/products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        const dataProducts = res.data;
        setProducts(dataProducts);
      }).catch((error) => {
        console.error("Error fetching products:", error);
        // Se ocorrer um erro ao buscar os produtos, redirecione para a página de login
        navigate("/login");
      });
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Se houver token, redirecione para o dashboard ou página inicial
      navigate("/dashboard");
    }
  }, [navigate]);

  

  return (
    // <div>
    //   <h1>Product List</h1>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product._id}>
    //         {product.name} - {product.quantity} - R${product.price}
    //         <button onClick={() => handleDelete(product._id)}>Delete</button>
    //       </li>
    //     ))}
    //   </ul>

    //   <button className="logout-btn" onClick={handleLogout}>
    //     Logout
    //   </button>
    // </div>

    <div className="dboard-container">
      <Sidebar/>
      <Dashboard/>
    </div>
    
  );
}
