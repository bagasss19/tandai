import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
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
  const [paket, setpaket] = useState(null)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    Axios({
      url: `user/${localStorage.id}`,
      method: 'get',
      headers: {
          "Authorization" : localStorage.token
      }
  })
      .then(function (response) {
          console.log(response.data, "response<<<<<<<<<<<")
          setpaket(response.data)
          setloading(false)
      })
  }, [])

  if (loading) {
    return( <ReactLoading type={'bars'} color={"black"} height={167} width={75} 
    style={{margin : "auto", width : "50%"}}/>)
  }

  return (
    <>
      <h1 className="title is-4" style={{marginTop : "50px"}}>Welcome, {localStorage.username} !</h1>

      <div className="columns" style={{marginTop : "100px"}} >
        <div className="column" style={{position : "relative"}} >
          <div style={{ marginLeft: "150px", width: "250px" }}>
            <Line data={data} height={250} options={options} />
            <br></br>
          </div>
        </div>
        <div className="column">
          <div className="card" style={{ width: "300px", marginLeft : "50px" }}>
            <div className="card-content">
              <h1 className="title is-4">API Usage</h1>
              <div className="content" style={{ height: "150px" }}>
                <ProgressBar completed={paket.usage / paket.limit * 100}/>
                <br></br>
                <p>{JSON.stringify(paket.usage)} / {JSON.stringify(paket.limit)} Used</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card" style={{ width: "300px" }}>
            <div className="card-content">
              <div className="content" style={{ height: "150px" }}>
                <h1 className="title is-4">Subscription Info</h1>
                Package : {paket.package_name} <br></br>
                API Limit : {JSON.stringify(paket.limit)}


                <br></br>
                <time datetime="2016-1-1">31 Dec 21</time>
              </div>
            </div>
            <footer className="card-footer">
              <a href="/#" className="card-footer-item">Purchase</a>
              <a href="/#" className="card-footer-item">Info</a>
              {/* <a href="#" className="card-footer-item">Delete</a> */}
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

