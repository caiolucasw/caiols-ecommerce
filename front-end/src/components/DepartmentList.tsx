import { Box, SvgIcon, Typography } from '@mui/material'
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TvIcon from '@mui/icons-material/Tv';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TabletIcon from '@mui/icons-material/Tablet'
import React from 'react';


const listItems = [
    {
      id: 1,
      label: 'Notebooks',
      icon: <LaptopIcon />
    },
    {
      id: 2,
      label: 'Tablets',
      icon: <TabletIcon />
    },
    {
      id: 3,
      label: 'Celulares',
      icon: <SmartphoneIcon />
    },
    {
      id: 4,
      label: 'TVs',
      icon: <TvIcon />
    },
    {
      id: 5,
      label: 'Câmeras',
      icon: <PhotoCameraIcon />
  
    },
];

const DepartmentList = ({ styles } : { styles?: React.CSSProperties }) => {
  return (
    <>
        {listItems.map(item => (
            <Box
                key={item.id}
                gap={1}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    p: 0.75,
                    borderRadius: 2,
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.18)'
                    },
                    ...(styles && styles),
                    width: '100%',
                }}
            >
                <SvgIcon>
                    {item.icon}
                </SvgIcon>  
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      ...(styles?.width && { width: Number(styles?.width) - 24})
                    }}
                >
                    <Typography variant="subtitle1">{item.label}</Typography>
                </Box> 
            </Box>
        ))}
    </>
  )
}

export default DepartmentList;