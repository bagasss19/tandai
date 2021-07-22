import React from 'react'
import { Line } from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";
// import Axios from '../config/axios'
// import {
//     Link,
// } from "react-router-dom";

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: '#Daily API Usage',
        data: [120, 119, 113, 115, 112, 113, 112],
        backgroundColor: 'rgb(20, 20, 20)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

export default function Home() {
    return (
        <>
            <h1 className="title is-4">Welcome, {localStorage.username} !</h1>
            
            <div style={{marginLeft : "400px", width : "300px"}}>
            <Line data={data} height={300} options={options} />

            <h1 className="title is-4">API Usage</h1>
            <ProgressBar completed={60} />
        </div>
        </>
        )
}

