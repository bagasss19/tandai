import React, { useState, useEffect } from 'react'
import { FaUpload } from "react-icons/fa";
import Axios from '../config/axios'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import { BsLightbulb } from 'react-icons/bs';


import {
    useParams,
    Link
} from "react-router-dom"

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
    const [show,setShow] = useState(true);

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
                    url: 'https://ml.tandai/singletext',
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
                    url: 'https://ml.tandai/multiple_text',
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

    function guideModal(){
        Swal.fire({
            title: 'EXAMPLE',
            html:
            '<div className="content">'+
            '</br>'+
                '<b>Simple</b>'+
                '</br>'+
                '</br>'+
                '<i>"Barang itu Bagus"</i><p>Or</p><i>"Sifat dia sangat buruk"</i>'+
                '</br>'+
                '</br>'+
                '<p>_________________________________________</p>'+
                '</br>'+
                '</br>'+
                '<b>Upload File</b>'+
                '</br>'+
                '</br>'+
                '<p>Choose one of your file that contain (.csv)</p>'+
            '</div>',
            confirmButtonText: 'Okay'
        })
        
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
        <div>
            <Link to="/">
                <p style={{ color: "black", textAlign: "left", marginLeft: "50px", marginTop: "30px", fontFamily: "Inter", fontWeight: "bold" }} >
                    &lt; Back
                </p>
            </Link>
            <div class="columns" style={{marginLeft:"750px"}}>
             <div class="is-1">
                <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", fontFamily: "Inter" }}>Test Model</h1>
             </div>
             <div class="is-1">
                 <a>
                <BsLightbulb onClick={()=>setShow(!show)} size='2.5em' color='cornflowerblue'style={{marginTop:'20px' ,marginLeft:'15px'}}></BsLightbulb>
                 </a>
             </div>
           </div>
           {
                show ?
                <div className="card" style={{ height: "200px", width: "20%", marginLeft: "700px", marginTop: "50px", borderRadius:'15px'}}>
                
                <header className="card-header" style={{ backgroundColor: "#B8DBCA" }}> 
                    <p class="card-header-title">
                            How To Work It:
                        </p>        
                </header>
                <div className="card-content" >
                    <div className="content">
                        <p style={{textAlign:"left"}}>1. Choose one of dropdown selected</p>
                        <p style={{textAlign:'left'}}>2. Fill empty form in the box</p>
                        <p style={{textAlign:'left'}}>3. Submit your test model</p>
                    </div>
                </div>
             </div>
             :null
            }
           

           
            <div className="card" style={{ height: "250px", width: "65%", marginLeft: "300px", marginTop: "50px" }}>
                <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                    <p className="card-header-title">
                        API Testing
                    </p>

                    <div className="select is-dark is-small" style={{ marginTop: "10px", marginRight: "10px" }}>
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
                    <div class="is-1">
                 <a>
                <BsLightbulb onClick={()=>guideModal()} size='1.5em' color='cornflowerblue'style={{marginTop:'13px' ,marginLeft:'7px'}}></BsLightbulb>
                 </a>
             </div>

                </header>
                <div className="card-content" >
                    <div className="content" >

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
        </div>
    )
}
