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
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './styled/styledSearchComponents';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
import LogoutDialog from './LogoutDialog';
import logo from '../resources/logo.png';
import { useLayout } from '../context/LayoutContext';

export default function Navbar() {
  const { user, accessToken } = useSelector((state) => state.users);

  // Layout context
  const { showNavbar, navbarFixed } = useLayout();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

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
      <Avatar src={logo} />
      <Divider />
      {user ? (
        <Avatar src={user.picture} alt={user.first_name} />
      ) : (
        <>
          <Link to='/login' className='link-no-style'>
            <Button color='inherit' fullWidth>
              Login
            </Button>
          </Link>
          <Link to='/register' className='link-no-style'>
            <Button color='inherit' fullWidth>
              Register
            </Button>
          </Link>
        </>
      )}
      <Divider />
      <Link to='/catalog' className='link-no-style'>
        <Button color='inherit' fullWidth>
          Catalog
        </Button>
      </Link>
      <Link to='/learning' className='link-no-style'>
        <Button color='inherit' fullWidth>
          Learning
        </Button>
      </Link>
      <Link to='/teaching' className='link-no-style'>
        <Button color='inherit' fullWidth>
          Teaching
        </Button>
      </Link>
    </Box>
  );

  if (!showNavbar) return null;

  return (
    <AppBar
      position={navbarFixed ? 'fixed' : 'static'}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box>
              <Link
                to='/'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src={logo} sx={{ width: 75, height: 75 }} />
                <Typography color='inherit' variant='h5' ml={1}>
                  Skill Scout
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                to='/catalog'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  margin: 8,
                }}
              >
                <Typography color='inherit' variant='button'>
                  Catalog
                </Typography>
              </Link>
              <Link
                to='/learning'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  margin: 8,
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                <Typography color='inherit' variant='button'>
                  Learning
                </Typography>
              </Link>
              <Link
                to='/teaching'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  margin: 8,
                }}
              >
                <Typography color='inherit' variant='button'>
                  Teaching
                </Typography>
              </Link>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search...'
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      navigate(`catalog/search?search=${event.target.value}&page=1`);
                    }
                  }}
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
            </Box>
          </Box>
        )}

        <LogoutDialog open={logoutOpen} handleClose={handleLogoutClose} />
      </Toolbar>
    </AppBar>
  );
}
