import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 2,
        px: 4,
        background:'#0a0a0a',
        '& *': {
          color: 'white'
        }
      }}
    >

      <Box>
        <Typography variant="subtitle2">Caio.ls &copy; Copyright 2024</Typography>
      </Box>
        

    </Box>
  )
}

export default Footer;