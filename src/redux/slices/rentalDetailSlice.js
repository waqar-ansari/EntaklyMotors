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
    setPickupLocationSlice(state, action) {
      state.pickupLocation = action.payload;
    },
    setReturnLocationSlice(state, action) {
      state.returnLocation = action.payload;
    },
    setPickupDateSlice(state, action) {
      state.pickupDate = action.payload;
    },
    setReturnDateSlice(state, action) {
      state.returnDate = action.payload;
    },
    setPickupTimeSlice(state, action) {
      state.pickupTime = action.payload;
    },
    setReturnTimeSlice(state, action) {
      state.returnTime = action.payload;
    },
  },
});
export const {setPickupLocationSlice,setReturnLocationSlice,setPickupDateSlice,setReturnDateSlice,setPickupTimeSlice,setReturnTimeSlice} =rentalDetailSlice.actions
export default rentalDetailSlice.reducer