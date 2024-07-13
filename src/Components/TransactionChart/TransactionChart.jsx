import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Data } from '../../db';

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function TransactionChart({ customerId }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (customerId) {
      const response = Data.transactions.filter(transaction => transaction.customer_id === customerId);
          const data = response.reduce((acc, transaction) => {
            const date = formatDate(transaction.date); 
            acc[date] = (acc[date] || 0) + transaction.amount;
            return acc;
          });
         const {id,customer_id,date,amount,...res}=data;
          setChartData({
            labels: Object.keys(res),
            datasets: [
              {
                label: 'Total Amount',
                data: Object.values(res),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          })
        
        
    }
    }
  , [customerId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Ensure chartData has labels and datasets before rendering
  const shouldRenderChart = chartData.labels && chartData.datasets;

  return (
    <div className='container d-flex justify-content-center pb-5'>
      {shouldRenderChart ? (
        <Line data={chartData} 
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
              type: 'category', // Ensure x-axis is treated as categorical
            },
            y: {
              title: {
                display: true,
                text: 'Total Amount',
              },
            },
          },
        }}
        
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TransactionChart;
