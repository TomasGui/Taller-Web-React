import React, { useEffect, useState } from 'react'
import { Tab } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Tabla from '../tabla/Tabla';
import { useSelector } from 'react-redux';
import Cargando_pagina from '../cargando_pagina/Cargando_pagina';
import Aviso from '../aviso/Aviso';


const Lista = () => {

    const transacciones = useSelector((state) => state.Transacciones.transacciones)
    const [cargando, setCargando] = useState(false);

    const MonedasAll = useSelector((state) => state.Monedas);

    useEffect(() => {
        setCargando(transacciones.length > 0 ? true : false);
    }, [transacciones])
    if (transacciones.length == 0) {
        return (
            <div className='container my-4 text-center'>
                <h2 className='text-center my-4'><i className="bi bi-list-ul"></i>  Listado de transacciones</h2>
                <Aviso titulo={"Aviso !"} mensaje={"No hay transaciones realizadas"}></Aviso>
            </div>
        )
    } else {
        return (
            <div className='container my-4 text-center'>
                <h2 className='text-center my-4'><i className="bi bi-list-ul"></i>  Listado de transacciones</h2>
                {
                    cargando == true ?
                        <Table striped bordered >
                            <thead className='text-center'>
                                <tr>
                                    <th># id</th>
                                    <th>Moneda</th>
                                    <th>Tipo de operacion</th>
                                    <th>Cantidad de monedas</th>
                                    <th>Valor Cotizacion</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    transacciones.map(t => <Tabla key={t.id} {...t}></Tabla>)
                                }
                            </tbody>
                        </Table>
                        : <Cargando_pagina></Cargando_pagina>
                }
            </div>
        );
    }

}

export default Lista