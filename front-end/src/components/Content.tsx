import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          my: 1,
          gap: 3,
          py: 3,
          px: 1,
          maxWidth: "var(--max-screen-width)",
          mx: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Content;
