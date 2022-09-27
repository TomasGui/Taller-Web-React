import React, { useState, useRef, useEffect } from 'react'
import Combo_ciudad from './Combo_ciudad';
import { departamentosApi } from '../../services/Services.js'
import { useSelector } from 'react-redux';



const Combo_departamento_ciudad = ({ handleInputChange }) => {

    const departamentos = useSelector((state) => state.Departamentos_Ciudades.departamentos)
    /* const [departamentos, setDepartamentos] = useState([]); */
    const departamentoSeleccionado = useRef(null);
    const [seleccion, setSeleccion] = useState(false);

    /* useEffect(() => {
        const datosDepartamentos = async () => {
            try {
                const respDeptos = await departamentosApi();
                setDepartamentos(respDeptos.departamentos);
            } catch (error) {
                alert(error)
            }
        }
        datosDepartamentos();
    }, []); */

    // Combo Ciudades por Departamento 
    const seleccionDepartamento = (event) => {
        let idDepartamento = departamentoSeleccionado.current.value;
        console.log(idDepartamento);
        idDepartamento > 0 ? setSeleccion(true) : setSeleccion(false);
        handleInputChange(event);
    }

    return (
        <div>
            <label htmlFor="departamento">Departamento : </label>
            <select className="form-select my-3" name="id_departamento" id="departamento" onChange={seleccionDepartamento} ref={departamentoSeleccionado} >
                <option defaultValue="0" >-- Selecciona una Departamento --</option>
                {departamentos.map((d) => (
                    <option key={d.id} value={d.id}> {d.nombre}</option>
                ))};
            </select>
            {seleccion == false ? <br /> : <Combo_ciudad id_departamento={departamentoSeleccionado.current.value} handleInputChange={handleInputChange}></Combo_ciudad>}
        </div>

    )
}

export default Combo_departamento_ciudad





