import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Report.css';
import OverdueTrends from './OverdueTrends';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://calendar-application-for-communication-63gi.onrender.com/api/report/communication-frequency')
      .then((response) => {
        const fetchedData = response.data;

        // Add success ratio dynamically
        const totalAttempts = {
          "LinkedIn Post": 5,
          "Phone Call": 5,
          "Email": 5,
          "LinkedIn": 5,
          "Message": 5,
          "Other": 5,
        };

        const dataWithSuccessRatio = Object.entries(fetchedData).reduce(
          (acc, [key, frequency]) => {
            const successRatio = totalAttempts[key]
              ? Math.round((frequency / totalAttempts[key]) * 100)
              : 0;
            acc[key] = { frequency, successRatio };
            return acc;
          },
          {}
        );

        setData(dataWithSuccessRatio);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Prepare data for frequency chart
  const frequencyData = {
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        label: 'Frequency',
        data: data ? Object.values(data).map((item) => item.frequency) : [],
        backgroundColor: '#4e73df',
        borderColor: '#4e73df',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for success ratio chart
  const successRatioData = {
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        label: 'Success Ratio (%)',
        data: data ? Object.values(data).map((item) => item.successRatio) : [],
        backgroundColor: '#1cc88a',
        borderColor: '#1cc88a',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Engagement Effectiveness Dashboard',
      },
      legend: {
        position: 'top',
      },
    },
  };

  // Generate PDF with charts and data
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Engagement Effectiveness Report', 20, 20);

    // Add Communication Frequency chart
    doc.addPage();
    doc.setFontSize(12);
    doc.text('Communication Frequency', 20, 30);
    const frequencyChart = document.getElementById('frequencyChart');
    doc.addImage(frequencyChart, 'PNG', 20, 40, 160, 100);

    // Add Success Ratio chart
    doc.addPage();
    doc.text('Success Ratio', 20, 30);
    const successRatioChart = document.getElementById('successRatioChart');
    doc.addImage(successRatioChart, 'PNG', 20, 40, 160, 100);

    // Add Overdue Trends section
    doc.addPage();
    doc.text('Overdue Communications', 20, 30);
    // Add your overdue communications content here
    doc.text('Example overdue communications details', 20, 40); // Add dynamic content as needed

    // Save the PDF
    doc.save('engagement_report.pdf');
  };

  return (
    <div className="report-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="chart">
            <h3>Communication Frequency</h3>
            <Bar id="frequencyChart" data={frequencyData} options={chartOptions} />
          </div>
          <div className="chart">
            <h3>Success Ratio</h3>
            <Bar id="successRatioChart" data={successRatioData} options={chartOptions} />
          </div>

          <button onClick={downloadPDF} className="download-btn">
            Download PDF
          </button>
        </>
      )}

      <OverdueTrends />
    </div>
  );
};

export default Report;
