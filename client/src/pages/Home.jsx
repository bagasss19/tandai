import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import {
  Link,
} from "react-router-dom";


export default function Home() {
  const [paket, setpaket] = useState(null)
  const [loading, setloading] = useState(true)
  const [model, setmodel] = useState(null)

  const getModel = () => {
    Axios({
      url: 'model',
      method: 'get',
      headers: {
        "Authorization": localStorage.token
      }
    })
      .then(function (response) {
        // handle success
        setmodel(response.data)
        setloading(false)
      })
  }

  const deleteModel = (id) => {
    setloading(true)
    Axios({
      url: 'model/' + id,
      method: 'delete',
      headers: {
        "Authorization": localStorage.token
      }
    })
      .then(function (response) {
        // handle success
        Swal.fire({
          title: 'Success!',
          text: 'Delete Model Success',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        getModel()
      })
  }

  const generateDate = (date) =>  {
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let second = d.getSeconds()

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return `${day}-${month}-${year} ${hours}:${minutes}:${second}`
  }

  useEffect(() => {
    Axios({
      url: `user/${localStorage.id}`,
      method: 'get',
      headers: {
        "Authorization": localStorage.token
      }
    })
      .then(function (response) {
        setpaket(response.data)
        getModel()
      })
  }, [])

  if (loading) {
    return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
      style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
  }

  return (
    <>
      <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Roboto" }}>Welcome, {localStorage.username} !</h1>


      <div className="columns" style={{ marginTop: "5px" }} >
        <div className="column" style={{ marginLeft: "100px" }}>
          <div className="card" style={{ height: "250px" }}>
            <header className="card-header">
              <p className="card-header-title">
                Api Usage
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <div style={{ marginTop: "30px" }}></div>
                <ProgressBar completed={Math.round(paket.usage / paket.limit * 100)} labelColor="black" bgColor="#23a96f" />
                <br></br>
                <p>{JSON.stringify(paket.usage)} / {JSON.stringify(paket.limit)} Used</p>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card" style={{ height: "250px", marginRight : "20px" }}>

            <header className="card-header">
              <p className="card-header-title">
                Subscription Info
              </p>
            </header>

            <div className="card-content">
              <div className="content"  >
                <div className="columns" style={{ textAlign: "center", marginTop: "10px" }}>

                  <div className="column">
                    <p className="is-size-6 has-text-weight-bold" style={{ marginBottom: "5px" }}>Package</p>
                    {(() => {
                      switch (paket.package_name) {
                        case "free": return <span className="tag is-dark is-medium">Free</span>
                        case "bronze": return <span className="tag is-medium" style={{ backgroundColor: "#ff5100" }}>Bronze</span>
                        case "silver": return <span className="tag is-light is-medium">Silver</span>
                        case "gold": return <span className="tag is-warning is-medium">Gold</span>
                        default: return <h5>Not Confirmed</h5>;
                      }
                    })()}
                  </div>

                  <div className="column">
                    <p className="is-size-6 has-text-weight-bold" style={{ marginBottom: "5px" }}>API Limit</p>
                    <p>{JSON.stringify(paket.limit)}</p>
                  </div>

                  <div className="column">
                    <p className="is-size-6 has-text-weight-bold" style={{ marginBottom: "5px" }}>Expired Date</p>
                    <time dateTime="2016-1-1">31 Dec 21</time>
                  </div>

                </div>
              </div>
            </div>
            <footer className="card-footer">
              {/* <a href="/#" className="card-footer-item">Purchase</a> */}
              <Link to="/package" className="card-footer-item"><button className="button Mainkolor" style={{ color: "white" }}>Upgrade</button></Link>
              {/* <a href="#" className="card-footer-item">Delete</a> */}
            </footer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginLeft: "100px", marginRight: "20px" }}>
        <header className="card-header">
          <p className="card-header-title">
            Model List
          </p>
          
          <Link to="/model"><p className="card-header-title" style={{ textAlign: "end", marginLeft: "900px", color: "#00d1b2" }} >Full model list</p></Link>
        </header>
        <div className="card-content">
          <div className="content" style={{ height: "150px" }}>
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Model ID</th>
                  <th>Description</th>
                  <th>Update Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {model.map((x) => (
                  <tr key={x.id}>
                    <td>{x.title}</td>
                    <th>{x.description}</th>
                    <th>{generateDate(x.created)}</th>
                    <td>
                    <Link to ="/test"><button className="button Mainkolor" style={{ color: "white" }}>Test</button></Link>
                    <Link to={`/train/${x.id}`}><button className="button Mainkolor" style={{ marginLeft: "5px", color: "white" }}>Train</button></Link>
                      <button className="button is-danger" style={{ marginLeft: "5px" }} onClick={(e) => {
                        e.preventDefault()
                        deleteModel(x.id)
                      }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

