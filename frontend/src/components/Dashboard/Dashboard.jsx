import React from 'react'
import Card from './Card/Card'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="cards">
        <Card valor="Valor Total"/>
        <Card valor="Itens em Estoque"/>
        <Card valor="Itens em Falta"/>
        <Card valor="Faturamento"/>
      </div>
      
    </div>
  )
}
