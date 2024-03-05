import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const labels = ['July', 'August', 'September', 'October', 'November', 'December', 'January'];

const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: [37.15,37,29.91,30.5,39,41.55,43.02],
        borderColor: '#3e51f5', //'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', //'rgba(255, 99, 132, 0.5)',
        pointRadius: 5,
        pointBackgroundColor: '#3e51f5',
        fill: true
      },
      /*
      {
        label: 'Dataset 2',
        data: [150,250,350,450,550,650,750],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },*/
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        color: 'rgb(33 81 245)'
      },
      title: {
        display: false, //true,
        text: 'GD30D',
      },
    },
    scales: {
        y: {
            
            //border:{dash: [4, 4]}, // for the grid lines
            grid: {
                color: 'rgba(255, 99, 132, 0)',
                /*
                color: '#aaa', // for the grid lines
                tickColor: '#000', // for the tick mark
                tickBorderDash: [2, 3], // also for the tick, if long enough
                tickLength: 10, // just to see the dotted line
                tickWidth: 2,
                offset: true,
                drawTicks: true, // true is default 
                drawOnChartArea: true // true is default 
                */
            },
            ticks: {
              color: '#FFFFFF',
            },
            //beginAtZero: true,
            
           //display: false
        },
        x: {
            grid: {
                color: 'rgba(255, 99, 132, 0)'
            },
            ticks: {
              color: '#FFFFFF',
            },
            //display: false
        }
    },
  };

const CustomChart = () => {
    return <Line options={options} data={data} />
}

export default CustomChart;