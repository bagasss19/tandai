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

      <div class="columns">
        <div class="column">
          <div style={{ marginLeft: "150px", width: "300px" }}>
            <Line data={data} height={300} options={options} />
            <br></br>
          </div>
        </div>
        <div class="column">
          <div class="card" style={{ width: "300px" }}>
            <div class="card-content">
              <h1 className="title is-4">API Usage</h1>
              <div class="content">
                <ProgressBar completed={60} />
                <br></br>
                <p>60 /100 Used</p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card" style={{ width: "300px" }}>
            <div class="card-content">
              <div class="content">
                <h1 className="title is-4">Subscription Info</h1>
                Package : Gold <br></br>
                API Limit : 1.000


                <br></br>
                <time datetime="2016-1-1">31 Dec 21</time>
              </div>
            </div>
            <footer class="card-footer">
              <a href="/#" class="card-footer-item">Purchase</a>
              <a href="/#" class="card-footer-item">Info</a>
              {/* <a href="#" class="card-footer-item">Delete</a> */}
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

