import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Aviso from '../aviso/Aviso';
import Grafica from '../grafica/Grafica'

const Grafico_ventas = () => {

    const monedas_todas = useSelector((state) => state.Monedas);
    const transacciones_todas = useSelector((state) => state.Transacciones.transacciones)
    const [monto_monedas, setMonto_monedas] = useState([]);
    const [nombreMonedas, setNombreMonedas] = useState([]);
    const [aviso, setAviso] = useState(false);

    useEffect(() => {
        const array_grafico_ventas = (p_monedas, transacciones) => {
            console.log(transacciones);
            if (p_monedas.length > 0 && transacciones.length > 0) {
                const monedas = [...p_monedas];
                const reducer = (acumulador, valorActual) => acumulador + valorActual;
                const callBack = (transaccion, idMoneda) => {
                    if (transaccion.moneda == idMoneda) {
                        return transaccion.cantidad * transaccion.valor_actual
                    }
                    return 0;
                }
                const todas_transacciones = [...transacciones];
                const trans_compras = todas_transacciones.filter(t => t.tipo_operacion == 2);
                const monto_x_moneda = monedas.map(m => trans_compras.map(t => callBack(t, m.id)).reduce(reducer, 0))
                return monto_x_moneda;
            }
            return [];
        }

        const nombre_monedas = (p_monedas) => {
            if (p_monedas.length > 0) {
                return p_monedas.map(m => m.nombre)
            }
            return [];
        }
        setMonto_monedas(array_grafico_ventas(monedas_todas, transacciones_todas));
        setNombreMonedas(nombre_monedas(monedas_todas));

    }, [transacciones_todas])

    if (transacciones_todas.filter(t => t.tipo_operacion == 2).length == 0) {
        return (
            <div className='container my-4 text-center'>
                <h2 className='text-center my-4'> Grafico de ventas</h2>
                <Aviso titulo={"Aviso !"} mensaje={"No hay transaciones de venta"}></Aviso>
            </div>
        );
    } else {
        return (
            <div className='container'>
                <h2 className='text-center my-4'> Grafico de ventas</h2>
                {
                    <Grafica datos={monto_monedas} categorias={nombreMonedas} ></Grafica>
                }

            </div>
        )
    }


}

export default Grafico_ventas