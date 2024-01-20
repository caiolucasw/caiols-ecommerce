import { Box, Drawer, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon  from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DepartmentList from "./DepartmentList";
import CloseIcon from "@mui/icons-material/Close";

const MainNav = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const smallScreen = !largeScreen;

  const toggleDrawer = (open: boolean) => 
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  useEffect(() => {
    if (largeScreen) setDrawerOpen(false);
  }, [largeScreen]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: 60,
        background: '#0a0a0a',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mx: 'auto',
          maxWidth: '1400px',
          gap: 2,
          py: 1,
        }}
      >
        {smallScreen && (
          <Box>
            <IconButton 
              sx={{ color: 'white'}}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: '#0a0a0a',
                  color: 'white',
                  width: { xs: '100vw', sm: '40vw'}
                }
              
              }}
            >

              <Box
                role="presentation"
                height="100%"
              >
                <Box
                  position="relative"
                  height="100%"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 5,
                    }}
                    onClick={toggleDrawer(false)}
                  >
                    <IconButton
                      sx={{ color: 'var(--primary-color)'}}
                    >
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
                        justifyContent: 'center',
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
          component={Link}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            color: 'white',
            textDecoration: 'none',
            ...(smallScreen && { flex: 1 })
          }}
          to="/"
        >
          <Typography
            fontWeight={600} 
            variant="h5"
          >
            Caio.
            <Typography 
              variant="inherit" 
              sx={{
                display: 'inline-block', 
                color: '#70e000 !important'
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
            <TextField 
              variant="outlined"
              size="small"
              placeholder="Procure produtos"             
              sx={{ 
                backgroundColor: 'white', 
                borderRadius: 4,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#70e000',
                  borderRadius: 4,
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Box>
        )}
        <Box
          display="flex"
          alignItems="center"
          sx={{ gap: 3, px: 3}}

        >
          <Box>
            <IconButton 
              sx={{
                color: 'white'
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          <Box >
            <IconButton
              sx={{
                color: 'white'
              }}
            >
              <PersonIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MainNav;