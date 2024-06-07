import React, {useState, useEffect} from "react"
import axios from "axios";

export default function ProductList() {
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
      </div>
    )
  }