"use client"
import { configureStore } from "@reduxjs/toolkit";
import selectedCarReducer from "./slices/selectedCarSlice";
import authReducer from "./slices/authSlice";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  selectedCar: persistReducer(persistConfig, selectedCarReducer),
  auth: persistReducer(persistConfig, authReducer),
});
const store = configureStore({
  reducer:rootReducer
});
export const persistor = persistStore(store);
export default store;