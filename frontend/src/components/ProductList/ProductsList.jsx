import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3001/api/products')
        .then(res => {
          const dataProducts = res.data
          setProducts(dataProducts)
        })
    })
      
    return(
      <div>
          <h1>Product List</h1>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                  {product.name} - {product.quantity} - R${product.price}
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
              </li>
              ))}
          </ul>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    )
  }