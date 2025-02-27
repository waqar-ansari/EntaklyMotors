// "use client";  // This marks the provider as client-side

// import { Provider } from "react-redux";
// import store from "./store";  // Import your Redux store

// export default function ReduxProvider({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }


"use client";

import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
