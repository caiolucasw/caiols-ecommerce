import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const FormAddressCheckout = () => {
  const getCep = async (cep: string) => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          zipCode: "",
          street: "",
          number: "",
          district: "",
          state: "",
          city: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255),
          lastNAme: Yup.string().max(255),
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Nome"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  label="Sobrenome"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName && errors.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <Grid container spacing={3} display="flex" alignItems="center">
                  <Grid item xs={6} display="flex" alignItems="center">
                    <TextField
                      name="zipCode"
                      variant="outlined"
                      label="CEP"
                      value={values.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.zipCode && errors.zipCode}
                      error={touched.zipCode && Boolean(errors.zipCode)}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      component={Link}
                      href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                      target="_blank"
                    >
                      Não sei o meu CEP
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="street"
                  variant="outlined"
                  label="Rua"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.street && errors.street}
                  error={touched.street && Boolean(errors.street)}
                  fullWidth
                  size="small"
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <TextField
                  name="number"
                  variant="outlined"
                  label="Número"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.number && errors.number}
                  error={touched.number && Boolean(errors.number)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="district"
                  variant="outlined"
                  label="Bairro"
                  value={values.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.district && errors.district}
                  error={touched.district && Boolean(errors.district)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="state"
                  variant="outlined"
                  label="Estado"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.state && errors.state}
                  error={touched.state && Boolean(errors.state)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="city"
                  variant="outlined"
                  label="Cidade"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.city && errors.city}
                  error={touched.city && Boolean(errors.city)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: { xs: 200, sm: 300 }, fontWeight: 700 }}
                >
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

export default FormAddressCheckout;
