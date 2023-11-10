import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";
const Header = () => {
  const user = false;
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <img src={Logo} style={{ maxWidth: 120 }} alt="" />
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <Button color="inherit">Quit</Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button color="inherit">Login</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
