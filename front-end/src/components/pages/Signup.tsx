import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { validateCpf } from "../../utils/validateCpf";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight="90vh"
      sx={{
        my: "5vh",
      }}
    >
      <Box pt={1} width={{ xs: 400 }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          mb={3}
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Typography fontWeight={600} variant="h4">
            Caio.
            <Typography
              variant="inherit"
              sx={{
                display: "inline-block",
                color: "#70e000 !important",
              }}
            >
              ls
            </Typography>
          </Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          p={3}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Cadastre-se
            </Typography>
          </Box>

          <Formik
            initialValues={{
              name: "",
              email: "",
              cpf: "",
              password: "",
              repeat_password: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Campo obrigatório"),
              email: Yup.string().test({
                name: "is-email-valid",
                message: "E-mail inválido",
                test: (value, ctx) => {
                  if (!value || (typeof value === "string" && !value.trim()))
                    return ctx.createError({ message: "Campo obrigatório" });

                  if (typeof value === "string") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(value)) return true;
                    else return ctx.createError({ message: "E-mail inválido" });
                  }

                  return true;
                },
              }),
              cpf: Yup.string().test({
                name: "is-cpf-valid",
                message: "CPF inválido",
                skipAbsent: true,
                test: (value, ctx) => {
                  if (
                    !value ||
                    (typeof value === "string" &&
                      !value.trim().replace(/[^0-9]/g, ""))
                  )
                    return ctx.createError({ message: "Campo obrigatório" });

                  if (typeof value === "string") return validateCpf(value);
                  return true;
                },
              }),
              password: Yup.string().required("Campo obrigatório"),
              repeat_password: Yup.string()
                .oneOf([Yup.ref("password")], "Senhas não são iguais")
                .required("Campo obrigatório"),
            })}
            onSubmit={(values) => console.log(values)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="name"
                      placeholder="Nome"
                      label="Nome *"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="email"
                      placeholder="E-mail"
                      label="E-mail *"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box>
                    <InputMask
                      name="cpf"
                      mask="999.999.999-99"
                      value={values.cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {(inputProps: any) => (
                        <TextField
                          {...inputProps}
                          variant="outlined"
                          placeholder="CPF"
                          label="CPF *"
                          size="small"
                          fullWidth
                          error={touched.cpf && Boolean(errors.cpf)}
                          helperText={touched.cpf && errors.cpf}
                        />
                      )}
                    </InputMask>
                  </Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      placeholder="Senha"
                      label="Senha *"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      type="password"
                      size="small"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      placeholder="Confirmar Senha"
                      label="Confirmar Senha *"
                      value={values.repeat_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="repeat_password"
                      size="small"
                      fullWidth
                      error={
                        touched.repeat_password &&
                        Boolean(errors.repeat_password)
                      }
                      helperText={
                        touched.repeat_password && errors.repeat_password
                      }
                    />
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ fontWeight: 700 }}
                    >
                      CADASTRAR
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
          <Box>
            <Typography variant="subtitle2" textAlign="center">
              Já é cliente?{" "}
              <Link component={RouteLink} to="/login" underline="none">
                Entrar
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
