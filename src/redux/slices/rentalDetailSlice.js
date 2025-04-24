const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  pickupLocation: "",
  returnLocation: "",
  pickupDate: "",
  returnDate: "",
  pickupTime: "",
  returnTime: "",
};
const rentalDetailSlice = createSlice({
  name: "rentalDetail",
  initialState: initialState,
  reducers: {
    setRentalDetailDataSlice(state,action){
        return { ...state, ...action.payload };
    },
    clearRentalDetail(){
      return initialState;
    }
  },
});
export const {
  setRentalDetailDataSlice,clearRentalDetail
} = rentalDetailSlice.actions;
export default rentalDetailSlice.reducer;