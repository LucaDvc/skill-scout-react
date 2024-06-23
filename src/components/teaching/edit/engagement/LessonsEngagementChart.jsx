import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import analyticsService from '../../../../features/teaching/analyticsService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';

// Generating dummy data with 25 objects
const dummyData = Array.from({ length: 25 }, (_, i) => {
  const stepOrder = i + 1;
  return {
    lesson_step_id: stepOrder.toString(),
    lesson_step_order: stepOrder,
    lesson_title: `Lesson Title ${stepOrder}`,
    lesson_step_type: ['text', 'quiz', 'video', 'codechallenge'][
      Math.floor(Math.random() * 4)
    ],
    average_time_spent: (Math.random() * 15 * 60 + 5 * 60).toFixed(2), // Random time between 5 and 20 minutes
    learners_count: Math.floor(Math.random() * 100) + 50, // Random count between 50 and 150 learners
    last_accessed: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
  };
});

function LessonsEngagementChart() {
  const { course } = useSelector((state) => state.teaching.edit);
  const [data, setData] = useState({
    lessonTitles: [],
    avgTimeSpent: [],
    learnersCount: [],
    tickAmount: 0,
  });

  const chartData = {
    series: [
      {
        name: 'Learners Count',
        type: 'column',
        data: data.learnersCount,
      },
      {
        name: 'Average Time Spent',
        type: 'line',
        data: data.avgTimeSpent,
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 450,
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 4], // 0 for bar, 4 for line
        curve: 'smooth',
      },
      xaxis: {
        categories: data.lessonTitles,
        tickAmount: data.tickAmount,
        title: {
          text: 'Lessons',
        },
        labels: {
          rotate: -45,
          rotateAlways: true,
          hideOverlappingLabels: false,
          showDuplicates: false,
          trim: true,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: [
        {
          opposite: true,
          title: {
            text: 'Learners Count',
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
          min: 0,
        },
        {
          title: {
            text: 'Average Time Spent (minutes)',
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
          min: 0,
        },
      ],
      fill: {
        opacity: [1, 0.85],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticsService.getLessonsEngagementAnalytics(course.id);
        const data1 = dummyData;
        const lessonTitles = data.map((item) => item.lesson_title);
        const avgTimeSpent = data.map((item) => parseFloat(item.average_time_spent) / 60); // Convert to minutes
        const learnersCount = data.map((item) => item.learners_count);
        const tickAmount =
          lessonTitles.length > 50
            ? Math.floor(lessonTitles.length / 10)
            : lessonTitles.length > 25
            ? Math.floor(lessonTitles.length / 5)
            : lessonTitles.length;

        setData({ lessonTitles, avgTimeSpent, learnersCount, tickAmount });
      } catch (error) {
        console.error('Error fetching lessons engagement analytics:', error);
        toast.error('Failed to fetch lessons engagement analytics');
      }
    };

    if (course) {
      fetchData();
    }
  }, [course]);

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant='h5' sx={{ mb: 2 }} textAlign='center'>
        Overview
      </Typography>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type='line'
        height={450}
        width={'100%'}
      />
    </Box>
  );
}

export default LessonsEngagementChart;
