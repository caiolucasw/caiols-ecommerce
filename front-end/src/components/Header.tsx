import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainNav from './MainNav'
import SubNav from './SubNav'

const Header = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
        <MainNav />
        {largeScreen && <SubNav />}
    </>
  )
}

export default Header;