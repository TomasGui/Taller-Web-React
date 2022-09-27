import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { cargarMonedas } from '../../features/monedasSlice/MonedasSli';
import { monedasApi } from '../../services/Services.js'
import Form from 'react-bootstrap/Form'


const Combo_moneda = ({ optener_moneda }) => {

    const idMoneda = useRef(null);
    const monedas = useSelector((state) => state.Monedas);

    const seleccionMoneda = (event) => {
        optener_moneda(idMoneda.current.value);
    }

    return (
        <div>
            <Form.Label>Moneda</Form.Label>
            <Form.Select aria-label="Seleccione moneda" name="moneda" id="id_moneda" onChange={seleccionMoneda} ref={idMoneda}>
                <option value="0">Seleccione moneda</option>
                {
                    monedas.map((m) => (
                        <option key={m.id} value={m.id} > {m.nombre} </option>
                    ))
                }
            </Form.Select>
        </div>
    )

}

export default Combo_moneda

