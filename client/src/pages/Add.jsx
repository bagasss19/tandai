import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'

export default function Addform(props) {
    const [word, setword] = useState("")
    const [answer, setanswer] = useState(null)
    const [loading, setloading] = useState(true)
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
                setanswer(response.data.sentiment)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
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

    useEffect(() => {
        getModel()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={667} width={375}
            style={{ margin: "auto", width: "50%" }} />)
    }

    return (
        <div style={{ marginLeft: "150px" }}>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>API Tester</h1>
            <p style={{marginTop : "20px"}}>Select Model</p>
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
                }
                }>

                <div className="field">
                    <label className="label is-family-code">Input Words</label>
                    <input className="input" type="text" name="Word" defaultValue={word}
                        style={{ marginBottom: "30px" }}
                        placeholder="Input your words here" onChange={e => setword(e.target.value)} />
                </div>

                <button className="button is-black" type="submit">Submit</button>

                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>{answer}</h1>
            </form>
        </div>
    )
}