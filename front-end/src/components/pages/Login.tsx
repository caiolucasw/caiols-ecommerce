import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "../../app/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res && res.status === 200) {
        dispatch(setUser(res.data));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
          my={2}
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
                color: "var(--primary-color)",
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
              Login
            </Typography>
          </Box>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
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
              password: Yup.string()
                .min(6, "Senha inválida")
                .required("Campo obrigatório"),
            })}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={3}>
                  {error && (
                    <Box>
                      <Alert variant="standard" color="error">
                        <Typography variant="body2" fontWeight={700}>
                          Email ou senha incorretos!
                        </Typography>
                      </Alert>
                    </Box>
                  )}
                  <Box>
                    <TextField
                      name="email"
                      variant="outlined"
                      size="small"
                      placeholder="E-mail"
                      label="E-mail"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="password"
                      type="password"
                      variant="outlined"
                      size="small"
                      placeholder="Senha"
                      label="Senha"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      sx={{ fontWeight: 700 }}
                      disabled={loading}
                    >
                      ENTRAR
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>

          <Box>
            <Typography variant="subtitle2" textAlign="center">
              Cliente novo?{" "}
              <Link component={RouteLink} to="/register" underline="none">
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
