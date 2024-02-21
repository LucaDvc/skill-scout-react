import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState, useContext } from 'react';
import { SyllabusContext } from '../../../../../context/SyllabusContext';
import { nanoid } from 'nanoid';

function NewLessonCard({ chapterId }) {
  const [title, setTitle] = useState('');

  const { chapters, setChapters } = useContext(SyllabusContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: [
                ...chapter.lessons,
                {
                  id: nanoid(),
                  title: title,
                  order: chapter.lessons.length + 1,
                  chapter_id: chapterId,
                  new: true,
                },
              ],
            }
          : chapter
      )
    );

    setTitle('');
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
          <Box
            sx={{
              width: '0.5%',
              background: (theme) => theme.palette.secondary.main,
            }}
          ></Box>
          <Box sx={{ display: 'flex', flex: 1, marginLeft: 2 }}>
            <Box mt={1} ml={1} width='75%'>
              <TextField
                label=''
                value={title}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
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
                placeholder='Type a name for the new lesson and press Enter.'
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
            <Button
              sx={{ paddingX: 4, paddingY: 1, marginRight: 1 }}
              startIcon={<AddIcon fontSize='large' />}
              variant='outlined'
              onClick={handleSubmit}
              disabled={!title}
            >
              Add Lesson
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NewLessonCard;
