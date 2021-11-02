import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import Swal from 'sweetalert2'
import {
    Link,
} from "react-router-dom";

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
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function Model() {
    const [loading, setloading] = useState(true)
    const [model, setmodel] = useState(null)
    const [modalTrainingIsOpen, setModalTraining] = useState(false)
    const [file2, setFile2] = useState(null)
    let subtitle;

    // function openModal() {
    //     setIsOpen(true);
    // }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000000';
    }


    function closeTrainingModal() {
        setModalTraining(false)
    }

    const uploadFile2 = (event) => {
        setFile2(event.target.files[0])
    }

    const getModel = () => {
        axios({
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

    const submitTraining = () => {
        setloading(true)
        const input = new FormData()
        input.append('file', file2)
        Axios({
            url: 'http://49.12.45.104:8000/upload',
            method: 'post',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: input
        })
            .then(function (response) {
                // handle success
                Swal.fire({
                    title: 'Success!',
                    text: 'Upload File Success',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                getModel()
                closeTrainingModal()
                setloading(false)
            })
            .catch(function (response) {
                // handle success
                Swal.fire({
                    title: 'Error!',
                    text: 'Upload File Failed!',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            })
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
        getModel()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }
    return (
        <div>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Model List</h1>
            <Modal
                isOpen={modalTrainingIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeTrainingModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AiFillCloseCircle onClick={closeTrainingModal}
                    style={{ cursor: "pointer", position: "relative", marginLeft: "600px", marginTop: "1px" }} />

                <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                    style={{ textAlign: "center" }}>Add Dataset</h2>
                <form style={{ margin: "auto", width: "30%" }} encType="multipart/form-data" onSubmit={(e) => {
                    e.preventDefault()
                    submitTraining()
                }}>
                    {/* UPLOAD FILE */}

                    <div className="file is-small" style={{ marginLeft: "30px", marginTop: "20px" }}>
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange={uploadFile2} />
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
                    <button className="button is-black" style={{ marginLeft: "60px", marginTop: "10px" }}>Add</button>
                </form>
            </Modal>

            <table className="table is-hoverable" style={{ marginTop: "50px", marginLeft: "100px", width: "90%" }}>
                <thead>
                    <tr>
                        <th>Model ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {model.map((x) => (
                        <tr key={x.id}>
                            <td>{x.model_ID}</td>
                            <th>
                                {(() => {
                                    switch (x.status) {
                                        case "0": return <span className="tag is-warning is-medium">Progress</span>
                                        case "1": return <span className="tag is-success is-medium">Success</span>
                                        default: return <span className="tag is-danger is-medium">Error</span>
                                    }
                                })()}
                            </th>
                            <td>
                                <Link to={`/test/${x.id}`}><button className="button Mainkolor" style={{ color: "white" }}>Test</button></Link>
                                <Link to={`/train/${x.id}`}><button className="button Mainkolor" style={{ marginLeft: "5px", color: "white" }}>Train</button></Link>
                                <button className="button is-danger" style={{ marginLeft: "5px" }} onClick={(e) => {
                                    e.preventDefault()
                                    deleteModel(x.id)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}