import React from 'react'
import Chart from "react-apexcharts";

const Grafica = ({ datos, categorias, nombreSeries = "", tipo = "bar" }) => {
    const state = {
        options: {
            chart: {
                id: "apexchart-example",
            },
            xaxis: {
                categories: categorias,
            },
        },
        series: [
            {
                name: "series-1",
                data: datos,
            },
        ],
    };


    return (
        <div className='container my-5'>
            <Chart
                options={state.options}
                series={state.series}
                type={tipo}
                width={600}
                height={500}
            />
        </div>

    )
}

export default Grafica;