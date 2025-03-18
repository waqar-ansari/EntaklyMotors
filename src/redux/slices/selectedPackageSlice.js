import { createSlice } from "@reduxjs/toolkit";

const selectedPackageSlice = createSlice({
  name: "selectedPackage",
  initialState: {
    packageName: "Basic Protection",
    packagePrice: 0,
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
