import React, { useState, useEffect } from 'react'
import { FaUpload } from "react-icons/fa";
import Axios from '../config/axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
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

export default function Train() {
    const [isFile, setisFile] = useState(false)
    const [word, setword] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFilename] = useState(null)
    const [loading, setloading] = useState(true)
    const [answer, setanswer] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [model, setmodel] = useState(null)

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

    const uploadFile = (event) => {
        setFile(event.target.files[0])
        setFilename(event.target.files[0].name)
    };

    function openModal() {
        setIsOpen(true);
    }

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

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getModel()
    }, [])

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
                            <option value="false" >Simple</option>
                            <option value="true" >Upload File</option>
                        </select>
                    </div>

                </header>
                <div className="card-content" >
                    <div className="content" >
                        <div className="select is-dark">
                            <select style={{ width: "325px" }}>
                                <option>Base Model</option>
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

                                <div className="file is-small" style={{ marginTop: "10px", marginLeft: "125px" }}>
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="resume" onChange={uploadFile} />
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

                                <button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white" }}>Submit</button>
                            </form>

                        }
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
                    </table> : answer}

                </Modal>

            </div>
        </>
    )
}
