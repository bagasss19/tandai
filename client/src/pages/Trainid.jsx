import React, { useState, useEffect } from 'react'
import { FaUpload } from "react-icons/fa";
import Axios from '../config/axios'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import {
    useParams
} from "react-router-dom";

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

export default function Trainid(props) {
    let { id } = useParams()
    const [file, setFile] = useState(null)
    const [fileName, setFilename] = useState(null)
    const [loading, setloading] = useState(true)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [model, setmodel] = useState(null)

    const postApi = () => {
        setloading(true)
        if (!file) {
            Swal.fire({
                title: 'Error!',
                text: 'Empty file!',
                icon: 'error',
                confirmButtonText: 'Okay'
            })
            setloading(false)
        } else {
            Axios({
                url: 'user/transfer/' + id,
                method: 'get',
                headers: {
                    "Authorization": localStorage.token
                }
            })
                .then(function (response) {
                    // handle success
                    const input = new FormData()
                    input.append('file', file, response.data.filename)
                    axios({
                        url: 'http://52.230.97.84:8000/upload',
                        method: 'post',
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        data: input
                    })
                        .then(function (response) {
                            // handle success
                            console.log(response, "<<<<<<<<<RESPONSEEEEEEEEEEEEE")
                            console.log("SUKSESSSSSSSSSSSSSSSSS")
                            setloading(false)
                            Swal.fire({
                                title: 'Success!',
                                text: 'Upload Model Success',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                        })
                })
        }
    }
    function addFile() {
        setloading(true)
        postApi()
    }

    const uploadFile = (event) => {
        console.log(event.target.files[0].name, "<<<<NAMEEEE")
        console.log(event.target.files[0].name.substr(event.target.files[0].name.length - 3, event.target.files[0].name.length - 1))
        if (event.target.files[0].name.substr(event.target.files[0].name.length - 3, event.target.files[0].name.length - 1) !== 'csv') {
            Swal.fire({
                title: 'Error!',
                text: 'Wrong file input!',
                icon: 'error',
                confirmButtonText: 'Okay'
            })
        } else {
            setFile(event.target.files[0])
            setFilename(event.target.files[0].name)
        }
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        Axios({
            url: 'model/' + id,
            method: 'get',
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                setmodel(response.data[0])
                setloading(false)
            })
    }, [id])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Roboto" }}>Train Model</h1>
            <h1 className="title is-5" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Roboto" }}>Upload file with .csv extention, if success, it will create new model</h1>

            <div className="card" style={{ height: "250px", width: "60%", marginLeft: "300px", marginTop: "50px" }}>
                <header className="card-header">
                    <p className="card-header-title">
                        Train Model
                    </p>

                </header>
                <div className="card-content" >
                    <div className="content" >
                        <div className="select is-dark">
                            <select style={{ width: "325px" }} disabled>
                                <option>{model.title}</option>
                            </select>
                        </div>

                        <form className="form" style={{ width: "50%", margin: "auto", marginTop: "10px" }}
                            encType="multipart/form-data"
                            onSubmit={(e) => {
                                e.preventDefault()
                                addFile()
                            }}>

                            <div className="file is-small" style={{ marginTop: "10px", marginLeft: "125px" }}>
                                <label className="file-label">
                                    <input className="file-input" accept=".csv" type="file" name="resume" onChange={uploadFile} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <FaUpload />
                                        </span>

                                        {fileName ?
                                            <span className="file-label">
                                                {fileName}
                                            </span>
                                            :
                                            <span className="file-label">
                                                Choose a file…
                                            </span>
                                        }
                                    </span>

                                </label>
                            </div>

                            <button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white" }}>Submit</button>
                        </form>
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

                </Modal>

            </div>
        </>
    )
}
