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
import BrandsAdd from "./admin/BrandsAdd";

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
              onChange={(e, value) => setCurrentTab(value)}
            >
              <Tab value="products" label="Produtos" />
              <Tab value="brands" label="Marcas" />
            </Tabs>

            <Box p={2}>
              {currentTab === "products" && <ProductsAdd />}
              {currentTab === "brands" && <BrandsAdd />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
