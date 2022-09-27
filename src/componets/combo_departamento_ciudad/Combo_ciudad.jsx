import React from 'react'
import { useEffect, useState } from 'react';
import { ciudadesApi } from '../../services/Services.js'
import { useSelector } from 'react-redux';



const Combo_ciudad = ({ id_departamento, handleInputChange }) => {
    const [ciudades, setCiudades] = useState([]);
    const todas_ciudades = useSelector((state) => state.Departamentos_Ciudades.ciudades);

    useEffect(() => {
        setCiudades(todas_ciudades.filter(c => c.id_departamento == id_departamento))
    }, [id_departamento]);

    const seleccionCiudad = (e) => {
        handleInputChange(e);
    }
    return (
        <div>
            <label htmlFor="ciudades">Ciudad : </label>
            <select className="form-select my-3" name="id_ciudad" id="ciudades" onChange={seleccionCiudad}>
                <option value="0">-- Selecciona una Ciudad --</option>
                {
                    ciudades.map((c) => (
                        <option key={c.id} value={c.id}> {c.nombre} </option>
                    ))
                }
            </select >
        </div>

    )
}

export default Combo_ciudad