import React, { useEffect, useState } from 'react';
import analyticsService from '../../../../features/teaching/analyticsService';
import { toast } from 'react-toastify';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import StepEngagementCard from './StepEngagementCard';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const dummyData = Array.from({ length: 50 }, (_, i) => {
  const lessonOrder = Math.floor(i / 3) + 1; // Assuming 3 steps per lesson
  const stepOrder = (i % 3) + 1; // Step order within the lesson
  return {
    lesson_step_id: (i + 1).toString(),
    lesson_step_order: stepOrder,
    lesson_id: lessonOrder.toString(),
    lesson_title: `Lesson Title ${lessonOrder}`,
    lesson_step_type: ['text', 'quiz', 'video'][i % 3],
    average_time_spent: (Math.random() * 15 * 60 + 300).toFixed(2), // Random time between 5 and 20 minutes
    learners_count: Math.floor(Math.random() * 100) + 50, // Random count between 50 and 150 learners
    last_accessed: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
  };
});

function LessonStepsEngagementList() {
  const { course } = useSelector((state) => state.teaching.edit);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsService.getLessonStepsEngagementAnalytics(
          course.id
        );
        const data = response.map((item) => ({
          ...item,
          average_time_spent: parseFloat(item.average_time_spent) / 60, // Convert seconds to minutes
        }));

        const lessonMap = new Map();
        data.forEach((item) => {
          if (!lessonMap.has(item.lesson_id)) {
            lessonMap.set(item.lesson_id, {
              lesson_id: item.lesson_id,
              lesson_title: item.lesson_title,
              steps: [],
            });
          }
          lessonMap.get(item.lesson_id).steps.push(item);
        });

        setData(Array.from(lessonMap.values()));
      } catch (error) {
        console.error('Error fetching lesson steps engagement analytics:', error);
        toast.error('Failed to fetch lesson steps engagement analytics');
      }
    };
    if (course) {
      fetchData();
    }
  }, [course]);
  return (
    <Box>
      {data.length === 0 ? (
        <Typography fontSize={17} textAlign='center' sx={{ my: 4 }}>
          Unfortunately, there is no data available yet.
        </Typography>
      ) : (
        data.map((lesson, index) => (
          <Accordion
            key={lesson.lesson_id}
            elevation={1}
            sx={{
              border: '1px solid lightgray',
              '&:not(:last-child)': {
                borderBottom: 0,
              },
              '&::before': {
                display: 'none',
              },
            }}
            defaultExpanded={index < 3}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{lesson.lesson_title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lesson.steps.map((step) => (
                <StepEngagementCard key={step.lesson_step_id} step={step} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}

export default LessonStepsEngagementList;
