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




import "../styles/globals.css";        // Global styles
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap styles
import BootstrapJs from "@/components/BootstrapJs"; // Bootstrap JS
import ReduxProvider from "../redux/ReduxProvider"; // Redux provider

export default function Layout({ children }) {
  return (
    <html> {/* Default to 'en' for all pages */}
      <head>
        {/* You can add additional meta tags, title, etc. here */}
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
