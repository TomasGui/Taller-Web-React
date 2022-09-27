import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';


const Monto_final = () => {

    const transacciones = useSelector((state) => state.Transacciones.transacciones);
    const [monto, setMonto] = useState(0);
    const [montoCompra, setMontoCompra] = useState(0);
    const [montoVenta, setMontoVenta] = useState(0);



    useEffect(() => {
        const monto_total = (transacciones) => {
            if (transacciones.length > 0) {
                const reducer = (acumulador, valorActual) => acumulador + valorActual;
                const todas_transacciones = [...transacciones];
                const trans_compras = todas_transacciones.filter(t => t.tipo_operacion == 1).map(i => { return i.cantidad * i.valor_actual });
                const trans_ventas = todas_transacciones.filter(t => t.tipo_operacion == 2).map(i => { return i.cantidad * i.valor_actual });;
                const monto_compras = trans_compras.reduce(reducer, 0);
                const monto_ventas = trans_ventas.reduce(reducer, 0);
                setMontoCompra(monto_compras);
                setMontoVenta(monto_ventas);
                return monto_compras - monto_ventas;
            }
            return 0;
        }
        console.log(transacciones);
        setMonto(monto_total(transacciones))
    }, [transacciones])

    return (
        <Carousel variant="light">
            <Carousel.Item interval={1300}>
                <img
                    className="d-block w-100 h-100"
                    src="https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg"
                    alt="Monto total invertido"
                />
                <Carousel.Caption className="fondo_blanco centro">
                    <h2 className='m-5'>Monto final de inversion</h2>
                    <p className="p-3"><i className="bi bi-cash-coin"></i> $ {monto}</p>
                </Carousel.Caption>
            </Carousel.Item >
            <Carousel.Item interval={1300}>
                <img
                    className="d-block w-100 h-100"
                    src="https://cdn.pixabay.com/photo/2018/11/15/22/52/ethereum-3818348_1280.jpg"
                    alt="Monto total Comprado"
                />
                <Carousel.Caption className="fondo_blanco centro">
                    <h2 className='m-5'>Monto total comprado</h2>
                    <p className="p-3"><i className="bi bi-cash-coin"></i> $ {montoCompra}</p>
                </Carousel.Caption>
            </Carousel.Item >
            <Carousel.Item interval={1300}>
                <img
                    className="d-block w-100 h-100"
                    src="https://cdn.pixabay.com/photo/2018/12/22/22/19/bitcoin-3890350_1280.jpg"
                    alt="Monto total Vendido"
                />
                <Carousel.Caption className="fondo_blanco centro ">
                    <h2 className='m-5'>Monto total vendido</h2>
                    <p className="p-3 "><i className="bi bi-cash-coin"></i> $ {montoVenta}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    )


}







export default Monto_final