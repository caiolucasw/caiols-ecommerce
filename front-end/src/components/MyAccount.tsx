import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import axiosApp from "../customAxios";
import { Formik } from "formik";
import { User } from "../utils/types";

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);

  const getUserInfo = async () => {
    try {
      const res = await axiosApp.get("/user-details");
      if (res && res.data) {
        setUser(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <PersonIcon />
        <Typography variant="h5" fontWeight={700}>
          Minha Conta
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Nome"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Telefone celular"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  label="E-mail"
                  value={values.email}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="CPF" disabled fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Data de Nascimento"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="end">
                <Button variant="contained" color="primary">
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MyAccount;
