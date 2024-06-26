import React from 'react'

export default function Card({valor, title}) {
  return (
    <div className="card-container">
        <p className="card-title">{title}</p>
        <p className="card-value">{valor}</p>
    </div>
  )
}
