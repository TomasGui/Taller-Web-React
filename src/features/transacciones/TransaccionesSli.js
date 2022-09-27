import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transacciones: [],
}



const TransaccionesSli = createSlice({
    name: "Transacciones",
    initialState,
    reducers: {
        cargarTransacciones: (state, action) => {
            state.transacciones = [...action.payload];
        },
        agregarTransaccion: (state, action) => {
            state.transacciones.push(action.payload);
        }
    }
})

export const { cargarTransacciones, agregarTransaccion } = TransaccionesSli.actions;
export default TransaccionesSli.reducer;