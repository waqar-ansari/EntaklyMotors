"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>
}


// "use client";

// import { Provider } from "react-redux";
// import store, { persistor } from "./store";
// import { PersistGate } from "redux-persist/integration/react";

// export default function ReduxProvider({ children }) {
//   return (
//     <Provider store={store}>
//       {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
//         {children}
//       {/* </PersistGate> */}
//     </Provider>
//   );
// }
