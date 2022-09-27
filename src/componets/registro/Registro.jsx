import React from 'react'
import Input_usuario from '../input_usuario/Input_usuario'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { cargarCiudades, cargarDepartamentos } from "../../features/departamentos_ciudaddes/Departamentos_CiudadesSlice";
import { departamentosApi, ciudades_todasApi } from '../../services/Services.js';


const Registro = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const datosDepartamentos = async () => {
            try {
                const respDeptos = await departamentosApi();
                dispatch(cargarDepartamentos(respDeptos.departamentos));
            } catch (error) {
                swal('Oops!', error, 'error');
                navigate("/login");
            }
        }
        const datosCiudades = async () => {
            try {
                const respCiudades = await ciudades_todasApi();
                dispatch(cargarCiudades(respCiudades.ciudades));
            } catch (error) {
                swal('Oops!', error, 'error');
                navigate("/login");
            }
        }
        datosDepartamentos();
        datosCiudades();
    }, [])

    const logeado = () => {
        localStorage.getItem("apiKey") != undefined ? navigate("/") : navigate("/login")
    }

    return (
        <div className='container'>
            <Input_usuario titulo={"Registro"} logeado={logeado}></Input_usuario>
        </div>

    )
}

export default Registro