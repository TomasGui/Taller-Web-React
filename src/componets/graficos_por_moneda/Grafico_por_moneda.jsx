import React from 'react'
import { useSelector } from 'react-redux'
import Grafica from '../grafica/Grafica'
import Combo_moneda from '../combo_moneda/Combo_moneda'
import { useState } from 'react'
import Aviso from '../aviso/Aviso'


const Grafico_por_moneda = () => {

    const monedas_todas = useSelector((state) => state.Monedas);
    const transacciones_todas = useSelector((state) => state.Transacciones.transacciones)
    const [id_MonedaActual, setId_MonedaActual] = useState(0);

    const optener_moneda = (idMoneda) => {
        console.log(idMoneda);
        setId_MonedaActual(idMoneda);
    }

    const array_grafico_monedas = (id_moneda = 0, transacciones) => {

        if (transacciones.length > 0 && id_moneda > 0) {
            return transacciones.filter(t => t.moneda == id_moneda).map(tm => { return tm.valor_actual })
        }
        return [];
    }

    const categoria_grafico_monedas = (transacciones) => {
        if (transacciones.length > 0) {
            return transacciones.map(tm => { return tm.id })
        }
        return [];
    }



    return (
        <div className='container'>
            <h2 className='text-center my-4'><i className="bi bi-coin"></i>  Grafico de cotizacion de una moneda </h2>
            <Combo_moneda optener_moneda={optener_moneda}></Combo_moneda>
            {
                id_MonedaActual == 0 || array_grafico_monedas(id_MonedaActual, transacciones_todas).length == 0 ? <Aviso titulo={"Aviso!"} mensaje={"No hay transacciones para la moneda seleccionada"}></Aviso> : <Grafica datos={array_grafico_monedas(id_MonedaActual, transacciones_todas)} categorias={categoria_grafico_monedas(transacciones_todas)} tipo={"line"}></Grafica>
            }

        </div>


    )
}

export default Grafico_por_moneda