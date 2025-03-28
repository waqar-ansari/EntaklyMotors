const { createSlice } = require("@reduxjs/toolkit");

const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState: 0,
  reducers: {
    setTotalPrice: (state, action) => {
      
      return action.payload;
    },
    resetTotalPrice: () => {
      return initialState;
    },
  },
});
export const {setTotalPrice,resetTotalPrice} = totalPriceSlice.actions;
export default totalPriceSlice.reducer;
