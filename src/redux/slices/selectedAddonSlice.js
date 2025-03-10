// const { createSlice } = require("@reduxjs/toolkit");

// const selectedAddonSlice = createSlice({
//   name: "selectedAddon",
//   initialState: [],
//   reducers: {
//     setSelectedAddon(state, action) {
//       return (state = action.payload);
//     },
//   },
// });
// export const {setSelectedAddon} = selectedAddonSlice.actions;
// export default selectedAddonSlice.reducer
const { createSlice } = require("@reduxjs/toolkit");

const selectedAddonSlice = createSlice({
  name: "selectedAddon",
  initialState: [],
  reducers: {
    setSelectedAddon(state, action) {
      // Add each selected addon to the state
      return action.payload; // Directly assign the addon details array to the state
    },
    clearSelectedAddons() {
      return []; // Clears all selected addons
    },
  },
});

export const { setSelectedAddon, clearSelectedAddons } = selectedAddonSlice.actions;
export default selectedAddonSlice.reducer;

