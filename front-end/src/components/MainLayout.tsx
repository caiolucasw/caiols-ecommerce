import { Box } from "@mui/material";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          px: 4,
          flex: 1,
        }}
      >
        <Content />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
