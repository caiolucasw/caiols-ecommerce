import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductInterface } from "../utils/types";
import { addEllipseToString } from "../utils/formatString";

interface ProductItemInterface {
  product: ProductInterface;
}
const ProductItem = ({ product }: ProductItemInterface) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: 2,
        height: "100%",
        borderRadius: 2,
        textDecoration: "none",
        "&:hover": {
          boxShadow: 4,
          transition: "box-shadow .2s ease-in-out",
        },
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" mb={1.5}>
          <img
            src={product.image_url}
            width="200px"
            height="200px"
            alt="notebook"
            style={{
              maxWidth: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {addEllipseToString(product?.name || "", 60)}
          </Typography>
        </Box>
        <Box>
          <Typography
            fontWeight={700}
            sx={{
              fontSize: "1.4rem",
              color: "#70e000",
            }}
          >
            R${" "}
            {product.price?.toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
