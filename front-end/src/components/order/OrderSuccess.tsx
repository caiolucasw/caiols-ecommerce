import { Alert, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="end" p={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Continuar comprando
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Alert variant="filled" severity="success">
          Sua compra foi efetuada com sucesso!!
        </Alert>
      </Box>
    </Container>
  );
};

export default OrderSuccess;
