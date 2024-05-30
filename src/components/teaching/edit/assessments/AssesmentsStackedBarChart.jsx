import { Box, Typography } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';

const AssesmentsStackedBarChart = ({ data }) => {
  const categories = data.map(
    (stat) => `${stat.lesson_title} - ${stat.step_type} - Step ${stat.step_order}`
  );
  const totalAttempts = data.map((stat) => stat.total_attempts);
  const successRates = data.map((stat) => stat.success_rate);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: true,
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
        formatter: function (val) {
          const maxLength = 15;
          return val.length > maxLength ? val.substring(0, maxLength) + '...' : val;
        },
      },
    },
    yaxis: {
      title: {
        text: 'Attempts',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
      x: {
        show: true,
        formatter: function (val, { dataPointIndex }) {
          return categories[dataPointIndex];
        },
      },
    },
  };

  const series = [
    {
      name: 'Total Attempts',
      data: totalAttempts,
    },
    {
      name: 'Success Rate',
      data: successRates,
    },
  ];

  return (
    <Box>
      <Typography variant='h6' textAlign='center' gutterBottom>
        Assessments Performance
      </Typography>
      <Box minHeight={400}>
        <Chart options={options} series={series} type='bar' height='100%' />
      </Box>
    </Box>
  );
};

export default AssesmentsStackedBarChart;
