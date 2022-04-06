import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainNav from "../components/layout/MainNav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
  return (
    <ThemeProvider theme={theme}>
      <MainNav mainPage={<Component {...pageProps} />} />
    </ThemeProvider>
  );
}

export default MyApp;
