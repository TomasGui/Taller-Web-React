import React from 'react'
import { useNavigate } from "react-router-dom";


const Boton_navegar = ({ ruta, mensaje }) => {
    const navigate = useNavigate();

    const cambiarRuta = () => {
        navigate(ruta)
    }

    return (
        <button onClick={cambiarRuta} className="btn btn-link" > {mensaje}</button>
    )
}

export default Boton_navegar