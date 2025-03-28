import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  image:"",
  price:0
};
const selectedCarSlice = createSlice({
  name: "selectedCar",
  initialState,
  reducers: {
    setSelectedCar(state, action) {      
      return { ...state, ...action.payload };
    },
    clearSelectedCar() {
      return initialState;
    },
  },
});
export const { setSelectedCar, clearSelectedCar } = selectedCarSlice.actions;
export default selectedCarSlice.reducer;
