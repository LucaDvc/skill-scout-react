import React, { useEffect, useState } from 'react';
import AssessmentDistributionChart from './AssessmentDistributionChart';
import AssesmentsStackedBarChart from './AssesmentsStackedBarChart';
import LessonPerformanceAccordion from './LessonPerformanceAccordion';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import analyticsService from '../../../../features/teaching/analyticsService';
import { toast } from 'react-toastify';
import Spinner from '../../../layout/Spinner';

const dummyData = {
  quiz_statistics: [
    {
      lesson_id: 'lesson_7',
      lesson_title: 'String Manipulation',
      step_order: 1,
      step_id: 'step_7',
      step_type: 'text_problem',
      total_attempts: 90,
      total_learners: 40,
      success_rate: 45,
    },
    {
      lesson_id: 'lesson_8',
      lesson_title: 'Regular Expressions',
      step_order: 2,
      step_id: 'step_8',
      step_type: 'text_problem',
      total_attempts: 100,
      total_learners: 45,
      success_rate: 85,
    },
    {
      lesson_id: 'lesson_1',
      lesson_title: 'Introduction to Python',
      step_order: 1,
      step_id: 'step_1',
      step_type: 'quiz',
      total_attempts: 30,
      total_learners: 10,
      success_rate: 70,
    },
    {
      lesson_id: 'lesson_1',
      lesson_title: 'Introduction to Python',
      step_order: 2,
      step_id: 'step_2',
      step_type: 'quiz',
      total_attempts: 40,
      total_learners: 15,
      success_rate: 60,
    },
    {
      lesson_id: 'lesson_2',
      lesson_title: 'Variables and Data Types',
      step_order: 2,
      step_id: 'step_2',
      step_type: 'quiz',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 55,
    },
    {
      lesson_id: 'lesson_1',
      lesson_title: 'Introduction to Python',
      step_order: 1,
      step_id: 'step_1',
      step_type: 'quiz',
      total_attempts: 30,
      total_learners: 10,
      success_rate: 70,
    },
    {
      lesson_id: 'lesson_1',
      lesson_title: 'Introduction to Python',
      step_order: 2,
      step_id: 'step_2',
      step_type: 'quiz',
      total_attempts: 40,
      total_learners: 15,
      success_rate: 60,
    },
    {
      lesson_id: 'lesson_2',
      lesson_title: 'Variables and Data Types',
      step_order: 2,
      step_id: 'step_2',
      step_type: 'quiz',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 55,
    },
  ],
  code_challenge_statistics: [
    {
      lesson_id: 'lesson_3',
      lesson_title: 'Control Structures',
      step_order: 1,
      step_id: 'step_3',
      step_type: 'codechallenge',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 80,
    },
    {
      lesson_id: 'lesson_4',
      lesson_title: 'Functions and Modules',
      step_order: 2,
      step_id: 'step_4',
      step_type: 'codechallenge',
      total_attempts: 60,
      total_learners: 25,
      success_rate: 75,
    },
    {
      lesson_id: 'lesson_3',
      lesson_title: 'Control Structures',
      step_order: 1,
      step_id: 'step_3',
      step_type: 'codechallenge',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 80,
    },
    {
      lesson_id: 'lesson_4',
      lesson_title: 'Functions and Modules',
      step_order: 2,
      step_id: 'step_4',
      step_type: 'codechallenge',
      total_attempts: 60,
      total_learners: 25,
      success_rate: 75,
    },
    {
      lesson_id: 'lesson_3',
      lesson_title: 'Control Structures',
      step_order: 1,
      step_id: 'step_3',
      step_type: 'codechallenge',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 80,
    },
    {
      lesson_id: 'lesson_4',
      lesson_title: 'Functions and Modules',
      step_order: 2,
      step_id: 'step_4',
      step_type: 'codechallenge',
      total_attempts: 60,
      total_learners: 25,
      success_rate: 75,
    },
    {
      lesson_id: 'lesson_3',
      lesson_title: 'Control Structures',
      step_order: 1,
      step_id: 'step_3',
      step_type: 'codechallenge',
      total_attempts: 50,
      total_learners: 20,
      success_rate: 80,
    },
    {
      lesson_id: 'lesson_4',
      lesson_title: 'Functions and Modules',
      step_order: 2,
      step_id: 'step_4',
      step_type: 'codechallenge',
      total_attempts: 60,
      total_learners: 25,
      success_rate: 75,
    },
  ],
  sorting_problem_statistics: [
    {
      lesson_id: 'lesson_5',
      lesson_title: 'Sorting Algorithms',
      step_order: 1,
      step_id: 'step_5',
      step_type: 'sorting_problem',
      total_attempts: 70,
      total_learners: 30,
      success_rate: 85,
    },
    {
      lesson_id: 'lesson_6',
      lesson_title: 'Searching Algorithms',
      step_order: 2,
      step_id: 'step_6',
      step_type: 'sorting_problem',
      total_attempts: 80,
      total_learners: 35,
      success_rate: 90,
    },
  ],
  text_problem_statistics: [
    {
      lesson_id: 'lesson_7',
      lesson_title: 'String Manipulation',
      step_order: 1,
      step_id: 'step_7',
      step_type: 'text_problem',
      total_attempts: 90,
      total_learners: 40,
      success_rate: 95,
    },
    {
      lesson_id: 'lesson_8',
      lesson_title: 'Regular Expressions',
      step_order: 2,
      step_id: 'step_8',
      step_type: 'text_problem',
      total_attempts: 100,
      total_learners: 45,
      success_rate: 85,
    },
  ],
};

const groupDataByLesson = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    if (!groupedData[item.lesson_id]) {
      groupedData[item.lesson_id] = {
        lesson_id: item.lesson_id,
        lesson_title: item.lesson_title,
        steps: [],
      };
    }
    groupedData[item.lesson_id].steps.push({
      lesson_id: item.lesson_id,
      step_order: item.step_order,
      step_id: item.step_id,
      step_type: item.step_type,
      total_attempts: item.total_attempts,
      total_learners: item.total_learners,
      success_rate: item.success_rate,
    });
  });

  return Object.values(groupedData);
};

function AssesmentsAnalyticsTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  const modulesNo = course?.chapters?.length || 0;
  const lessonsNo = course?.chapters?.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );
  const stepsNo = course?.chapters?.reduce(
    (acc, chapter) =>
      acc +
      chapter?.lessons?.reduce((acc, lesson) => acc + lesson?.lesson_steps?.length, 0),
    0
  );

  const [data, setData] = useState({
    quiz_statistics: [],
    code_challenge_statistics: [],
    sorting_problem_statistics: [],
    text_problem_statistics: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessmentsData = async () => {
      try {
        const response = await analyticsService.getAssessmentsAnalytics(course.id);
        setData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch assessments data');
      } finally {
        setLoading(false);
      }
    };

    if (course) fetchAssessmentsData();
  }, [course]);

  const lessonsData = [
    ...data.quiz_statistics,
    ...data.code_challenge_statistics,
    ...data.sorting_problem_statistics,
    ...data.text_problem_statistics,
  ];
  const groupedData = groupDataByLesson(lessonsData);

  const assessmentsNo = lessonsData.length;

  return (
    course && (
      <Box sx={{ py: 2 }}>
        {loading && <Spinner />}
        <Typography variant='h3' sx={{ mb: 2 }}>
          Assessments analytics
        </Typography>
        <Grid container sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 2,
                height: '100%',
              }}
            >
              <ul style={{ alignSelf: 'center' }}>
                <li>
                  <Typography fontSize={17}>Modules: {modulesNo} </Typography>
                </li>
                <li>
                  <Typography fontSize={17}>Lessons: {lessonsNo}</Typography>
                </li>
                <li>
                  <Typography fontSize={17}>Steps: {stepsNo}</Typography>
                </li>
                <li>
                  <Typography fontSize={17}>Assessments: {assessmentsNo}</Typography>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <AssessmentDistributionChart data={data} />
          </Grid>
        </Grid>

        <AssesmentsStackedBarChart data={lessonsData} />
        <LessonPerformanceAccordion data={groupedData} />
      </Box>
    )
  );
}

export default AssesmentsAnalyticsTab;
