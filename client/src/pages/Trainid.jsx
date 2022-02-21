import React, { useState, useEffect } from 'react'
import { FaUpload } from "react-icons/fa";
import Axios from '../config/axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"
import {
    useParams,
    Link
} from "react-router-dom";
import GetTrain from '../components/GettingTrain/GetTrain'
import { BiHelpCircle } from "react-icons/bi";
import Sample from '../sampletrain.csv'

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

export default function Trainid() {
    let { id } = useParams()
    const [file, setFile] = useState(null)
    const [fileName, setFilename] = useState(null)
    const [loading, setloading] = useState(true)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [model, setmodel] = useState(null)
    const [name, setname] = useState(null)
    const [trainModalOpen,setTrainModalOpen] = useState(localStorage.started_train=="true"?true:false)


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
            const input = new FormData()
            input.append('model_name', name)
            input.append('model_owner_id', localStorage.id,)
            input.append('baseline_ID', model.model_ID)

            const input2 = new FormData()
            input2.append('file', file)
            Axios({
                url: 'user/transfer/' + id,
                method: 'post',
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "multipart/form-data"
                },
                data: input
            })
                .then(function (response) {
                    // handle success
                    console.log(response.data.filename + '.csv', "<<<ASHUUPP");
                    input2.append('filename', response.data.filename + '.csv')
                    Axios({
                        url: 'user/transfer2/' + id,
                        method: 'post',
                        headers: {
                            "Authorization": localStorage.token,
                            "Content-Type": "multipart/form-data"
                        },
                        data: input2
                    })
                        .then(function (response) {
                            // handle success
                            console.log(response, "<<<ASHUUPP");
                            setloading(false)
                            Swal.fire({
                                title: 'Success!',
                                text: 'Upload Model Success',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })

                        })
                })
                .catch(function (error) {
                    // handle ERROR
                    console.log(error, "<<<<<<ERRR user transfer")
                    setloading(false)
                    Swal.fire({
                        title: 'Error!',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'Okay'
                    })
                })
        }
    }

    function addFile() {
        setloading(true)
        postApi()
    }

    const uploadFile = (event) => {
        // console.log(event.target.files[0].name.substr(event.target.files[0].name.length - 3, event.target.files[0].name.length - 1))
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

    const getChangesStarted = () => {
        if (localStorage.started_train=='true'){
          Axios({
            url: 'user/started/detail/' + localStorage.id,
            method: 'get',
            headers: {
              "Authorization": localStorage.token
          }
          })
            .then(function (){
              localStorage.started_train = false;
              setTrainModalOpen(false)
              setloading(false)
              Swal.fire({
                title: 'Success!',
                text: 'You Already know to use this page',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            })
        } else {
          setTrainModalOpen(false)
        }
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
            <Link to="/">
                <p style={{ color: "black", textAlign: "left", marginLeft: "50px", marginTop: "30px", fontFamily: "Inter", fontWeight: "bold" }} >
                    &lt; Back
                </p>
            </Link>
            {
                    trainModalOpen?
                        <div>
                            <GetTrain/>
                             <span className="button" onClick={()=>getChangesStarted()} style={{color:"white",backgroundColor:"#2DAA72",marginTop:"460px",marginLeft:"40px",position:"fixed", border:"none"}} > FINISH </span>
                        </div>
                    :
                    null
                }
            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", margin: "auto", fontFamily: "Inter" }}>Train Model</h1>
            <h1 className="title is-6" style={{ textAlign: "center", margin: "auto", marginTop: "1em" }}>Create a model based on previous existing ones by adding your own theme-specific dataset.</h1>

            <div className="card" style={{ width: "60%", marginLeft: "300px", marginTop: "50px",  position:"static" }}>
                <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                    <p className="card-header-title">
                        Train Model
                    </p>
                </header>

                <div className="card-content" >
                    <div className="content" >
                        <p style={{ textAlign: "left", fontSize: "small", position:"static" }}>Upload your CSV file containing the dataset and click "Submit" to start creating a new model. CSV template can be downloaded <a href={Sample} >here.</a>
                        </p>
                        <input id="ph" className="input is-dark" style={{ width: "325px" , position:"static"}} disabled type="text" placeholder={model.model_ID} />

                        <form className="form" style={{ width: "50%", margin: "auto" }}
                            encType="multipart/form-data"
                            onSubmit={(e) => {
                                e.preventDefault()
                                addFile()
                            }}>

                            <div className="field" style={{ marginTop: "10px" ,position:"static"}}>
                                {/* <label className="label is-family-code">Model Name</label> */}
                                <input id="ph" className="input" type="text" name="Model Name" placeholder="model name"
                                    defaultValue={name}
                                    style={{position:"static"}}
                                    onChange={(e) => {
                                        setname(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="file is-small" style={{ position:"static"}}>
                                <label className="file-label" style={{position:"static"}}>
                                    <input className="file-input" accept=".csv" type="file" name="resume" style={{position:"static",marginLeft:"-135px"}} onChange={uploadFile} />
                                    <span className="file-cta" style={{position:"static"}}>
                                        <span className="file-icon" style={{position:"static"}}>
                                            <FaUpload />
                                        </span>

                                        {fileName ?
                                            <span className="file-label" style={{position:"static"}}>
                                                {fileName}
                                            </span>
                                            :
                                            <span className="file-label" style={{position:"static"}}>
                                                Choose a file…
                                            </span>
                                        }
                                    </span>

                                </label>
                            </div>

                            <button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white", position:"static" }}>Submit</button>
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
            <div style={{marginTop:"100px",marginLeft:"1300px"}}>
          <button className='button' onClick={()=>setTrainModalOpen(true)} style={{border:"none" , position:"static"}} ><BiHelpCircle size={30} marginLeft="100px" color="#1A8856"/></button>   
        </div>
        </>
    )
}
