import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ImageList from "./ImageList";

const ProductDetails = () => {
  const [currentTab, setCurrentTab] = useState("description");
  return (
    <Box width="100%">
      <Box mb={3}>
        <Typography color="text." variant="h5" fontWeight={700}>
          Notebook Lenovo Intel i7 16GB
        </Typography>
      </Box>
      <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
        <Box flex={1} display="flex">
          <ImageList />
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            fontWeight={700}
            mt={3}
            mb={3}
          >
            R$ 3.600,00
          </Typography>
          <Select value={1} label="Quantidade" fullWidth size="small">
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          <Box>
            <Box my={2}>
              <Button variant="contained" color="primary" fullWidth>
                Comprar
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="inherit" fullWidth>
                Adicionar ao carrinho
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={5}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            indicatorColor="primary"
            value={currentTab}
            onChange={(e, value) => setCurrentTab(value)}
          >
            <Tab value="description" label="Descrição" />
            <Tab value="details" label="Detalhes do Produto" />
          </Tabs>

          <Box p={2}>
            {currentTab === "description" && (
              <Box>
                Descricao Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Blanditiis, fuga cupiditate. Ducimus aliquam architecto
                pariatur porro, doloribus et, numquam ex deleniti minima hic
                dolore commodi praesentium. Cum ipsum officiis quibusdam
                laudantium recusandae ab quidem vero, architecto unde, incidunt
                ut. Aspernatur, ipsum impedit ipsa commodi nisi animi eum maxime
                officiis iusto.
              </Box>
            )}
            {currentTab === "details" && (
              <Box>
                Detalhes Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Blanditiis, fuga cupiditate. Ducimus aliquam architecto
                pariatur porro, doloribus et, numquam ex deleniti minima hic
                dolore commodi praesentium. Cum ipsum officiis quibusdam
                laudantium recusandae ab quidem vero, architecto unde, incidunt
                ut. Aspernatur, ipsum impedit ipsa commodi nisi animi eum maxime
                officiis iusto.
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
