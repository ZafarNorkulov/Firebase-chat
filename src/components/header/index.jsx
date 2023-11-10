import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";
import { MainContext } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  const { auth } = useContext(MainContext);
  const [user] = useAuthState(auth);
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <img src={Logo} style={{ maxWidth: 120 }} alt="" />
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <Button onClick={() => auth.signOut()} color="inherit">
              Quit
              test
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button onClick={() => auth.signIn()} color="inherit">
                Login
              </Button>
              test
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
