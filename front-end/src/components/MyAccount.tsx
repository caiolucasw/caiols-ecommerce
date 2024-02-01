import { Box, Grid, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const MyAccount = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <PersonIcon />
        <Typography variant="h5" fontWeight={700}>
          Minha Conta
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Nome" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Telefone celular" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="E-mail" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="CPF" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Data de Nascimento" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyAccount;
