import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css";
import form from '../Assets/Login.png'
// import {
//     Link,
// } from "react-router-dom"

export default function Login(props) {
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")

    function login() {
        // axios.defaults.withCredentials = true
        Axios.post('user/login', {
            username,
            password
        })
            .then(function (response) {
                console.log(response.data, "<<<<<<<<TOKEN")
                localStorage.token = `Token ${response.data.key}`
                localStorage.username = response.data.username
                localStorage.id = response.data.id
                localStorage.role = response.data.is_superuser
                localStorage.paket = response.data.package
                props.history.push('/')
                window.location.reload();
            })
    }

    if (localStorage.token) {
        return (
            <h1>You Already Logged In</h1>
        )
    }
    return (
        <div className="login">
            <div className="card" style={{ margin: "auto", justifyContent: "center", position: "absolute", top: "31%", left: "34%", height: "350px", width: "500px" }}>

                <p style={{ justifyContent: "center", fontFamily: "inter", fontWeight: "bolder", fontSize: "22px", marginTop: "10px" }}>
                    Welcome to Tand.ai
                </p>
                <div className="card-content">
                    <div className="content">
                        <form className="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                login()
                            }}>
                            <div className="field">
                                <label className="label is-family-code" style={{ textAlign: "left" }}>Email:</label>
                                <input className="input" type="email" placeholder="Enter your email" onChange={e => setusername(e.target.value)} />
                            </div>

                            <div className="field">
                                <label className="label is-family-code" style={{ textAlign: "left" }}>Password:</label>
                                <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />

                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <p style={{marginTop : "15px"}}>Don't Have Account? <a href="mailto:registration@tand.ai?subject=Registrasi Akun Tandai&body=Halo, saya ingin registrasi akun tandai">Contact Us</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
