import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainNav from "../components/layout/MainNav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";

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
    mode: 'dark',
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === '/pay/[id]' ? false : true;

  console.log(router);
  return (
    <ThemeProvider theme={theme}>
      {showHeader ? <MainNav mainPage={<Component {...pageProps} />} /> : <Component {...pageProps} />}

    </ThemeProvider>
  );
}

export default MyApp;
