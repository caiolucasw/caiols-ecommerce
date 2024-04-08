import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import SearchInput from "./SearchInput";

const ContainerMainPages = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: "100%",
        ...(largeScreen && {
          display: "flex",
          gap: 3,
        }),
      }}
    >
      {!largeScreen && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          pb={1}
          mb={1.5}
        >
          <SearchInput />
        </Box>
      )}
      <Outlet />
    </Box>
  );
};

export default ContainerMainPages;
