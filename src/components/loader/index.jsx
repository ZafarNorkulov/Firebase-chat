import { Container, Grid } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Container>
      <Grid container alignItems={"center"} justifyContent={"center"} style={{ height: window.innerHeight - 50 }}>
        <Grid container alignItems={"center"} justifyContent={"center"}>
          Loading...
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;
