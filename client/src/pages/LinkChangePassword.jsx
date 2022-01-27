import React, { useState, useEffect } from 'react'
import '../App.css'
import "bulma/css/bulma.css";
// import form from '../Assets/Login.png'
import {
    Link,
} from "react-router-dom"
import ReactLoading from 'react-loading'
import Axios from '../config/axios'
import Swal from 'sweetalert2'

export default function Login(props) {
    // const [user, setuser] = useState("null")
    // const [loading, setloading] = useState(true)
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    function updatepassword() {
        if (password !== confirmpassword) {
            Swal.fire({
                title: 'Failed!',
                text: 'Password and confirm password not match!',
                icon: 'error',
                confirmButtonText: 'Okay'
            })
        }
        
    }

    // const getUser = () => {
    //     Axios({
    //         url: 'user/' + localStorage.id,
    //         method: 'get',
    //         headers: {
    //             "Authorization": localStorage.token
    //         }
    //     })
    //         .then(function (response) {
    //             // handle success
    //             setuser(response.data)
    //             console.log(response.data, "<<<DANDANJADN")
    //             setloading(false)
    //         })
    // }

    // useEffect(() => {
    //     getUser()
    // }, [])

    // if (loading) {
    //     return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
    //         style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    // }
    return (
        <div class="login">
            <div class="card" style={{margin:"auto", justifyContent: "center", borderRadius:"10px",top:"30%",padding:"10px",position: "sticky", height: "320px", width: "500px"}}>
                <p style={{ justifyContent: "center", fontFamily: "inter", fontWeight: "bolder", fontSize: "22px", marginTop: "10px" }}>
                    Welcome to Tand.ai
                </p>
                <div className="card-content">
                    <div className="content">
                        <form className="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                updatepassword()
                            }}>
                            {/* <div className="field">
                                <label className="label" style={{ fontFamily: "Inter", textAlign: "left" }}>Email</label>
                                <input className="input is-small" type="email" name="Email"
                                    style={{ marginBottom: "10px" }}
                                    defaultValue={user.email}
                                    disabled />
                            </div> */}

                            <div className="field">
                                <label className="label" style={{ fontFamily: "Inter",textAlign: "left" }}>Password:</label>
                                <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                            </div>

                            <div className="field">
                                <label className="label" style={{ fontFamily: "Inter",textAlign: "left" }}>Confirm Password:</label>
                                <input className="input" type="password" placeholder="Password" onChange={e => setconfirmpassword(e.target.value)} />
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button className="button is-success is-fullwidth">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
