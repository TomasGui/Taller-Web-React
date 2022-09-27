import React from 'react'
import Input_usuario from '../input_usuario/Input_usuario'
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    const logeado = () => {
        localStorage.getItem("apiKey") != undefined ? navigate("/") : navigate("/login")
    }

    return (
        <div >
            <Input_usuario titulo={"Login"} logeado={logeado}></Input_usuario>
        </div>
    )
}

export default Login