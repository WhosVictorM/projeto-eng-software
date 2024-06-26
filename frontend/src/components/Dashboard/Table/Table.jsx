import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Table() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Número de itens por página
  const [totalValue, setTotalValue] = useState(0); // Estado para armazenar o valor total dos produtos

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Se não houver token, redirecione para a página de login
      navigate("/login");
    } else {
      const message = localStorage.getItem("welcomeMessage");
      if (message) {
        alert(message);
        localStorage.removeItem("welcomeMessage");
      }

      // Se houver token, carregue os produtos
      axios
        .get("http://localhost:3001/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const dataProducts = res.data;
          setProducts(dataProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          // Se ocorrer um erro ao buscar os produtos, redirecione para a página de login
          navigate("/login");
        });
    }
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Função para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <table className="table-dashboard">
        <thead className="header-table">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Validity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>$ {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.validity}</td>
              <td className="btn-edit">
                <EditIcon />
              </td>
              <td className="btn-delete">
                <DeleteIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

// Componente de Paginação
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
