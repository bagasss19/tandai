import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
// import ImageUploader from 'react-images-upload';

export default function Addform(props) {
    const [word, setword] = useState("")
    const [answer, setanswer] = useState(null)
    const [loading, setloading] = useState(false)

    function add() {
        setloading(true)
        Axios({
            url: 'user/model',
            method: 'post',
            headers : {
                "Authorization" : localStorage.token
            },
            data : { word }
        })
            .then(function (response) {
                // handle success
                console.log(response.data, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                setanswer(response.data.sentiment)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (loading) {
        return(
        <>
        <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Loading...</h1>
        </>
        )
    }

    return (
        <>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add Word</h1>
            <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                }
                }>

                <div className="field">
                    <label className="label is-family-code">Add Words</label>
                    <input className="input" type="text" name="Word" defaultValue={word}
                        style={{ marginBottom: "30px" }}
                        placeholder="Title" onChange={e => setword(e.target.value)} />
                </div>

                <button className="button is-black" type="submit">Submit</button>

                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>{answer}</h1>
            </form>
        </>
    )
}