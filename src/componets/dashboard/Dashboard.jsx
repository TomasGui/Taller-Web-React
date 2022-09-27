import React, { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { cargarTransacciones } from '../../features/transacciones/TransaccionesSli';
import { cargarMonedas } from '../../features/monedasSlice/MonedasSli'
import { transaccionesApi, monedasApi } from '../../services/Services.js'
import Home from "../home/Home";
import Login from "../login/Login";
import swal from 'sweetalert';


const Dashboard = () => {

    //Consultas a las API
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const monedas_todas = useSelector((state) => state.Monedas);


    useEffect(() => {
        const datosTransacciones = async () => {
            try {
                const respTrans = await transaccionesApi(localStorage.getItem("apiKey"));
                dispatch(cargarTransacciones(respTrans.transacciones));
            } catch (error) {
                swal('Oops!', error, 'error');
                localStorage.clear();
                navigate("/login");
            }
        }
        const datosMonedas = async () => {
            try {
                const respMonedas = await monedasApi(localStorage.getItem("apiKey"));
                dispatch(cargarMonedas(respMonedas.monedas))
            } catch (error) {
                swal('Oops!', error, 'error');
                navigate("/login");
                localStorage.clear();
            }
        }
        if (localStorage.getItem("apiKey") != undefined) {
            datosTransacciones();
            datosMonedas();
        }
    }, [])

    useEffect(() => {
        console.log('UseEffect por cambio ruta :', window.location.pathname)
        const datosMonedas = async () => {
            try {
                const respMonedas = await monedasApi(localStorage.getItem("apiKey"));
                dispatch(cargarMonedas(respMonedas.monedas))
            } catch (error) {
                swal('Oops!', error, 'error');
                localStorage.clear();
                navigate("/login");

            }
        }
        if (localStorage.getItem("apiKey") != undefined && window.location.pathname === '/IA' || window.location.pathname === '/Alta_transaccion') {
            const interval = setInterval(() => {
                console.log("Consultando a API ...");
                datosMonedas();
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [monedas_todas, window.location.pathname])

    const logOut = () => {
        swal({
            title: "Desea salir ?",
            text: "Confirmar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Adios! Nos vemos pronto", {
                        icon: "success",
                    });
                    localStorage.clear();
                    navigate("/login");
                } else {
                    swal("A seguir comprando!");
                }
            });
    }

    if (localStorage.getItem("id") == undefined || localStorage.getItem("id") == null) {
        return <Login />;
    } else {
        if (localStorage.getItem("apiKey") == undefined) {
            console.log(`ApiKey`, localStorage.getItem("apiKey"));
            return <Navigate replace to={"/login"}></Navigate>;
        } else {
            return (
                <div>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="Home"><svg xmlns="http://www.w3.org/2000/svg" height="50px" fill="currentColor" className="bi bi-currency-bitcoin" viewBox="0 0 16 16">
                                <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
                            </svg></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/Alta_transaccion" >Crear Transaccion</Nav.Link>
                                    <Nav.Link as={Link} to="/Lista" >Transacciones</Nav.Link>
                                    <Nav.Link as={Link} to="/MontoFinal" >Monto total</Nav.Link>
                                    <Nav.Link as={Link} to="/IA" >Inteligencia Artificial</Nav.Link>
                                    <NavDropdown title="Graficas" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="GraficarCompras">Grafica compras</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="GraficarVentas">Grafica ventas</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="GraficarPorMonedas">Grafica por moneda</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Nav>
                                    <Nav.Link as={Link} to="/" onClick={logOut}> Salir </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Outlet></Outlet>
                </div>
            );
        }
    }
}

export default Dashboard;
