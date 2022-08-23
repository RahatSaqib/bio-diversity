import Head from "next/head";
import Image from "next/image";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Container,
  useMediaQuery,
  Grid,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import styles from "../styles/Home.module.css";
import Header from "./components/Home/Header";
import Counters from "./components/Home/counters";
import CuroselCard from "./components/Home/curoselCard";
import CollapseCard from "./components/Home/collapseCard";
import Footer from "./components/Home/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.body}>
      {/* <Head>
        <title>Hello from BIO-DIVERSITY</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Header index={0}/>
      <div className={styles.main}>
        <Box
          component="section"
          className={styles.main_box}
          sx={{ mt: 5 }}
        >
          <Grid container item xs={12} md={12}  sx={{ mx: "auto" }}>
            <Grid
              item
              xs={12}
              md={9}
              style={{ borderRadius: "20px", paddingRight: "10px" }}
            >
              <Typography gutterBottom variant="h1" component="div">
                What is BIO Diversity
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                BIO-D is a global algal database of taxonomic, nomenclatural and
                distributional information.
              </Typography>
              

              <CuroselCard />
              <Counters />

              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              // lg={12}
              style={{ paddingLeft: "20px" , paddingRight: "20px"  }}
              className={styles.side_bar}
            >
              <Typography gutterBottom variant="h2" component="div">
                Latest Additions
              </Typography>
              <CollapseCard />
              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
          </Grid>
        </Box>
      </div>

      <footer className={styles.footer}>
    
        <Footer/>
      </footer>
    </div>
  );
}
