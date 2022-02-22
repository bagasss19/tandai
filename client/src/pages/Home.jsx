import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import GetStart from '../components/GettingStarted/GettingStarted'
import { BiHelpCircle } from "react-icons/bi";
import "../components/GettingStarted/Modal.css"

import {
  Link,
} from "react-router-dom";


export default function Home() {
  const [paket, setpaket] = useState(null)
  const [loading, setloading] = useState(true)
  const [model, setmodel] = useState(null)
  const [modalOpen,setModalOpen] = useState(localStorage.started_home=="true"?true:false)
  

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
        setmodel(response.data.data)
        setloading(false)
      })
  }

  const getChangesStarted = () => {
    if (localStorage.started_home=='true'){
      Axios({
        url: 'user/started/home/' + localStorage.id,
        method: 'get',
        headers: {
          "Authorization": localStorage.token
      }
      })
        .then(function (){
          localStorage.started_home = false;
          setModalOpen(false)
          setloading(false)
          Swal.fire({
            title: 'Success!',
            text: 'You Already know use this page',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        })
    } else {
      setModalOpen(false)
    }
    
  }


  const deleteModel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
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
    })
  }



  useEffect(() => {

    const interval = setInterval(() => {

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

      console.log('Every 3 seconds');
    }, 3000);

    return () => clearInterval(interval);
  }, [])

  if (loading) {
    return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
      style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
  }

  return (
    <>
    {
    modalOpen?
    <div className="modal-backdrop">
      <GetStart/>
      <span className="button" onClick={()=>setModalOpen(false)} style={{color:"white",backgroundColor:"#333333",marginTop:"650px",marginLeft:"-430px",position:"fixed", border:"none"}} > Skip </span>
      <span className="cbutton" onClick={()=>getChangesStarted()} style={{color:"white",backgroundColor:"#2DAA72",marginTop:"650px",marginLeft:"350px", border:"none"}} > FINISH </span>

    </div>

    :
    null
    }
      <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>Welcome, {localStorage.username} !</h1>
      <div className="columns" style={{ marginTop: "50px" }} >
        <div className="column is-two-thirds">
          <div className="card" style={{ marginLeft: "40px", height: "400px" ,position:"static"}}>
            <header className="card-header" style={{backgroundColor : "#F0F7F4"}}>
              <p className="card-header-title">
                Model List
              </p>
            </header>
            <div className="card-content">
              <div className="content" style={{ height: "150px", textAlign: "left" }}>
                <table className="table is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>Model ID</th>
                      <th>Model Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {model.map((x) => (
                      <tr key={x.id}>
                        <td>{x.model_ID}</td>
                        <td>{x.model_name}</td>
                        <th>
                          {(() => {
                            switch (x.status) {
                              case "0": return <span className="tag is-warning is-medium">On Progress</span>
                              case "1": return <span className="tag is-success is-medium">Ready</span>
                              default: return <span className="tag is-danger is-medium">Error</span>
                            }
                          })()}
                        </th>
                        <td>
                        <Link to={`/detail/${x.id}`}><button className="button" style={{ color: "white", backgroundColor : "#1D8C59", position:"static" }}>Detail</button></Link>
                          <Link to={`/test/${x.id}`}><button className="button" style={{ color: "white", backgroundColor : "#1D8C59", position:"static" }}>Test</button></Link>
                          <Link to={`/train/${x.id}`}><button className="button" style={{ marginLeft: "5px", color: "white", backgroundColor : "#1D8C59", position:"static" }}>Train</button></Link>
                          {(() => {
                            switch (x.model_ID) {
                              case "lstmw07": return <button title="this is your default model!"  className="button" style={{ marginLeft: "5px", backgroundColor : "#D5D5D5" , position:"static"}} onClick={(e) => {

                              }}>Delete</button>
                              case "lstmw13": return <button title="this is your default model!"  className="button" style={{ marginLeft: "5px", backgroundColor : "#D5D5D5" , position:"static" }} onClick={(e) => {

                              }}>Delete</button>
                              default: return <button className="button" style={{ marginLeft: "5px", backgroundColor : "#CB3A31", color : "white" , position:"static"}} onClick={(e) => {
                                e.preventDefault()
                                deleteModel(x.id)
                              }}>Delete</button>
                            }
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="column" style={{ marginLeft: "10px", marginRight: "40px" }}>
          <div className="card" style={{ height: "400px" ,position:"static"}}>
            <header className="card-header" style={{backgroundColor : "#F0F7F4"}}>
              <p className="card-header-title">
                Usage
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <div style={{ marginTop: "-20px" }}></div>
                <p className="is-size-6 has-text-weight-bold" style={{ textAlign: "left" }}>API Usage</p>
                <p style={{ textAlign: "left" }}>{JSON.stringify(paket.usage)} / {paket.limit === 999999999 ? "∞" : JSON.stringify(paket.limit)} Used</p>
                {paket.limit === 999999999 ? <ProgressBar completed="∞" labelColor="black" bgColor="linear-gradient(to bottom right,   #23a96f, #006d3e)" labelAlignment="center" /> : <ProgressBar completed={Math.round(paket.usage / paket.limit * 100)} labelColor="black" bgColor="#23a96f" labelAlignment="center" />}

                <br></br>

                <p className="is-size-6 has-text-weight-bold" style={{ textAlign: "left" }}>Transfer Learning Usage</p>
                <p style={{ textAlign: "left" }}>{JSON.stringify(paket.TF_usage)} / {JSON.stringify(paket.TF_limit)} Used</p>
                <ProgressBar completed={Math.round(paket.TF_usage / paket.TF_limit * 100)} labelColor="black" bgColor="#23a96f" labelAlignment="left" />
                <br></br>
                <div className="columns">
                  <div className="column">
                    <span className="icon-text">
                      <span className="icon" style={{ width: "50px" }}>
                        <progress className="progress is-success is-small" value="100" max="100">Used</progress>
                      </span>
                      <span>Used</span>
                    </span>
                  </div>

                  <div className="column">
                    <span className="icon-text">
                      <span className="icon" style={{ width: "50px" }}>
                        <progress className="progress is-success is-small" value="0" max="100">Left</progress>
                      </span>
                      <span>Left</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:"100px",marginLeft:"1300px"}}>
        <button className='button' onClick={()=>setModalOpen(true)} style={{border:"none" , position:"static"}} ><BiHelpCircle size={30} marginLeft="100px" color="#1A8856"/></button>   
        </div>
    </>
  )
}

