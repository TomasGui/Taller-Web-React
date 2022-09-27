import { useState } from "react";
import Icono_aviso from "./Icono_aviso";

const Sugerencia = ({ id, tipo_operacion, moneda, cotizacion_anterior, cotizacion_actual, cantidad }) => {

    const OperacionSugerida = (cotizacion_actual, cotizacion_anterior) => {

        if (tipo_operacion == 1)
            return cotizacion_actual > cotizacion_anterior ? "Vender" : "Mantener";
        if (tipo_operacion == 2)
            return cotizacion_actual < cotizacion_anterior ? "Comprar" : "Esperar";
        return "No es posible sugerir";
    }

    const Nombre_TipoOperacion = (tipo) => {
        if (tipo == 1) {
            return "Compra"
        }
        if (tipo == 2) {
            return "Venta"
        }
        return "Indefinido"
    }

    if (tipo_operacion == undefined || moneda == undefined || cotizacion_actual == undefined) {
        return (
            <></>
        )
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{Nombre_TipoOperacion(tipo_operacion)}</td>
            <td>{moneda}</td>
            <td>{cantidad}</td>
            <td>{cotizacion_anterior}</td>
            <td>{cotizacion_actual}</td>
            <td><Icono_aviso aviso={OperacionSugerida(cotizacion_actual, cotizacion_anterior)}></Icono_aviso>   {OperacionSugerida(cotizacion_actual, cotizacion_anterior)}</td>
        </tr>
    )
}

export default Sugerencia