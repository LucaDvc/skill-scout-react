import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  TextField,
  MenuItem,
  ListItemIcon,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import { useState, useContext } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LessonCard from './LessonCard';
import NewLessonCard from './NewLessonCard';
import { SyllabusContext } from '../../../../../context/SyllabusContext';
import { nanoid } from 'nanoid';

function ModuleCard({ chapter, index }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [title, setTitle] = useState(
    chapter.title ? chapter.title : 'New Module'
  );

  const { chapters, setChapters } = useContext(SyllabusContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setChapters(
      chapters.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              deleted: true,
            }
          : ch
      )
    );
  };

  const handleRestoreModule = () => {
    setChapters(
      chapters.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              deleted: false,
            }
          : ch
      )
    );
  };

  const handleDuplicateClick = () => {
    setAnchorEl(null);
    setChapters([
      ...chapters,
      {
        id: nanoid(),
        title: `${chapter.title} (copy)`,
        lessons: chapter.lessons.map((l) => ({
          ...l,
          id: nanoid(),
          new: true,
        })),
      },
    ]);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '100%',
          minWidth: '100%',
          overflow: 'hidden',
          borderRadius: 0,
          elevation: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                width: '0.5%',
                background: (theme) => theme.palette.secondary.main,
              }}
            ></Box>
            {chapter.deleted ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  variant='body1'
                  color='text.secondary'
                  fontStyle='italic'
                >
                  Module "{chapter.title}" will be removed from the course on
                  save
                </Typography>
                <Button variant='text' onClick={handleRestoreModule}>
                  Restore
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', flex: 1 }}>
                  <Box
                    sx={{
                      marginLeft: 2,
                      marginBottom: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='h5' fontWeight={1} fontStyle='italic'>
                      {index}
                    </Typography>
                  </Box>
                  <Box mt={1} ml={1} width='75%'>
                    <TextField
                      label=''
                      value={title}
                      onChange={handleChange}
                      required
                      sx={{
                        margin: 1,
                        width: '100%',
                      }}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                      helperText='Max. 100 characters'
                    />
                  </Box>
                </Box>
                <Box mt={1} sx={{ alignSelf: 'flex-start' }}>
                  <IconButton
                    aria-label='more'
                    id='module-actions-button'
                    aria-controls={menuOpen ? 'module-actions-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={handleMenuClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id='module-actions-menu'
                    MenuListProps={{
                      'aria-labelledby': 'module-actions-button',
                    }}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleDuplicateClick} disableRipple>
                      <ListItemIcon>
                        <FileCopyIcon />
                      </ListItemIcon>
                      Duplicate
                    </MenuItem>
                    <MenuItem onClick={handleDeleteClick} disableRipple>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
      {!chapter.deleted && (
        <>
          {chapter.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleIndex={index}
              totalLessons={chapter.lessons.length}
            />
          ))}
          <NewLessonCard chapterId={chapter.id} />
        </>
      )}
    </>
  );
}

export default ModuleCard;
