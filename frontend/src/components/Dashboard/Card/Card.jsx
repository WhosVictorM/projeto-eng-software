import React from 'react'

export default function Card({valor}) {
  return (
    <div className="card-container">
        <p className="card-value">{valor}</p>
    </div>
  )
}
