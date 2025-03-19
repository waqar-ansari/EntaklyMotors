const { createSlice } = require("@reduxjs/toolkit");
const initialState = ["Free Cancellation", "Zero Deposit"]
  
const bookingOverviewSlice = createSlice({
  name: "bookingOverview",
  initialState,
  reducers: {
    setBookingOverview(state, action) {      
    return [...initialState, ...action.payload];
    },
    clearBookingOverview() {
        return { ...initialState }
    },
  },
});
export const { setBookingOverview, clearBookingOverview } = bookingOverviewSlice.actions;
export default bookingOverviewSlice.reducer  