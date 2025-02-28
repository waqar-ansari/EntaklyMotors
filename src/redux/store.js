"use client"
import { configureStore } from "@reduxjs/toolkit";
import selectedCarReducer from "./slices/selectedCarSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/ProfileSlice";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  selectedCar: persistReducer(persistConfig, selectedCarReducer),
  auth: persistReducer(persistConfig, authReducer), // i dont know why but we can also write authReducer inplace of authSlice and import like above
  profile: profileReducer,
});
const store = configureStore({
  reducer:rootReducer
});
export const persistor = persistStore(store);
export default store;