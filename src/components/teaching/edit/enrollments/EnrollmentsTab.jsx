import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import analyticsService from '../../../../features/teaching/analyticsService';

function generateDummyData(numDataPoints) {
  const dummyData = {
    total_enrollments: numDataPoints,
    enrollment_data: [],
  };

  const startDate = new Date(2024, 3, 1); // Starting from April 1, 2024

  for (let i = 0; i < numDataPoints; i++) {
    const enrollmentDate = new Date(startDate);
    enrollmentDate.setDate(enrollmentDate.getDate() + i); // Ensure unique dates by incrementing the day

    const enrollmentDataPoint = {
      enrollment_date: enrollmentDate.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 100) + 10, // Random count between 1 and 10
    };

    dummyData.enrollment_data.push(enrollmentDataPoint);
  }

  return dummyData;
}

const dummyData = generateDummyData(50);

function EnrollmentsTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  const [enrollmentData, setEnrollmentData] = useState({
    total_enrollments: 0,
    enrollment_data: [],
  });

  useEffect(() => {
    // Fetch the enrollments data
    const fetchEnrollmentData = async () => {
      try {
        const response = await analyticsService.getEnrollmentAnalytics(course.id);
        setEnrollmentData(dummyData);
      } catch (error) {
        console.error(error);
      }
    };

    if (course) {
      fetchEnrollmentData();
    }
  }, [course]);

  const maxCount = Math.max(
    ...enrollmentData.enrollment_data.map((item) => item.count),
    1
  );
  const numDataPoints = enrollmentData.enrollment_data.length;

  const columnWidth = numDataPoints < 10 ? '50%' : '30%';
  const yaxisMax = maxCount + Math.ceil(maxCount * 0.1); // Add 10% padding to the max value
  const tickAmount = maxCount < 10 ? maxCount : 10; // Use up to 10 ticks for large values

  const chartData = {
    series: [
      {
        name: 'Enrollments',
        data: enrollmentData.enrollment_data.map((item) => ({
          x: new Date(item.enrollment_date),
          y: item.count,
        })),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: columnWidth,
          endingShape: 'flat', // Ensures bars have flat ends
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yaxis: {
        title: {
          text: 'Enrollments',
        },
        min: 0,
        max: yaxisMax, // Set the maximum y-axis value dynamically
        tickAmount: tickAmount, // Ensure there are a reasonable number of ticks
        labels: {
          formatter: function (val) {
            return Math.floor(val); // Ensure the labels are integers
          },
        },
      },
    },
  };

  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Enrollments data
        </Typography>
        <Typography>Total enrollments: {enrollmentData.total_enrollments}</Typography>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type='bar'
          height={350}
        />
      </Box>
    )
  );
}

export default EnrollmentsTab;
