import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
// import axios from 'axios'
import "bulma/css/bulma.css";
import {
    Link,
} from "react-router-dom";
// import { getRole, setRole } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux'

export default function Login(props) {
    // const dispatch = useDispatch()
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")

    function login() {
        // axios.defaults.withCredentials = true
        Axios.post('user/login', {
            username,
            password
        })
            .then(function (response) {
                // console.log(response.data.id, "<<<<<<<<TOKEN")
                localStorage.token = `Token ${response.data.key}`
                localStorage.username = response.data.username
                localStorage.id = response.data.id
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
        <>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Welcome, Please Login</h1>

            <form className="form"
                style={{ justifyContent: "center", alignContent: "center", marginTop: "100px", width: "50%", display: "inline-block" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }}>
                <div className="field">
                    <label className="label is-family-code">Username</label>
                    <input className="input" type="text" placeholder="Enter your username" onChange={e => setusername(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Password</label>
                    <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-black">Login</button>
                    </div>
                    <p>Doesn't Have Account? Register <Link to="/register">Here</Link></p>
                </div>
            </form>
        </>
    )
}
