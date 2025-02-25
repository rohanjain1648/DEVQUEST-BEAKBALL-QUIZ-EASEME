import React from 'react';
import { Pie } from 'react-chartjs-2';

const Statistics = ({ performanceData }) => {
  const data = {
    labels: performanceData.map(item => item.category),
    datasets: [
      {
        data: performanceData.map(item => item.score),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h2>Category-wise Performance</h2>
      <Pie data={data} />
    </div>
  );
};

export default Statistics;
