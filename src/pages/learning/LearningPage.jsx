import { useTheme } from '@emotion/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import StudyRoom from '../../resources/study_room.webp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function LearningPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const location = useLocation();
  const selectedTab = location.pathname.split('/').pop();
  const navigate = useNavigate();

  const handleListItemClick = (content) => {
    navigate(`/learning/courses/${content}`);
  };

  return (
    <Grid container style={{ height: 'calc(100vh-64px)' }}>
      <Grid item xs={12} sm={3}>
        <Paper
          square
          elevation={6}
          sx={{
            height: '100%',
            minHeight: !isMobile && '100dvh',
            overflowY: 'auto',
            padding: 2,
          }}
        >
          <Box px={2}>
            {!isMobile && (
              <Box sx={{ position: 'relative', width: '100%', height: 130 }}>
                <Avatar
                  alt='learning page image'
                  src={StudyRoom}
                  sx={{
                    width: '100%',
                    height: 130,
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 1,
                  }}
                />
              </Box>
            )}
          </Box>
          <List>
            <Accordion disableGutters defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant='subtitle1'
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <MenuBookIcon sx={{ mr: 2 }} /> My courses
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'active'}
                      onClick={() => handleListItemClick('active')}
                    >
                      <ListItemText primary='Active' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'favourites'}
                      onClick={() => handleListItemClick('favourites')}
                    >
                      <ListItemText primary='Favourites' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'wishlist'}
                      onClick={() => handleListItemClick('wishlist')}
                    >
                      <ListItemText primary='Wishlist' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={9} sx={{ height: 'calc(100vh-64px)', overflowY: 'auto' }}>
        <Container maxWidth='md'>
          <Outlet />
        </Container>
      </Grid>
    </Grid>
  );
}

export default LearningPage;
