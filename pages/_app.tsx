import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainNav from "../components/layout/MainNav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { CssBaseline } from "@mui/material";
import { AuthProvider, ProtectRoute } from "../context/auth-context";
import {ProtectedRoute} from "../components/ProtectedRoute";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#64b5f6',
//     },
//     background: {
//       default: '#e3f2fd',
//     },
//   },
// });
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader =
    router.pathname === "/pay/[id]" ||
    router.pathname === "/pay/confirmation/[id]"
      ? false
      : true;


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {showHeader ? <MainNav mainPage={<Component {...pageProps} />} /> : <Component {...pageProps} />} */}
        {/* <ProtectedRoute router={router}> */}
          <MainNav
            router={router}
            showHeader={showHeader}
            mainPage={<Component {...pageProps} />}
          />
        {/* </ProtectedRoute> */}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
