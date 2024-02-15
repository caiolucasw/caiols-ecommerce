import { Box, Button, Grid, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import MyAccount from "../MyAccount";
import MyOrders from "../order/MyOrders";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logout } from "../../app/userSlice";

const tabs = [
  {
    id: 1,
    label: "Minha Conta",
    value: "account",
    icon: (
      <SvgIcon>
        <PersonIcon />
      </SvgIcon>
    ),
  },
  {
    id: 2,
    label: "Meus Pedidos",
    value: "orders",
    icon: (
      <SvgIcon>
        <InventoryIcon />
      </SvgIcon>
    ),
  },
];
const MyAccountPage = () => {
  const [currentTab, setCurrentTab] = useState("account");
  const { search } = useLocation();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    if (searchParams?.get("tab")) {
      setCurrentTab(searchParams.get("tab") || "account");
    }
  }, [search]);

  return (
    <Box width={"100%"}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3}>
          <Box display="flex" flexDirection={{ xs: "column" }} gap={1}>
            {tabs.map((tab) => (
              <Box
                key={tab.id}
                onClick={() => {
                  if (tab.value === "logout") {
                    logout();
                    return;
                  }

                  setCurrentTab(tab.value);
                }}
                sx={{
                  border: "1px solid",
                  borderLeft: "5px solid",
                  borderColor: "#ccc",
                  p: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  ...(currentTab === tab.value && {
                    borderLeftColor: "var(--primary-color)",
                  }),
                  "&:hover": {
                    opacity: 0.83,
                  },
                }}
              >
                <Box
                  display="flex"
                  // justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box width={24} height={24}>
                    {tab.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    {tab.label}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 999,
                  fontWeight: 700,
                }}
                onClick={() => dispatch(logout(user))}
              >
                Sair
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {currentTab === "account" && (
            <Box>
              <MyAccount />
            </Box>
          )}
          {currentTab === "orders" && (
            <Box>
              <MyOrders />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyAccountPage;
