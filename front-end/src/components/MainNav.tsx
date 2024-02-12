import {
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  useMediaQuery,
  MenuList,
  Button,
  Link,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import DepartmentList from "./DepartmentList";
import CloseIcon from "@mui/icons-material/Close";
import SearchInput from "./SearchInput";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logout } from "../app/userSlice";

const MainNav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const smallScreen = !largeScreen;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const userId = user && user.id;
  const cartItemsCount =
    user && user.cart_items_count ? user.cart_items_count : 0;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const onOpenMenuAccount = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenuAccount = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (largeScreen) setDrawerOpen(false);
  }, [largeScreen]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 60,
        background: "#0a0a0a",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mx: "auto",
          maxWidth: "1400px",
          gap: 2,
          py: 1,
        }}
      >
        {smallScreen && (
          <Box>
            <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#0a0a0a",
                  color: "white",
                  width: { xs: "100vw", sm: "40vw" },
                },
              }}
            >
              <Box role="presentation" height="100%">
                <Box position="relative" height="100%">
                  <Box
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: 5,
                    }}
                    onClick={toggleDrawer(false)}
                  >
                    <IconButton sx={{ color: "var(--primary-color)" }}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    p={5}
                  >
                    <DepartmentList
                      styles={{
                        justifyContent: "center",
                        width: 180,
                        gap: 2,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
        )}
        <Box
          component={RouteLink}
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
          <Typography fontWeight={600} variant="h5">
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
        {largeScreen && (
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={1}
          >
            <SearchInput />
          </Box>
        )}
        <Box display="flex" alignItems="center" sx={{ gap: 3, px: 3 }}>
          <Box>
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => navigate("/carrinho")}
            >
              <Badge color="error" badgeContent={cartItemsCount}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
            }}
            onMouseEnter={(e) => !userId && onOpenMenuAccount(e)}
            onMouseLeave={() => !userId && onCloseMenuAccount()}
          >
            <IconButton
              id="account-icon"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                color: "white",
              }}
              onClick={(e) => userId && onOpenMenuAccount(e)}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              id="account-menu"
              open={open}
              onClose={onCloseMenuAccount}
              anchorEl={anchorEl}
              disableAutoFocus
              disableAutoFocusItem
              MenuListProps={{
                "aria-labelledby": "account-icon",
                sx: {
                  backgroundColor: "rgba(19, 21, 26, 1)",
                },
              }}
            >
              {userId ? (
                <MenuList
                  sx={{
                    p: 0.5,
                    "& > li": {
                      p: 1.5,
                      color: "white",
                    },
                    "& > li:hover": {
                      backgroundColor: "rgba(255, 255, 255,0.1)",
                    },
                  }}
                >
                  <MenuItem onClick={() => navigate("/meus-pedidos")}>
                    Meus Pedidos
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/minha-conta")}>
                    Minha Conta
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(logout(user))}>
                    Sair
                  </MenuItem>
                </MenuList>
              ) : (
                <Box px={1} py={0.2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/login")}
                    sx={{
                      display: "block",
                      maxWidth: "200px",
                      mb: 1,
                      fontWeight: 700,
                    }}
                  >
                    FAÇA SEU LOGIN
                  </Button>
                  <Typography variant="caption" sx={{ color: "white" }}>
                    Cliente novo?{" "}
                    <Link component={RouteLink} to="/register" underline="none">
                      Cadastre-se
                    </Link>
                  </Typography>
                </Box>
              )}
            </Menu>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainNav;
