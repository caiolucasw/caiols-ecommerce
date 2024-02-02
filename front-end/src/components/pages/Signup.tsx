import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";

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
          <Box>
            <TextField
              variant="outlined"
              size="small"
              value=""
              placeholder="Nome"
              label="Nome"
              fullWidth
            />
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
              placeholder="CPF"
              label="CPF"
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
            <TextField
              variant="outlined"
              value=""
              size="small"
              placeholder="Confirmar Senha"
              label="Confirmar Senha"
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
              CADASTRAR
            </Button>
          </Box>
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
