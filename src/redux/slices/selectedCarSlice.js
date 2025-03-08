import { createSlice } from "@reduxjs/toolkit";
// const TRANSMISSION_TYPES = {
//   AUTOMATIC: "Automatic",
//   MANUAL: "Manual",
// };
// const FUEL_TYPES = {
//   PETROL: "Petrol",
//   DIESEL: "Diesel",
//   ELECTRIC: "Electric",
//   GASOLINE: "Gasoline",
// };
// const VEHICLE_TYPES = {
//   SUV: "Suv",
//   HATCHBACK: "Hatchback",
//   SEDAN: "Sedan",
//   COUPE: "Coupe",
//   SPORTS_CAR: "Sports Car",
//   CROSSOVER: "Crossover",
//   MINIVAN: "Minivan",
//   PICKUP_TRUCK: "Pickup Truck",
// };
const initialState = {
  id: null,
  name: "",
  // tag: "",
  // transmission: null,
  images:"",
  // numberOfSeaters: 0,
  pricePerDay: 0,
  // mileage: 0,
  // minDriverAge: 18,
  // vehicleType: "",
  // fuelType: null,
  // features: [],
  // numberOfBags: 0,
  // numberOfDoors: 0,
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
