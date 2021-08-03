import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'

export default function File(props) {
    const [file, setFile] = useState(null)
    const [answer, setanswer] = useState(null)
    const [loading, setloading] = useState(true)
    const [model, setmodel] = useState(null)

    function add() {
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
                console.log(response.data.data, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                setanswer(response.data.data)
                setloading(false)
            })
    }

    const uploadFile = (event) => {
        setFile(event.target.files[0])
    };

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

    useEffect(() => {
        getModel()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={667} width={375}
            style={{ margin: "auto", width: "50%" }} />)
    }

    return (
        <div style={{ marginLeft: "150px" }}>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add File</h1>

            <p style={{ marginTop: "20px" }}>Select Model</p>
            <div className="select is-dark">
                <select>
                    <option>Default</option>
                    {model.map((x) => {
                        return <option value={x.id} key={x.id}>{x.title}</option>
                    })}
                </select>
            </div>

            <form className="form" style={{ marginTop: "50px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                }}>

                <div className="file" style={{ marginLeft: "220px", marginTop: "20px", marginBottom: "50px" }}>
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

                <button className="button is-black" type="submit">Submit</button>

                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>{answer ? JSON.stringify(answer) : answer}</h1>
            </form>
        </div>
    )
}