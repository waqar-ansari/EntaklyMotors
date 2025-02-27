const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  },
  reducers: {
    setProfile(state, action) {
      return { ...state, ...action.payload };
    },
    clearProfile() {
      return initialState;
    },
  },
});
export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;