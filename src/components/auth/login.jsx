import React, { useContext } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { MainContext } from "../../";
import { GoogleAuthProvider } from "firebase/auth";
const firebase = require("firebase/compat/app");

const Login = () => {
  const { auth } = useContext(MainContext);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };

  return (
    <Container>
      <Grid container alignItems={"center"} justifyContent={"center"} style={{ height: window.innerHeight - 50 }}>
        <Grid style={{ width: 400, background: "#f1f1f1" }} container alignItems={"center"} justifyContent={"center"}>
          <Box p={5}>
            <Button onClick={login} variant="outlined">
              Sign in with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
