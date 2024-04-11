// @ts-ignore
import InputMask from "react-input-mask";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { validateCpf } from "../../utils/validateCpf";
import { getCartItemLS } from "../../utils/usefulMethods";
import axiosApp from "../../customAxios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setUser, updateCartCount } from "../../app/userSlice";

interface SignupValues {
  name: string;
  email: string;
  cpf: string;
  password: string;
  repeat_password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const fromCartBuy = !!location?.state?.cartBuy;

  const handleSignup = async (values: SignupValues) => {
    try {
      setLoading(true);
      const res = await axiosApp.post("/register", values);

      if (res && res.status === 201) {
        if (!fromCartBuy) addCartItemsFromLSIfNecessary();
        dispatch(setUser(res.data));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // add cart items if the user has some products in localStorage
  const addCartItemsFromLSIfNecessary = async () => {
    // check if I need to add
    const productItems = getCartItemLS();
    if (productItems.length <= 0) return;

    setLoading(true);
    try {
      const res = await axiosApp.post("/cart/products/cart-not-logged", {
        products: productItems,
      });
      if (res && res.status === 200) {
        localStorage.removeItem("cart_items");
        if (res?.data?.cart_items_count) {
          dispatch(updateCartCount(res.data.cart_items_count));
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fromCartBuy;
    if (token && !fromCartBuy) {
      navigate("/");
    } else if (token && fromCartBuy) {
      // pass state to identify if it needs to add cart_items when the login is complete
      navigate("/checkout", { state: { cartBuy: location?.state?.cartBuy } });
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
            onSubmit={(values) => handleSignup(values)}
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
                      disabled={loading}
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
