// import "../styles/globals.css";
// import ReduxProvider from "../redux/ReduxProvider";

// export default function RootLayout({ children }) {
//   return <ReduxProvider>{children}</ReduxProvider>;
// }

// import "../styles/globals.css";
// import ReduxProvider from "../redux/ReduxProvider";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* You can add additional meta tags, title, etc. here */}
//       </head>
//       <body>
//         <ReduxProvider>{children}</ReduxProvider>
//       </body>
//     </html>
//   );
// }


"use client"
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapJs from "@/components/BootstrapJs";
import ReduxProvider from "../redux/ReduxProvider";
import { LanguageProvider } from "@/context/LanguageProvider";


export default function Layout({ children }) {
  return (
    <html>
      <head>
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css"
          /> */}
          <meta 
          httpEquiv="Content-Security-Policy" 
          content={`
            frame-src 'self' https://www.google.com https://www.gstatic.com;
            script-src 'self' https://www.google.com https://www.gstatic.com 'unsafe-inline' 'unsafe-eval';
            connect-src 'self' https://www.google.com https://identitytoolkit.googleapis.com;
          `}
        />
      </head>
      <body>
        <ReduxProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        </ReduxProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
