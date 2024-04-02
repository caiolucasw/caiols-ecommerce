import { Box, Typography } from "@mui/material";
import { BrandInterface } from "../../utils/types";
const BrandItem = ({ brand }: { brand: BrandInterface }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <img
            src={brand.image_url}
            alt={`Logo da marca ${brand.name}`}
            width={150}
            height={150}
            style={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}
          />
        </Box>
        <Box p={2}>
          <Typography variant="subtitle1" fontWeight={700}>
            {brand.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BrandItem;
