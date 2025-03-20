const { createSlice } = require("@reduxjs/toolkit");
// const initialState = ["Free Cancellation", "Zero Deposit"]
const initialState = {
  base: ["Free Cancellation", "Zero Deposit"],
  packageBookingOverview: [],
  carBookingOverview: [],
  addonBookingOverview: [],
};

const bookingOverviewSlice = createSlice({
  name: "bookingOverview",
  initialState,
  reducers: {
    setCarBookingOverview(state, action) {
      state.carBookingOverview = action.payload;
    },
    setPackageBookingOverview(state, action) {
      state.packageBookingOverview = action.payload;
    },
    setAddonBookingOverview(state, action) {
      state.addonBookingOverview = action.payload;
    },

    clearBookingOverview(state) {
      state.base = [...initialState.base];
      state.packageBookingOverview = [];
      state.carBookingOverview = [];
      state.addonBookingOverview = [];
    },
  },
});
// this is the selector function
export const selectBookingOverview = (state) =>
  [
  ...state.bookingOverview.base,
  ...state.bookingOverview.carBookingOverview,
  ...state.bookingOverview.packageBookingOverview,
  ...state.bookingOverview.addonBookingOverview,
]

export const {
  setCarBookingOverview,
  clearBookingOverview,
  setPackageBookingOverview,
  setAddonBookingOverview,
} = bookingOverviewSlice.actions;
export default bookingOverviewSlice.reducer;
