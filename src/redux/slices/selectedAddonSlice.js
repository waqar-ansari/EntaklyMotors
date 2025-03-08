const { createSlice } = require("@reduxjs/toolkit");

const selectedAddonSlice = createSlice({
  name: "selectedAddon",
  initialState: [],
  reducers: {
    setSelectedAddon(state, action) {
      return (state = action.payload);
    },
  },
});
export const {setSelectedAddon} = selectedAddonSlice.actions;
export default selectedAddonSlice.reducer