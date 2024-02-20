import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import axiosApp from "../customAxios";
import { Formik } from "formik";
import { User } from "../utils/types";
import InputMask from "react-input-mask";

const AccountInfo = () => {
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
          cpf: user?.cpf || "",
          date_birth: user?.date_birth || "",
          phone: user?.phone || "",
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
                  name="phone"
                  variant="outlined"
                  label="Telefone celular"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  value={values.cpf}
                  disabled
                >
                  {(inputProps: any) => (
                    <TextField
                      label="CPF"
                      variant="outlined"
                      fullWidth
                      {...inputProps}
                      disabled
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12}>
                <InputMask
                  name="date_birth"
                  mask="99/99/9999"
                  value={values.date_birth}
                  disabled
                >
                  {(inputProps: any) => (
                    <TextField
                      label="Data de Nascimento"
                      variant="outlined"
                      fullWidth
                      {...inputProps}
                      disabled
                    />
                  )}
                </InputMask>
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

export default AccountInfo;
