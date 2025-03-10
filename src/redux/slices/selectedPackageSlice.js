import { createSlice } from "@reduxjs/toolkit";

const selectedPackageSlice = createSlice({
  name: "selectedPackage",
  initialState: {
    packageName: null,
    packagePrice: null,
  },
  reducers: {
    setSelectedPackageSlice(state, action) {
      return {
        packageName: action.payload.packageName,
        packagePrice: action.payload.packagePrice,
      };
    },
    clearSelectedPackage() {
      return initialState;
    },
  },
});

export const { setSelectedPackageSlice, clearSelectedPackage } =
  selectedPackageSlice.actions;
export default selectedPackageSlice.reducer;
