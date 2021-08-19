import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import {
  Link,
} from "react-router-dom";
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"

Modal.setAppElement('#root');
const customStyles = {
  content: {
    position: "absolute",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: "50%",
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "white"
  },
}

export default function Home() {
  const [paket, setpaket] = useState(null)
  const [loading, setloading] = useState(true)
  const [model, setmodel] = useState(null)
  const [word, setword] = useState("")
  const [answer, setanswer] = useState(null)
  const [isFile, setisFile] = useState(false)
  const [file, setFile] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false);


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

  function add() {
    setloading(true)
    Axios({
      url: 'user/model',
      method: 'post',
      headers: {
        "Authorization": localStorage.token
      },
      data: { word }
    })
      .then(function (response) {
        // handle success
        console.log(response.data, "response<<<<<<<<<<< SUKSES GAKKKKKK")
        // setanswer(response.data.sentiment)
        setloading(false)
        Swal.fire({
          title: 'Success!',
          text: response.data.sentiment,
          icon: 'success',
          confirmButtonText: 'Close'
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#000000';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function addFile() {
    setloading(true)
    const input = new FormData();
    input.append('file', file)
    Axios({
      url: 'user/file',
      method: 'put',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": localStorage.token
      },
      data: input
    })
      .then(function (response) {
        // handle success
        setanswer(response.data.data)
        setloading(false)
        openModal()
      })
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

  const uploadFile = (event) => {
    setFile(event.target.files[0])
    console.log(file)
  };


  if (loading) {
    return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
      style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
  }

  return (
    <>
      <h1 className="title is-2 is-family-code" style={{ marginTop: "20px", textAlign : "center", marginLeft : "100px" }}>Welcome, {localStorage.username} !</h1>

      <div className="columns" style={{ marginTop: "5px" }} >
        {/* <div className="column" style={{position : "relative"}} >
          <div style={{ marginLeft: "150px", width: "250px" }}>
            <Line data={data} height={250} options={options} />
            <br></br>
          </div>
        </div> */}

        <div className="column" style={{ marginLeft: "100px" }}>
          <div className="card" style={{ height: "250px" }}>
            <header className="card-header">
              <p className="card-header-title">
                Api Usage
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <ProgressBar completed={Math.round(paket.usage / paket.limit * 100)} labelColor="black" />
                <br></br>
                <p>{JSON.stringify(paket.usage)} / {JSON.stringify(paket.limit)} Used</p>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                Subscription Info
              </p>
            </header>
            <div className="card-content">
              <div className="content" style={{ height: "105px" }}>
                Package : {paket.package_name} <br></br>
                API Limit : {JSON.stringify(paket.limit)}<br></br>
                <time dateTime="2016-1-1">31 Dec 21</time>
              </div>
            </div>
            <footer className="card-footer">
              {/* <a href="/#" className="card-footer-item">Purchase</a> */}
              <Link to="/package" className="card-footer-item">Info</Link>
              {/* <a href="#" className="card-footer-item">Delete</a> */}
            </footer>
          </div>
        </div>

        <div className="column">
          <div className="card" style={{ height: "250px", marginRight: "20px" }}>
            <header className="card-header">
              <p className="card-header-title">
                API Testing
              </p>

              <div className="select is-dark is-small" style={{ marginTop: "10px", marginRight: "5px" }}>
                <select
                  defaultValue={isFile}
                  onChange={(e) => {
                    if (e.target.value === 'false') {
                      setisFile(false)
                    } else {
                      setisFile(true)
                    }
                  }}>
                  <option value="false" >Simple Word</option>
                  <option value="true" >Upload File</option>
                </select>
              </div>

            </header>
            <div className="card-content" >
              <div className="content" >
                <div className="select is-dark">
                  <select>
                    <option>Select Model (Default)</option>
                    {model.map((x) => {
                      return <option value={x.id} key={x.id}>{x.title}</option>
                    })}
                  </select>
                </div>

                {isFile ?

                  <form className="form" style={{ width: "50%", margin: "auto", marginTop: "10px" }}
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                      e.preventDefault()
                      addFile()
                    }}>

                    <div className="file is-small" style={{ marginTop: "10px", marginLeft: "23px" }}>
                      <label className="file-label">
                        <input className="file-input" type="file" name="resume" onChange={uploadFile} />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">
                            Choose a file…
                          </span>
                        </span>
                      </label>
                    </div>

                    <button className="button is-primary" type="submit" style={{ marginTop: "10px" }}>Submit</button>

                    {/* <h1 className="is-size-6 is-family-code" style={{ marginTop: "5px" }}></h1> */}
                  </form>
                  :

                  <form className="form" style={{ width: "100%", margin: "auto", marginTop: "10px" }}
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                      e.preventDefault()
                      add()
                    }
                    }>

                    <div className="field">
                      <input className="input" type="text" name="Word" defaultValue={word}
                        style={{ marginBottom: "3px" }}
                        placeholder="Input your words here" onChange={e => setword(e.target.value)} />
                    </div>

                    <button className="button is-primary" type="submit">Submit</button>

                    {/* <h1 className="is-size-6 is-family-code" style={{ marginTop: "5px" }}>{answer}</h1> */}
                  </form>

                }
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AiFillCloseCircle onClick={closeModal}
            style={{ cursor: "pointer", position: "relative", marginLeft: "600px", marginTop: "1px" }} />

          {answer ? <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Words</th>
                <th>Sentiment</th>
              </tr>
            </thead>

            <tbody>
              {answer.map((x) => (
                <tr key={x.id}>
                  <td>{x.word}</td>
                  <td>{x.sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table> : answer }

        </Modal>

      </div>

      <div className="card" style={{ marginLeft: "100px", marginRight: "20px" }}>
        <header className="card-header">
          <p className="card-header-title">
            Recent Model
          </p>
        </header>
        <div className="card-content">
          <div className="content" style={{ height: "150px" }}>
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Update Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {model.map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.title}</td>
                    <th>{x.description}</th>
                    <th>{x.created}</th>
                    <td><button className="button is-danger" onClick={(e) => {
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

      {/* </div> */}
      {/* </div> */}
    </>
  )
}

