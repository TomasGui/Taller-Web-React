import React from 'react'
import { useSelector } from "react-redux";

const Tabla = ({ id, moneda, tipo_operacion, cantidad, valor_actual }) => {

    const MonedasAll = useSelector((state) => state.Monedas);

    const NombreMoneda = (id_moneda) => {
        if (MonedasAll.length > 0) {
            const nombre_moneda = MonedasAll.find(m => m.id === id_moneda);
            return nombre_moneda ? nombre_moneda.nombre : "--Moneda incorrecta --";
        }
        return "--Moneda incorrecta --";
    }
    return (
        <tr>
            <td><strong>{id}</strong></td>
            <td>{NombreMoneda(moneda)}</td>
            <td>{tipo_operacion == 1 ? "Compra" : "Venta"}</td>
            <td>{cantidad}</td>
            <td>{` $  ${valor_actual}`}</td>
        </tr>
    )
}




export default Tabla