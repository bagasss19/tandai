import React, { useState, useEffect } from 'react'
import { FaUpload } from "react-icons/fa";
import Axios from '../config/axios'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import {
    useParams,
    Link
} from "react-router-dom"
import Sample from '../sampletest.csv'
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

export default function Testid() {
    let { id } = useParams()
    const [isFile, setisFile] = useState(false)
    const [word, setword] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFilename] = useState(null)
    const [loading, setloading] = useState(true)
    const [answer, setanswer] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [model, setmodel] = useState(null)
    const [time, settime] = useState(null)

    function add() {
        setloading(true)
        Axios({
            url: 'user/model',
            method: 'post',
            headers: {
                "Authorization": localStorage.token
            },
        })
            .then(function (response) {
                // handle success
                axios({
                    url: 'https://ml.tand.ai/singletext',
                    method: 'post',
                    data: { single_text: word, model_id: model.model_ID, userID: model.model_owner }
                })
                    .then(function (response) {
                        // handle success
                        console.log(response.data, "<<<<<<<<<< RESPONSE")
                        Swal.fire({
                            title: 'Success!',
                            // text: `${response.data.result}`,
                            html: `${response.data.result} <br/> time : ${response.data.detection_time} second(s)`,
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        setloading(false)
                    })
                    .catch(function (response) {
                        // handle success
                        Swal.fire({
                            title: 'Error!',
                            text: response,
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        })
                    })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function addFile(id) {
        setloading(true)
        const input = new FormData();
        input.append('file', file)
        Axios({
            url: 'user/file/' + id,
            method: 'put',
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.token
            },
            data: input
        })
            .then(function (response) {
                // handle success
                console.log(response.data, "<<<<<<<RESPONSEEEEEE")
                axios({
                    url: 'https://ml.tand.ai/multiple_text',
                    method: 'post',
                    data: response.data
                })
                    .then(function (response) {
                        // handle success
                        console.log(response, "<<<<<<<<<< RESPONSE")
                        setanswer(response.data.data)
                        settime(response.data.time)
                        setloading(false)
                        openModal()
                        // Swal.fire({
                        //     title: 'Success!',
                        //     text: response.data.data,
                        //     icon: 'success',
                        //     confirmButtonText: 'Cool'
                        // })
                    })
                    .catch(function (response) {
                        // handle success
                        Swal.fire({
                            title: 'Error!',
                            text: response,
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        })
                    })
            })
    }

    const uploadFile = (event) => {
        setFile(event.target.files[0])
        setFilename(event.target.files[0].name)
    };

    function openModal() {
        setIsOpen(true);
    }


    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#000000';
    function afterOpenModal() {
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
                // console.log(model, "<<<<MOOODELLLLL")
                setloading(false)
            })
    }, [id])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <Link to="/">
                <p style={{ color: "black", textAlign: "left", marginLeft: "50px", marginTop: "30px", fontFamily: "Inter", fontWeight: "bold" }} >
                    &lt; Back
                </p>
            </Link>

            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", margin: "auto", fontFamily: "Inter" }}>Test Model</h1>
            <h1 className="title is-6" style={{ textAlign: "center", margin : "auto", marginTop: "1em"}}>Here you can test your models - as well as the built-in ones - by by inputting your own sentences.</h1>

            <div className="card" style={{ width: "60%", margin: "auto", marginTop: "5em" }}>
                <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
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
                            <option value="false" >Simple</option>
                            <option value="true" >Multiple</option>
                        </select>
                    </div>

                </header>
                <div className="card-content" >
                    <div className="content" >
                        {
                            isFile ?
                                <p style={{textAlign : "left", fontSize : "small"}}>Upload your CSV file containing multiple sentences and click "Submit" to get the sentiment result. CSV template can be downloaded <a href={Sample} >here.</a></p>
                                :
                                <p style={{textAlign : "left", fontSize : "small"}}>Type your sentence in the text box and click "Submit" to get the sentiment result.</p>
                        }
                        <input id="ph" className="input is-dark" style={{ width: "325px" }} disabled type="text" placeholder={model.model_ID} />

                        {isFile ?

                            <form className="form" style={{ width: "50%", margin: "auto", marginTop: "10px" }}
                                encType="multipart/form-data"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    addFile(model.id)
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
                                    <input id="ph" className="input" type="text" name="Word" defaultValue={word}
                                        placeholder="Input your words here" onChange={e => setword(e.target.value)} />
                                </div>

                                <button className="button Mainkolor" type="submit" style={{ color: "white" }}>Submit</button>
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
                    <p style={{ textAlign: "center" }}>time : {time} second(s)</p>
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
