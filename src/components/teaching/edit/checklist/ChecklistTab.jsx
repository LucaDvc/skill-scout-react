import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckItem from './CheckItem';
import { useSelector } from 'react-redux';

function ChecklistTab() {
  const { course } = useSelector((state) => state.teaching.edit);

  const checkTwoModules = course?.chapters?.length >= 2;

  const lessonsNumber =
    course?.chapters?.reduce((acc, chapter) => acc + chapter.lessons.length, 0) || 0;

  let assignmentsNumber = 0;
  if (course?.chapters) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter?.lessons || []) {
        for (const step of lesson.lesson_steps || []) {
          if (
            step.type === 'quiz' ||
            step.type === 'codechallenge' ||
            step.type === 'sorting_problem' ||
            step.type === 'text_problem'
          ) {
            assignmentsNumber++;
          }
        }
      }
    }
  }

  const checkEmptyModules =
    course?.chapters?.length > 0 &&
    course.chapters.every((chapter) => chapter.lessons.length > 0);

  let checkAllVideos = true;
  if (course?.chapters) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter?.lessons || []) {
        for (const step of lesson.lesson_steps || []) {
          if (step.type === 'video' && !step.video_file) {
            checkAllVideos = false;
            break;
          }
        }
      }
    }
  }

  const checkLogoUploaded =
    course?.image !==
    'https://courses-platform-bucket.s3.eu-north-1.amazonaws.com/courses/images/default.jpg';

  const checkSummary = course?.intro?.length > 100;

  const checkCategory = !!course?.category;

  const pointsCheckedNumber =
    (checkTwoModules ? 1 : 0) +
    (lessonsNumber >= 10 ? 1 : 0) +
    (assignmentsNumber >= 10 ? 1 : 0) +
    (checkEmptyModules ? 1 : 0) +
    (checkAllVideos ? 1 : 0) +
    (checkLogoUploaded ? 1 : 0) +
    (checkSummary ? 1 : 0) +
    (checkCategory ? 1 : 0);

  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h4' mb={2}>
          Checklist
        </Typography>
        <Typography variant='h6' mb={2}>
          Course is {pointsCheckedNumber}/8 ready
        </Typography>

        <Typography variant='h5' gutterBottom>
          Structure and content
        </Typography>

        <CheckItem
          title='At least 2 modules'
          description='Divide the course into at least two modules to make the content easier to comprehend.'
          isCompleted={checkTwoModules}
        />

        <CheckItem
          title={`At least 10 lessons (now ${lessonsNumber})`}
          description='We recommend you put at least ten lessons in your course.'
          isCompleted={lessonsNumber >= 10}
        />

        <CheckItem
          title={`At least 10 assignments (now ${assignmentsNumber})`}
          description='We believe that practice is the best way to learn. Add at least 10 assignments to your course.'
          isCompleted={assignmentsNumber >= 10}
        />

        <CheckItem
          title='No empty modules'
          description='Each module should have at least one lesson, otherwise the course will seem unfinished. Remove empty modules or add lessons to them.'
          isCompleted={checkEmptyModules}
        />

        <CheckItem
          title='All videos in steps are uploaded'
          description='Make sure that videos are uploaded to all video steps.'
          isCompleted={checkAllVideos}
        />

        <Typography variant='h5' gutterBottom>
          Presentation
        </Typography>

        <CheckItem
          title='Logo is uploaded'
          description="Your course's logo is the first thing learners see in the catalog."
          isCompleted={checkLogoUploaded}
        />

        <CheckItem
          title='Summary is more than 100 symbols'
          description='Try to summarize what your course is about. Learners will see this description in the search and at the course promo page right under the course title.'
          isCompleted={checkSummary}
        />

        <CheckItem
          title='The course category is specified'
          description='Choose a more precise category to make it easier for learners to find your course.'
          isCompleted={checkCategory}
        />
      </Box>
    )
  );
}

export default ChecklistTab;
