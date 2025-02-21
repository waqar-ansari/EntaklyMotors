"use client"
import { configureStore } from "@reduxjs/toolkit";
import selectedCarReducer from "./slices/selectedCarSlice";

const store = configureStore({
  reducer: {
    selectedCar: selectedCarReducer,
  },
});
export default store;
