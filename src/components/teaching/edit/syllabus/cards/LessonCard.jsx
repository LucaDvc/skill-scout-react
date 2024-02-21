import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { SyllabusContext } from '../../../../../context/SyllabusContext';

function LessonCard({ lesson, moduleIndex, totalLessons }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(
    lesson.title ? lesson.title : 'New Lesson'
  );

  const { chapters, setChapters } = useContext(SyllabusContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === lesson.chapter_id
          ? {
              ...chapter,
              lessons: chapter.lessons.map((l) =>
                l.id === lesson.id ? { ...l, deleted: true } : l
              ),
            }
          : chapter
      )
    );
  };

  const handleMoveUp = () => {
    const chaptersCopy = [...chapters];
    const lessonIndex = chaptersCopy[moduleIndex - 1].lessons.findIndex(
      (l) => l.id === lesson.id
    );
    const movedUpLessonCopy = {
      ...chaptersCopy[moduleIndex - 1].lessons[lessonIndex],
      order: lesson.order - 1,
    };
    const movedDownLessonCopy = {
      ...chaptersCopy[moduleIndex - 1].lessons[lessonIndex - 1],
      order: lesson.order,
    };

    setChapters(
      chaptersCopy.map((chapter) =>
        chapter.id === lesson.chapter_id
          ? {
              ...chapter,
              lessons: chapter.lessons.map((l, idx) =>
                idx === lessonIndex
                  ? movedDownLessonCopy
                  : idx === lessonIndex - 1
                  ? movedUpLessonCopy
                  : l
              ),
            }
          : chapter
      )
    );
  };

  const handleMoveDown = () => {
    const chaptersCopy = [...chapters];
    const lessonIndex = chaptersCopy[moduleIndex - 1].lessons.findIndex(
      (l) => l.id === lesson.id
    );
    const movedDownLessonCopy = {
      ...chaptersCopy[moduleIndex - 1].lessons[lessonIndex],
      order: lesson.order + 1,
    };
    const movedUpLessonCopy = {
      ...chaptersCopy[moduleIndex - 1].lessons[lessonIndex + 1],
      order: lesson.order,
    };

    setChapters(
      chaptersCopy.map((chapter) =>
        chapter.id === lesson.chapter_id
          ? {
              ...chapter,
              lessons: chapter.lessons.map((l, idx) =>
                idx === lessonIndex
                  ? movedUpLessonCopy
                  : idx === lessonIndex + 1
                  ? movedDownLessonCopy
                  : l
              ),
            }
          : chapter
      )
    );
  };

  const handleRestoreLesson = () => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === lesson.chapter_id
          ? {
              ...chapter,
              lessons: chapter.lessons.map((l) =>
                l.id === lesson.id ? { ...l, deleted: false } : l
              ),
            }
          : chapter
      )
    );
  };

  return (
    <Card
      sx={{
        marginLeft: '5%',
        minWidth: '95%',
        overflow: 'hidden',
        borderRadius: 0,
        elevation: 3,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {lesson.deleted ? (
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
                Lesson "{lesson.title}" will be removed from the course on save
              </Typography>
              <Button variant='text' onClick={handleRestoreLesson}>
                Restore
              </Button>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {lesson.order !== 1 && (
                  <IconButton
                    aria-label='move-up'
                    id='lesson-move-up-button'
                    onClick={handleMoveUp}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                )}
                {lesson.order !== totalLessons && (
                  <IconButton
                    aria-label='move-down'
                    id='lesson-move-down-button'
                    onClick={handleMoveDown}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                )}
              </Box>
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Box
                  sx={{
                    marginLeft: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='body1'>
                    {`${moduleIndex}.${lesson.order}`}
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
                        maxLength: 50,
                      },
                    }}
                    helperText='Max. 50 characters'
                    onBlur={() =>
                      setChapters(
                        chapters.map((chapter) =>
                          chapter.id === lesson.chapter_id
                            ? {
                                ...chapter,
                                lessons: chapter.lessons.map((l) =>
                                  l.id === lesson.id
                                    ? { ...l, title: title }
                                    : l
                                ),
                              }
                            : chapter
                        )
                      )
                    }
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 1,
                }}
              >
                {!lesson.new && (
                  <Button
                    sx={{ paddingX: 4, paddingY: 1, marginRight: 1 }}
                    variant='outlined'
                    onClick={() => navigate(`/teaching/lessons/${lesson.id}`)}
                  >
                    Edit
                  </Button>
                )}

                <IconButton
                  aria-label='delete'
                  id='lesson-delete-button'
                  onClick={handleDeleteClick}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default LessonCard;
