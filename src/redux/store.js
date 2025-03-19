"use client";
import { configureStore } from "@reduxjs/toolkit";
import selectedCarReducer from "./slices/selectedCarSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import rentalDetailReducer from "./slices/rentalDetailSlice";
import selectedPackageReducer from "./slices/selectedPackageSlice";
import selectedAddonReducer from "./slices/selectedAddonSlice";
import totalPriceReducer from "./slices/totalPriceSlice";
import bookingOverviewReducer from "./slices/bookingOverviewSlice";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["selectedCar", "auth", "rentalDetail","selectedPackage","selectedAddon","totalPrice","profile","bookingOverview"], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
  selectedCar: selectedCarReducer,
  auth: authReducer,
  profile: profileReducer,
  rentalDetail: rentalDetailReducer,
  selectedPackage:selectedPackageReducer,
  selectedAddon:selectedAddonReducer,
  totalPrice:totalPriceReducer,
  bookingOverview:bookingOverviewReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store); // Create a persistor

export { store, persistor };
