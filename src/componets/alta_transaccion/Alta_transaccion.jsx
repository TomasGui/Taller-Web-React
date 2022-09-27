import React, { useState } from 'react'
import { Fragment } from 'react'
import Combo_moneda from '../combo_moneda/Combo_moneda'
import { useSelector, useDispatch } from "react-redux";
import { altaTransaccionesApi } from '../../services/Services.js'
import { Button, Col, Container, Form, Row, sele } from "react-bootstrap";
import { validar_Datos_Transaccion } from '../../validaciones/Validaciones.js'
import { useNavigate } from "react-router-dom";
import { agregarTransaccion } from '../../features/transacciones/TransaccionesSli';
import swal from 'sweetalert';
import { useEffect } from 'react';



const Alta_transaccion = () => {

    const navigate = useNavigate();
    const MonedasAll = useSelector((state) => state.Monedas);
    const dispatch = useDispatch();
    const [valorMoneda, setValorMoneda] = useState(0);
    const [datos, setDatos] = useState({

        idUsuario: localStorage.getItem("id"),
        tipoOperacion: 0,
        moneda: 0,
        cantidad: 0,
        valorActual: 0,
        apiKey: localStorage.getItem("apiKey")
    })

    const optener_moneda = (idMoneda) => {
        let monedaActual = MonedasAll.find((m) => m.id == idMoneda);
        monedaActual ? setValorMoneda(monedaActual.cotizacion) : setValorMoneda(0);
        monedaActual ? datos.moneda = parseInt(monedaActual.id) : datos.moneda = 0;
    }

    useEffect(() => {
        let monedaActual = MonedasAll.find((m) => m.id == datos.moneda);
        monedaActual ? setValorMoneda(monedaActual.cotizacion) : setValorMoneda(0);
    }, [MonedasAll])

    const handleInputChange = (event) => {

        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        datos.valorActual = valorMoneda;
        console.log(datos);
        if (validar_Datos_Transaccion(datos)) {
            try {
                const respAltaRegistro = await altaTransaccionesApi(datos);
                // Los atributos no son los mismo del ALTA - POST que LISTAR POST
                const nuevaTransaccion = {
                    id: respAltaRegistro.idTransaccion,
                    tipo_operacion: datos.tipoOperacion,
                    moneda: datos.moneda,
                    valor_actual: datos.valorActual,
                    cantidad: datos.cantidad,
                    usuarios_id: datos.idUsuario
                }
                dispatch(agregarTransaccion(nuevaTransaccion));
                swal('Bien hecho!', respAltaRegistro.mensaje, 'success');
                navigate("/Lista")
            } catch (error) {
                swal('Oops!', error, 'error');
            }
        } else {
            swal('Datos invalidos', "Todos los campos deben estar completos y selecionados", 'warning');
        }
    }



    return (
        <Fragment>
            <Container>
                <Row className="fondo_coin_1 pb-4">
                    <h1 className="shadow-sm text-dark mt-4 p-3 text-center"><i className="bi bi-cash-stack mx-3"></i>{"Alta Transaccion"}</h1>
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='my-3'>
                                <Form.Label>Tipo de Operacion</Form.Label>
                                <Form.Select placeholder="Seleccione Operacion" onChange={handleInputChange} name="tipoOperacion" id="tipo_operacion" >
                                    <option value="0"> Seleccionar operacion </option>
                                    <option value="1"> Compra </option>
                                    <option value="2"> Venta </option>
                                </Form.Select>
                            </Form.Group>
                            {
                                <Combo_moneda optener_moneda={optener_moneda}></Combo_moneda>
                            }
                            <Form.Group className='my-3'>
                                <Form.Label>Valor Actual </Form.Label>
                                <Form.Control type="text" id="criptomoneda_valoractual" name='valorActual' value={`$ ${valorMoneda} UYU`} plaintext readOnly />
                            </Form.Group>
                            <Form.Group className='my-3'>
                                <Form.Label>Cantidad </Form.Label>
                                <Form.Control type="number" id="cantidad_moneda" name="cantidad" onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group className='card-body d-flex justify-content-center'>
                                <Button variant={"dark btn-block"} type="submit" id="crear_submit">{"Crear"}</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment >

    )

}

export default Alta_transaccion


{/* < Container >

            <h1 className="shadow-sm text-dark mt-5 p-3 text-center"><i className="bi bi-person-circle mx-3"></i>{titulo}</h1>

            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label>Tipo de Operacion </Form.Label>
                            <Form.Control as="select" placeholder="Seleccione Operacion" onChange={handleInputChange} name="tipoOperacion" id="tipo_operacion" required />
                            <option value="1"> Compra </option>
                            <option value="2"> Venta </option>
                        </Form.Group>
                        {
                        <Combo_moneda optener_moneda={optener_moneda}></Combo_moneda>
                        }
                        <Form.Group className='my-3'>
                            <Form.Label>Valor Actual </Form.Label>
                            <Form.Control type="number" id="criptomoneda_valoractual" name='valorActual' value={valorMoneda} readOnly/>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Cantidad </Form.Label>
                            <Form.Control type="number" id="cantidad_moneda" name="cantidad" onChange={handleInputChange} required/>
                        </Form.Group>
                        <Form.Group className='mt-3 text-center' >
                            <Button variant={"dark btn-block"} type="submit" id="crear_submit"  disabled={botonSumit}>{"Crear"}</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </ > */}