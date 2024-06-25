import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import analyticsService from '../../../../features/teaching/analyticsService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Generating dummy data for active users
const generateData = (numRecords, maxValue) => {
  const data = [];
  let currentDate = new Date('2022-05-23');

  for (let i = 0; i < numRecords; i++) {
    data.push({
      date: currentDate.toISOString().split('T')[0],
      active_users: Math.floor(Math.random() * (maxValue + 1)),
    });

    // Increment the date by 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const allData = generateData(365 * 2, 2000);

const groupDataByDay = (data) => data;

const groupDataByWeek = (data) => {
  const result = [];
  let weekSum = 0;
  let weekCount = 0;
  let currentDate = new Date(data[0].date);
  let weekStart = new Date(currentDate);

  data.forEach((item) => {
    const date = new Date(item.date);
    if (date - currentDate >= 7 * 24 * 60 * 60 * 1000) {
      result.push({
        date: `Week ${
          Math.ceil((weekStart.getDate() - 1) / 7) + 1
        }, ${weekStart.toLocaleString('default', {
          month: 'short',
        })} '${weekStart.getFullYear().toString().slice(-2)}`,
        active_users: Math.round(weekSum / weekCount),
      });
      weekSum = item.active_users;
      weekCount = 1;
      currentDate = date;
      weekStart = new Date(currentDate);
    } else {
      weekSum += item.active_users;
      weekCount += 1;
    }
  });

  if (weekCount > 0) {
    result.push({
      date: `Week ${
        Math.ceil((weekStart.getDate() - 1) / 7) + 1
      }, ${weekStart.toLocaleString('default', {
        month: 'short',
      })} ${weekStart.getFullYear()}`,
      active_users: Math.round(weekSum / weekCount),
    });
  }

  return result;
};

const groupDataByMonth = (data) => {
  const result = [];
  let monthSum = 0;
  let monthCount = 0;
  let currentMonth = new Date(data[0].date).getMonth();
  let monthStart = new Date(data[0].date);

  data.forEach((item) => {
    const date = new Date(item.date);
    if (date.getMonth() !== currentMonth) {
      result.push({
        date: `${monthStart.toLocaleString('default', {
          month: 'short',
        })}, ${monthStart.getFullYear()}`,
        active_users: Math.round(monthSum / monthCount),
      });
      monthSum = item.active_users;
      monthCount = 1;
      currentMonth = date.getMonth();
      monthStart = new Date(date);
    } else {
      monthSum += item.active_users;
      monthCount += 1;
    }
  });

  if (monthCount > 0) {
    result.push({
      date: `${monthStart.toLocaleString('default', {
        month: 'short',
      })}, ${monthStart.getFullYear()}`,
      active_users: Math.round(monthSum / monthCount),
    });
  }

  return result;
};

const filterAndGroupData = (data, range) => {
  const now = new Date();
  let startDate;
  let groupFn = groupDataByDay;

  switch (range) {
    case '1M':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '3M':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 3);
      groupFn = groupDataByWeek;
      break;
    case '1Y':
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1);
      groupFn = groupDataByMonth;
      break;
    case 'ALL':
    default:
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 2);
      groupFn = groupDataByMonth;
      break;
  }

  const filteredData = data.filter((item) => new Date(item.date) >= startDate);
  return groupFn(filteredData);
};

function ActiveUsersLineChart() {
  const [range, setRange] = useState('1M');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { course } = useSelector((state) => state.teaching.edit);

  useEffect(() => {
    const fetchActiveUsersData = async () => {
      try {
        const response = await analyticsService.getActiveUsersAnalytics(course.id);
        setData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch active users data');
      }
    };

    if (course) fetchActiveUsersData();
  }, [course]);

  useEffect(() => {
    setFilteredData(filterAndGroupData(data, range));
  }, [data, range]);

  const chartData = {
    series: [
      {
        name: range === '1M' ? 'Active Users' : 'Average Daily Active Users',
        data: filteredData.map((item) => ({ x: item.date, y: item.active_users })),
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        width: '100%',
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      xaxis: {
        type: range === '1M' ? 'datetime' : 'category', // Change to 'category' to handle custom formatted dates
        title: {
          text: 'Date',
        },
        labels: {
          rotate: -45, // Rotate labels for better readability
          formatter: function (val, timestamp) {
            if (range === '1M') {
              return new Date(val).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              }); // Default formatting for '1M'
            }
            return val; // Keep custom formatting for others
          },
        },
      },
      yaxis: {
        title: {
          text: 'Active Users',
        },
        min: 0,
        labels: {
          formatter: function (val) {
            return Math.floor(val); // Ensure the labels are integers
          },
          showDuplicates: false, // Hide duplicate labels
        },
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 3, // Reduce marker size
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
        title: {
          formatter: function (seriesName) {
            return seriesName === 'Active Users'
              ? 'Active Users'
              : 'Average Daily Active Users';
          },
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              height: 300,
            },
            xaxis: {
              labels: {
                rotate: 0,
              },
            },
          },
        },
      ],
    },
  };

  return (
    <Box sx={{ py: 2, mt: 2 }}>
      <Typography variant='h5' sx={{ mb: 2 }} textAlign='center'>
        Active Users Over Time
      </Typography>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel>Time Range</InputLabel>
        <Select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          label='Time Range'
        >
          <MenuItem value='1M'>Last 30 Days</MenuItem>
          <MenuItem value='3M'>Last 3 Months</MenuItem>
          <MenuItem value='1Y'>Last Year</MenuItem>
          <MenuItem value='ALL'>All Time</MenuItem>
        </Select>
      </FormControl>
      <Box width='100%'>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type='line'
          height={350}
          width='100%'
        />
      </Box>
    </Box>
  );
}

export default ActiveUsersLineChart;
