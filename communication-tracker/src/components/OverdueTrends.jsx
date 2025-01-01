import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OverdueTrends = () => {
  const [overdueData, setOverdueData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();

    axios
      .get('http://localhost:5000/api/calendar/')
      .then((response) => {
        const data = response.data;

        // Filter overdue communications
        const overdue = data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate < currentDate && item.status.toLowerCase() === 'scheduled';
        });

        // Group by company and count overdue communications per day
        const groupedData = overdue.reduce((acc, item) => {
          const company = item.companyName;
          const date = new Date(item.date).toISOString().split('T')[0]; // Format as YYYY-MM-DD

          if (!acc[company]) {
            acc[company] = {};
          }
          if (!acc[company][date]) {
            acc[company][date] = 0;
          }

          acc[company][date] += 1;
          return acc;
        }, {});

        setOverdueData(groupedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Prepare chart data
  const companies = Object.keys(overdueData);
  const allDates = Array.from(
    new Set(
      companies.flatMap((company) => Object.keys(overdueData[company]))
    )
  ).sort();

  const chartData = {
    labels: allDates,
    datasets: companies.map((company, index) => ({
      label: company,
      data: allDates.map((date) => overdueData[company][date] || 0),
      borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 70%)`,
      tension: 0.3,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Overdue Communication Trends',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Overdue Communications',
        },
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Overdue Communication Trends</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default OverdueTrends;
