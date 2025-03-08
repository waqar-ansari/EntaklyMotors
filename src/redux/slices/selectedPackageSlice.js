import { createSlice } from "@reduxjs/toolkit";

const selectedPackageSlice = createSlice({
  name: "selectedPackage",
  // initialState: {
  //   selectedPackage: null,
  // },
  initialState: {
    packageName: null,
    packagePrice: null,
  },
  reducers:{
    setSelectedPackageSlice(state,action){
        // state.selectedPackage = action.payload;
        return{...state,...action.payload}
        // state.packageName = action.payload.packageName;
        // state.packagePrice = action.payload.packagePrice;
    },
    clearSelectedPackage(){
        return initialState
    }
  }
});

export const {setSelectedPackageSlice, clearSelectedPackage} = selectedPackageSlice.actions;
export default selectedPackageSlice.reducer;