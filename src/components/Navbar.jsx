import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './styled/styledSearchComponents';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
import LogoutDialog from './LogoutDialog';

export default function Navbar() {
  const { user, accessToken } = useSelector((state) => state.users);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };
  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        width: 250, // Adjust the width as needed
      }}
    >
      <Typography variant='h6' sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      {user ? (
        <Avatar src={user.picture} alt={user.first_name} />
      ) : (
        <>
          <Link
            to='/login'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color='inherit' fullWidth>
              Login
            </Button>
          </Link>
          <Link
            to='/register'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color='inherit' fullWidth>
              Register
            </Button>
          </Link>
        </>
      )}
      <Divider />
      <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button color='inherit' fullWidth>
          Catalog
        </Button>
      </Link>
      <Link to='/learning' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button color='inherit' fullWidth>
          Learning
        </Button>
      </Link>
      <Link to='/teaching' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button color='inherit' fullWidth>
          Teaching
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppBar position='static'>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
            >
              <Typography variant='h6' component='div'>
                Logo
              </Typography>
            </Link>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>Catalog</Button>
            </Link>
            <Link
              to='/learning'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color='inherit'>Learning</Button>
            </Link>
            <Link
              to='/teaching'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color='inherit'>Teaching</Button>
            </Link>
          </Box>
        )}

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {!isMobile &&
          (accessToken ? (
            <>
              <Avatar
                src={user.picture}
                alt={user.first_name}
                onClick={handleMenuClick}
                sx={{ cursor: 'pointer', mx: 1 }}
              />
              <AccountMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                logoutClick={handleLogoutOpen}
              />
            </>
          ) : (
            <Box sx={{ mx: 1 }}>
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Button color='inherit' variant='outlined' sx={{ mr: 1 }}>
                  Login
                </Button>
              </Link>
              <Link
                to='/register'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button color='inherit' variant='outlined'>
                  Register
                </Button>
              </Link>
            </Box>
          ))}

        <LogoutDialog open={logoutOpen} handleClose={handleLogoutClose} />
      </Toolbar>
    </AppBar>
  );
}
