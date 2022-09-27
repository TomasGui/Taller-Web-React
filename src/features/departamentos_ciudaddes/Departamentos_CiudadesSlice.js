import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departamentos: [],
    ciudades: []
}


const Departamentos_CiudadesSlice = createSlice({
    name: "Monedas",
    initialState,
    reducers: {
        cargarDepartamentos: (state, action) => {
            state.departamentos = [...action.payload];
        },
        cargarCiudades: (state, action) => {
            state.ciudades = [...action.payload];
        }
    }
})

export const { cargarCiudades, cargarDepartamentos } = Departamentos_CiudadesSlice.actions;
export default Departamentos_CiudadesSlice.reducer; 