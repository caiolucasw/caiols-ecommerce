import { Box, SvgIcon, Typography } from "@mui/material";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TvIcon from "@mui/icons-material/Tv";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const listItems = [
  {
    id: 1,
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    id: 2,
    label: "Notebooks",
    icon: <LaptopIcon />,
    path: "/notebooks",
  },
  {
    id: 4,
    label: "Celulares",
    icon: <SmartphoneIcon />,
    path: "/celulares",
  },
  {
    id: 5,
    label: "TVs",
    icon: <TvIcon />,
    path: "/tvs",
  },
  {
    id: 6,
    label: "Câmeras",
    icon: <PhotoCameraIcon />,
    path: "/cameras",
  },
];

interface DepartmentListProps {
  closeDrawer?: () => void;
  styles?: React.CSSProperties;
}

const DepartmentList = ({ closeDrawer, styles }: DepartmentListProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {listItems.map((item) => (
        <Box
          key={item.id}
          gap={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            p: 0.75,
            borderRadius: 2,
            transition: "background-color 0.2s ease-in-out",
            ...(location.pathname === item.path && {
              backgroundColor: "rgba(255,255,255,0.18)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.18)",
            },
            ...(styles && styles),
            width: "100%",
          }}
          onClick={() => {
            navigate(item.path);
            if (closeDrawer) closeDrawer();
          }}
        >
          <SvgIcon>{item.icon}</SvgIcon>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ...(styles?.width && { width: Number(styles?.width) - 24 }),
            }}
          >
            <Typography variant="subtitle1">{item.label}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default DepartmentList;
