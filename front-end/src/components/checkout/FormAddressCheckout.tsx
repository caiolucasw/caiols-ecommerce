import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Address } from "../../utils/types";
// @ts-ignore
import InputMask from "react-input-mask";

const requiredMessage = "Este campo é obrigatório";

const FormAddressCheckout = ({ address }: { address: Address }) => {
  const initialAddress = address;
  const getCep = async (cep: string) => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
      return { erro: true };
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialAddress}
        validationSchema={Yup.object().shape({
          person_name: Yup.string().required(requiredMessage).max(255),
          last_name: Yup.string().max(255),
          zip_code: Yup.string()
            .required(requiredMessage)
            .max(9, "Campo inválido")
            .min(9, "Campo inválido"),
          street: Yup.string().required(requiredMessage).max(255),
          number: Yup.string().required(requiredMessage).max(20),
          district: Yup.string().required(requiredMessage).max(255),
          state: Yup.string().required(requiredMessage).max(2),
          city: Yup.string().required(requiredMessage).max(255),
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
          setValues,
          setFieldError,
        }) => {
          const disableAddressFields =
            (errors.zip_code && touched.zip_code) || values.zip_code.length < 9
              ? true
              : false;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="name"
                    variant="outlined"
                    label="Nome"
                    value={values.person_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.person_name && errors.person_name}
                    error={touched.person_name && Boolean(errors.person_name)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="lastName"
                    variant="outlined"
                    label="Sobrenome"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.last_name && errors.last_name}
                    error={touched.last_name && Boolean(errors.last_name)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Grid
                    container
                    spacing={3}
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={6} display="flex" alignItems="center">
                      <InputMask
                        mask="99999-999"
                        name="zipCode"
                        value={values.zip_code}
                        onChange={async (e) => {
                          handleChange(e);
                          const cep = e.target.value
                            .trim()
                            .replace(/[^0-9]/g, "");
                          console.log(e.target.value);
                          if (cep.length === 8) {
                            const res = await getCep(cep);
                            if (res && !res.error) {
                              setValues({
                                ...values,
                                district: res.bairro || "",
                                zip_code: res.cep || "",
                                city: res.localidade || "",
                                street: res.logradouro || "",
                                state: res.uf || "",
                              });
                              setFieldError("zip_code", "");
                            } else {
                              setFieldError("zip_code", "Campo inválido");
                            }
                          }
                        }}
                        onBlur={handleBlur}
                      >
                        {(inputProps: any) => (
                          <TextField
                            variant="outlined"
                            label="CEP"
                            helperText={touched.zip_code && errors.zip_code}
                            error={touched.zip_code && Boolean(errors.zip_code)}
                            size="small"
                            fullWidth
                            {...inputProps}
                          />
                        )}
                      </InputMask>
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
                    disabled={disableAddressFields}
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
                    disabled={disableAddressFields}
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
                    disabled={disableAddressFields}
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
                    disabled={disableAddressFields}
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
                    disabled={disableAddressFields}
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
                    type="submit"
                    color="primary"
                    sx={{ minWidth: { xs: 200, sm: 300 }, fontWeight: 700 }}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default FormAddressCheckout;
