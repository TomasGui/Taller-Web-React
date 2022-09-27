import React, { useRef, useState } from 'react'
import { loginApi, registroApi } from '../../services/Services.js'
import Combo_departamento_ciudad from '../combo_departamento_ciudad/Combo_departamento_ciudad'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Boton_navegar from '../boton_navegar/Boton_navegar.jsx';
import { validar_Datos_session, validar_Datos_usuario } from '../../validaciones/Validaciones.js';
import swal from 'sweetalert';


const Input_usuario = ({ titulo, logeado }) => {

    const [estadoLoginRegistro, setEstadoLoginRegistro] = useState(titulo === "Login" ? false : true);
    const nombreUsuario = useRef(null);
    const password = useRef(null);
    const [botonSumit, setBotonSumit] = useState(true);

    const [datos, setDatos] = useState({
        usuario: '',
        password: '',
        id_departamento: 0,
        id_ciudad: 0
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        datos.usuario != "" && datos.password != "" ? setBotonSumit(false) : setBotonSumit(true);
    }

    const estaLogeado = () => { logeado() }

    const handleSubmit = async (event) => {

        event.preventDefault();

        console.log(`Datos ${titulo}`, datos);

        try {
            if (titulo === "Login" && validar_Datos_session(datos)) {
                const respLogin = await loginApi(datos);
                localStorage.setItem("apiKey", respLogin.apiKey);
                localStorage.setItem("id", respLogin.id);
                estaLogeado();
            } else if (titulo == "Registro" && validar_Datos_usuario(datos)) {
                const respRegistro = await registroApi(datos);
                localStorage.setItem("apiKey", respRegistro.apiKey);
                localStorage.setItem("id", respRegistro.id);
                estaLogeado();
            } else {
                swal('Datos invalidos', "Todos los campos deben estar completos", 'warning');
            }
        } catch (error) {
            swal('Oops!', error, 'error');
        }

    }

    return (
        <Container>
            <Row className="mt-6 pb-4 ">
                <h1 className="shadow-sm text-dark mt-4 p-3 text-center"><i className="bi bi-person-circle mx-3"></i>{titulo}</h1>
                <Col lg={5} md={6} sm={12} className="p-3 fondo_blanco m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label>Nombre </Form.Label>
                            <Form.Control type="text" placeholder="Ingresar nombre" ref={nombreUsuario} name="usuario" onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className='my-3' >
                            <Form.Label>Contraseña </Form.Label>
                            <Form.Control type="password" placeholder="Ingresar contrasena" id="contrasena" ref={password} name="password" onChange={handleInputChange} required />
                        </Form.Group>
                        {
                            estadoLoginRegistro == true ? <Combo_departamento_ciudad handleInputChange={handleInputChange}></Combo_departamento_ciudad> : <br />
                        }
                        <Form.Group className='card-body d-flex justify-content-center' >
                            <Button variant={"dark btn-block"} type="submit" disabled={botonSumit}>{titulo == "Login" ? "Iniciar Session" : "Registrarse"}</Button>
                        </Form.Group>
                        <div className='card-body d-flex justify-content-center'>
                            <p className='m-3'>{titulo == "Login" ? "Aun no tienes cuenta?" : "Ya tenes cuenta?"}</p>
                            <Boton_navegar ruta={titulo == "Login" ? "registro" : "login"} mensaje={"Ir"}></Boton_navegar>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container >

    )
}

export default Input_usuario




