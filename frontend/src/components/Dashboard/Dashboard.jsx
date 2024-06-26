import React, { useState, useEffect } from 'react'
import axios from "axios";
import Card from './Card/Card'
import Table from './Table/Table'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalQuantity] = useState(0);
  const [itemsWithZeroQuantity, setItemsWithZeroQuantity] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login")
          throw new Error("Token not found");
        }

        const response = await axios.get("http://localhost:3001/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const products = response.data;
        const total = products.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0);

        // Calcula a quantidade total de itens
        const totalQuantity = products.reduce((acc, product) => {
          return acc + product.quantity;
        }, 0);

        // Itens fora de estoque
        const zeroQuantityItems = products.filter(product => product.quantity === 0).length;

        // Valor médio 
        const average = products.length > 0 ? total / products.length : 0;

        setTotalValue(total);
        setTotalQuantity(totalQuantity)
        setItemsWithZeroQuantity(zeroQuantityItems)
        setAveragePrice(average)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para formatar o valor como moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="dashboard">
      <div className="cards">
        <Card title="Valor Total" valor={formatCurrency(totalValue)}/>
        <Card title="Itens em Estoque" valor={totalItems}/>
        <Card title="Itens em Falta" valor={itemsWithZeroQuantity}/>
        <Card title="Média de Preços" valor={formatCurrency(averagePrice)}/>
      </div>
      <Table/>
      
    </div>
  )
}
