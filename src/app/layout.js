// import "../styles/globals.css";
// import ReduxProvider from "../redux/ReduxProvider";

// export default function RootLayout({ children }) {
//   return <ReduxProvider>{children}</ReduxProvider>;
// }

import "../styles/globals.css";
import ReduxProvider from "../redux/ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional meta tags, title, etc. here */}
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
