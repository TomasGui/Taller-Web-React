import { createSlice } from "@reduxjs/toolkit";

const MonedasSlice = createSlice({
    name: "Monedas",
    initialState: [],
    reducers: {
        cargarMonedas: (state, action) => {
            return [...action.payload]
        }
    }
})

export const { cargarMonedas } = MonedasSlice.actions;
export default MonedasSlice.reducer; 