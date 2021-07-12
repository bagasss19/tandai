import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
// import ImageUploader from 'react-images-upload';

export default function Multiple(props) {
    const [word, setword] = useState([])
    const [answer, setanswer] = useState(null)
    const [loading, setloading] = useState(false)

    function add() {
        setloading(true)
        let words = word.split(",")
        console.log(words, "<<<<<<<<<INPPUTTT")
        Axios({
            url: 'user/multiple',
            method: 'post',
            headers : {
                "Authorization" : localStorage.token
            },
            data : { words }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.output, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                setanswer(response.data.output)
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
        <div style={{marginLeft : "150px"}}>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Multiple Input</h1>
            <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                }
                }>

                <div className="field">
                    <label className="label is-family-code">Add Multiple Input</label>
                    <textarea className="textarea" type="text" name="Word" defaultValue={word}
                        style={{ marginBottom: "30px" }}
                        placeholder="Make sure you fill with array format ([]), and separate each word with comma (,)" onChange={e => setword(e.target.value)} />
                </div>

                <button className="button is-black" type="submit">Submit</button>

                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>{answer ? JSON.stringify(answer) : answer}</h1>
            </form>
        </div>
    )
}