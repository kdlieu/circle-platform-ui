import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Box>
      <Grid container spacing={2}  alignItems="center" >
        <Grid item xs={6} spacing={2}   alignItems="center" >
          <Typography variant="h3">
            New Generation of Business Payments
          </Typography>
          <Typography variant="h6">
            Powered entirely by Circle and USDC
          </Typography>
          <Typography variant="subtitle1">
            Powered entirely by Circle and USDC
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={2}  >
          <Image src="/payments.svg" height={500} width={500}></Image>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
