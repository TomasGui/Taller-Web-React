import React from 'react'

const Icono_aviso = ({ aviso }) => {
    if (aviso == "Vender") {
        return (
            <i className="bi bi-graph-up-arrow"></i>
        )
    } else if (aviso == "Comprar") {
        return (
            <i className="bi bi-graph-down-arrow"></i>
        )
    } else if (aviso == "Mantener") {
        return (
            <i className="bi bi-sign-stop"></i>
        )
    } else if (aviso == "Esperar")
        return (
            <i className="bi bi-hourglass-split"></i>
        )
    return (
        <i className="bi bi-exclamation-triangle"></i>
    )
}

export default Icono_aviso