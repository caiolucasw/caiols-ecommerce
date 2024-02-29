import { Box, Typography } from "@mui/material";

interface TotalCartProps {
  // loading: boolean;
  total: number;
}

const TotalCart = ({ total }: TotalCartProps) => {
  return (
    <Box display="flex" justifyContent="end" alignItems="center">
      <Box display="flex" gap={3} alignItems="center">
        <Typography variant="h6" fontWeight={500}>
          Total:
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {"R$ "}
          {total.toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default TotalCart;
