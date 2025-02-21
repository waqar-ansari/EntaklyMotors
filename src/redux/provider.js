"use client";  // This marks the provider as client-side

import { Provider } from "react-redux";
import store from "./store";  // Import your Redux store

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}