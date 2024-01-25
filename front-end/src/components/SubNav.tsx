import { Box } from "@mui/material";
import DepartmentList from "./DepartmentList";

const SubNav = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--primary-color-dark)",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "var(--max-screen-width)",
          mx: "auto",
          gap: 2,
          py: 0.7,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={5}
          px={1}
        >
          <DepartmentList />
        </Box>
      </Box>
    </Box>
  );
};

export default SubNav;
