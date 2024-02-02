import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";

const Login = () => {
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
              Login
            </Typography>
          </Box>
          <Box>
            <TextField
              variant="outlined"
              size="small"
              value=""
              placeholder="E-mail"
              label="E-mail"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              value=""
              size="small"
              placeholder="Senha"
              label="Senha"
              fullWidth
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ fontWeight: 700 }}
            >
              ENTRAR
            </Button>
          </Box>
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
