import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Sugerencia from '../sugerencia/Sugerencia';
import { monedasApi } from '../../services/Services.js';
import { cargarMonedas } from '../../features/monedasSlice/MonedasSli';
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import Aviso from '../aviso/Aviso';


const IA_operaciones = () => {
    const transacciones_todas = useSelector((state) => state.Transacciones.transacciones);
    const monedas_todas = useSelector((state) => state.Monedas);
    const [sugerencia, setSugerencia] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const algoritmo_IA = (transacciones, p_monedas) => {
            if (p_monedas.length > 0 && transacciones.length > 0) {
                const monedas = [...p_monedas];
                const todas_transacciones = [...transacciones];
                const callBack = (moneda, index) => {
                    const transaccion = todas_transacciones.findLast((t) => t.moneda == moneda.id);
                    if (transaccion == undefined) {
                        return {
                            cantidad: undefined,
                            id: index + 1,
                            moneda: undefined,
                            tipo_operacion: undefined,
                            usuarios_id: undefined,
                            cotizacion_anterior: undefined,
                            cotizacion_actual: undefined
                        }
                    }
                    return {
                        cantidad: transaccion.cantidad,
                        id: index + 1,
                        moneda: moneda.nombre,
                        tipo_operacion: transaccion.tipo_operacion,
                        usuarios_id: transaccion.usuarios_id,
                        cotizacion_anterior: transaccion.valor_actual,
                        cotizacion_actual: moneda.cotizacion
                    }
                }
                const monto_x_moneda = monedas.map((m, i) => callBack(m, i));
                return monto_x_moneda;
            }
            return [];
        }
        setSugerencia(algoritmo_IA(transacciones_todas, monedas_todas));
    }, [monedas_todas, transacciones_todas])

    if (transacciones_todas.length == 0) {
        return (
            <div className='container my-4 text-center'>
                <h2 className='text-center my-4'><i className="bi bi-robot"></i>  IA Operaciones</h2>
                <Aviso titulo={"Aviso !"} mensaje={"No hay transaciones realizadas"}></Aviso>
            </div>
        )
    } else {
        return (
            <Container className="my-4 text-center">
                <h2 className='text-center'><i className="bi bi-robot"></i>  IA Operaciones</h2>
                <Table bordered hover className="my-4">
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Tipo operacion</th>
                            <th>Moneda</th>
                            <th>Cantidad</th>
                            <th>Cotizacion anterior</th>
                            <th>Cotizacion actual</th>
                            <th>Operacion sugerida</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            sugerencia.map(s => <Sugerencia key={s.id} {...s}></Sugerencia>)
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }



}

export default IA_operaciones;

