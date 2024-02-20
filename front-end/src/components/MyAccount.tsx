import React from "react";
import AccountInfo from "./AccountInfo";
import { Box, Grid } from "@mui/material";
import Addresses from "./Addresses";

const MyAccount = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AccountInfo />
      </Grid>
      <Grid item xs={12}>
        <Addresses />
      </Grid>
    </Grid>
  );
};

export default MyAccount;
