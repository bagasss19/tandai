import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import Swal from 'sweetalert2'

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
    const [description, setdescripion] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalTrainingIsOpen, setModalTraining] = useState(false);
    const [file, setFile] = useState(null)
    const [file2, setFile2] = useState(null)
    const [title, settitle] = useState(null)
    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeTrainingModal() {
        setModalTraining(false)
    }

    const uploadFile = (event) => {
        setFile(event.target.files[0])
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

    const submit = () => {
        setloading(true)
        const input = new FormData();
        input.append('title', title)
        input.append('modelml_url', file)
        input.append('description', description)
        axios({
            url: 'model/',
            method: 'post',
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.token
            },
            data: input
        })
            .then(function (response) {
                // handle success
                Swal.fire({
                    title: 'Success!',
                    text: 'Add Model Success',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                getModel()
                closeModal()
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
        setloading(true)
        axios({
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

            <button className="button is-black"
                style={{ marginBottom: "30px", marginTop: '30px' }}
                onClick={openModal}
            >
                Add Model</button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AiFillCloseCircle onClick={closeModal}
                    style={{ cursor: "pointer", position: "relative", marginLeft: "600px", marginTop: "1px" }} />

                <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                    style={{ textAlign: "center", marginBottom : "20px" }}>Add Model</h2>
                {/* <div style={{ textAlign: "center" }}>Title</div> */}
                <form style={{ margin: "auto", width: "30%" }} encType="multipart/form-data" onSubmit={(e) => {
                    e.preventDefault()
                    submit()
                }}>
                    <input className="input is-dark is-rounded  " type="text" placeholder="Title" onChange={e => { settitle(e.target.value) }} />

                    <input className="input is-dark is-rounded" type="text" placeholder="Description" onChange={e => { setdescripion(e.target.value) }} style={{ marginTop: "20px" }} />
                    {/* UPLOAD FILE */}

                    <div className="file is-small" style={{ marginLeft: "30px", marginTop: "20px" }}>
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
                    <button className="button is-black" style={{ marginLeft: "60px", marginTop: "10px" }}>Add</button>
                </form>
            </Modal>

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

            <table className="table is-hoverable is-fullwidth" style={{ marginTop: "50px", marginLeft: "50px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {model.map((x) => (
                        <tr key={x.id}>
                            <td>{x.id}</td>
                            <td>{x.title}</td>
                            <td>{x.description}</td>
                            <td><button className="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                setModalTraining(true)
                            }}>Train</button>
                                <button className="button is-dark" style={{ marginLeft: "5px" }} onClick={(e) => {
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