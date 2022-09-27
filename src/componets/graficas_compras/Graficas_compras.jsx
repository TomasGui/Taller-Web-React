import React from 'react'
import Grafica from '../grafica/Grafica'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Aviso from '../aviso/Aviso';

const Graficas_compras = () => {

    const monedas_todas = useSelector((state) => state.Monedas);
    const transacciones_todas = useSelector((state) => state.Transacciones.transacciones);
    const [monto_monedas, setMonto_monedas] = useState([]);
    const [nombreMonedas, setNombreMonedas] = useState([]);

    useEffect(() => {
        const array_grafico_compras = (p_monedas, transacciones) => {
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
                const trans_compras = todas_transacciones.filter(t => t.tipo_operacion == 1);
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

        setMonto_monedas(array_grafico_compras(monedas_todas, transacciones_todas));
        setNombreMonedas(nombre_monedas(monedas_todas));

    }, [transacciones_todas])

    if (transacciones_todas.filter(t => t.tipo_operacion == 1).length == 0) {
        return (
            <div className='container my-4 text-center'>
                <h2 className='text-center my-4'> Grafico de compras</h2>
                <Aviso titulo={"Aviso !"} mensaje={"No hay transaciones de compra"}></Aviso>
            </div>
        );
    }
    return (
        <div className='container text-center'>
            <h2 className='text-center my-4'> Grafico de compras</h2>
            {
                <Grafica datos={monto_monedas} categorias={nombreMonedas} ></Grafica>
            }
        </div>
    )
}

export default Graficas_compras