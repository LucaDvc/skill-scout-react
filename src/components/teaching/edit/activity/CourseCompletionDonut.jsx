import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import analyticsService from '../../../../features/teaching/analyticsService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const dummyData = {
  learners_completed: 52,
  learners_in_progress: 103,
};

function CourseCompletionDonut() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { course } = useSelector((state) => state.teaching.edit);
  const [data, setData] = useState({
    learners_completed: 0,
    learners_in_progress: 0,
  });
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        const data = await analyticsService.getCourseCompletionAnalytics(course.id);
        setData(dummyData);
        setRefresh(!refresh);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch course completion data');
      }
    };
    if (course) fetchCompletionData();
  }, [course]);

  const chartData = {
    series: [data.learners_in_progress, data.learners_completed],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['In Progress', 'Completed'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 280,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      colors: ['rgb(254, 176, 25)', 'rgb(0, 143, 251)'],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total learners',
                fontSize: '16px',
                color: 'black',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
            size: '60%',
          },
        },
      },
    },
  };

  return (
    <Box sx={{ py: 2, maxWidth: 400 }}>
      <Typography variant='h5' sx={{ mb: 2 }} textAlign={!isSmallScreen && 'center'}>
        Completion ratio
      </Typography>
      <Chart
        key={refresh}
        options={chartData.options}
        series={chartData.series}
        type='donut'
        width='400'
      />
    </Box>
  );
}

export default CourseCompletionDonut;
