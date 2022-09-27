import React from 'react'

const Aviso = ({ titulo, mensaje }) => {
    return (
        <div className="alert alert-warning my-3" role="alert">
            <h4 className="alert-heading">{titulo}</h4>
            <p>{mensaje}</p>
        </div>
    )
}

export default Aviso