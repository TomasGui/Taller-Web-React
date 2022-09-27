import { configureStore } from "@reduxjs/toolkit";
import reducerMonedas from "./features/monedasSlice/MonedasSli.js"
import reducerTransacciones from "./features/transacciones/TransaccionesSli.js"
import reducerDepartamentos_Ciudades from "./features/departamentos_ciudaddes/Departamentos_CiudadesSlice.js"


export const store = configureStore({
    reducer: {
        Monedas: reducerMonedas,
        Transacciones: reducerTransacciones,
        Departamentos_Ciudades: reducerDepartamentos_Ciudades
    },
});