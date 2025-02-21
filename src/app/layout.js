import "../styles/globals.css";
import ReduxProvider from "../redux/provider";

export default function RootLayout({ children }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
