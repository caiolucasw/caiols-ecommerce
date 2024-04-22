import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductsAdd from "./admin/ProductsAdd";
import Brands from "./admin/Brands";
import Categories from "./admin/Categories";

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState("products");
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const smallScreen = !largeScreen;

  return (
    <Container maxWidth="lg">
      <Box p={2}>
        <Box
          component={Link}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 4,
            color: "white",
            textDecoration: "none",
            ...(smallScreen && { flex: 1 }),
          }}
          to="/"
        >
          <Typography fontWeight={600} variant="h4" sx={{ color: "black" }}>
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
              onChange={(_e, value) => setCurrentTab(value)}
            >
              <Tab value="products" label="Produtos" />
              <Tab value="brands" label="Marcas" />
              <Tab value="categories" label="Categorias" />
            </Tabs>

            <Box p={2}>
              {currentTab === "products" && <ProductsAdd />}
              {currentTab === "brands" && <Brands />}
              {currentTab === "categories" && <Categories />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
