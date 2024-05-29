import React from 'react';
import Chart from 'react-apexcharts';

const AssessmentDistributionChart = ({ data }) => {
  const key =
    data.quiz_statistics.length +
    data.code_challenge_statistics.length +
    data.sorting_problem_statistics.length +
    data.text_problem_statistics.length;
  const series = [
    data.quiz_statistics.length,
    data.code_challenge_statistics.length,
    data.sorting_problem_statistics.length,
    data.text_problem_statistics.length,
  ];

  const options = {
    labels: ['Quizzes', 'Code Challenges', 'Sorting Problems', 'Text Problems'],
    chart: {
      type: 'pie',
    },
  };

  return <Chart options={options} series={series} type='pie' key={key} />;
};

export default AssessmentDistributionChart;
