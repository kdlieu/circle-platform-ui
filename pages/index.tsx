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
      <Grid container>
        <Grid item xs={6}>
          <Typography>Next Generation Business Payments</Typography>
        </Grid>
        <Grid item xs={6}>
          <Image src="/payments.svg" height={500} width={500}></Image>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
