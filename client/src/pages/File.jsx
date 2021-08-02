import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
// import ImageUploader from 'react-images-upload';

export default function File(props) {
    const [file, setFile] = useState(null)
    const [answer, setanswer] = useState(null)
    const [loading, setloading] = useState(false)

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

    if (loading) {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Loading...</h1>
            </>
        )
    }

    return (
        <div style={{ marginLeft: "150px" }}>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add File</h1>
            <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                }}>

                {/* <div className="field"> */}
                    <label className="label is-family-code">Add File</label>
                    <div className="file" style={{ marginLeft: "230px", marginTop : "50px", marginBottom : "50px" }}>
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
                {/* </div> */}

                <button className="button is-black" type="submit">Submit</button>

                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>{answer ? JSON.stringify(answer) : answer}</h1>
            </form>
        </div>
    )
}