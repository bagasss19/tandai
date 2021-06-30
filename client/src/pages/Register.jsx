import React, { useState } from 'react'
import '../App.css'
import axios from '../config/axios'
import "bulma/css/bulma.css";
import {
    Link,
} from "react-router-dom";

export default function Login(props) {
    // const dispatch = useDispatch()
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    function register() {
        axios.post('/register', {
            name,
            password,
            email
        })
            .then(function (response) {
                props.history.push('/login')
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
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Register Your Account</h1>

            <form className="form"
                style={{ justifyContent: "center", alignContent: "center", marginTop: "100px", width: "50%", display: "inline-block" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    register()
                }}>
                <div className="field">
                    <label className="label is-family-code">Name</label>
                    <input className="input" type="text" placeholder="Enter your name" onChange={e => setname(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Email</label>
                    <input className="input" type="email" placeholder="Enter your valid email" onChange={e => setemail(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Password</label>
                    <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-black">Register</button>
                    </div>
                    <p>Already Have Account? Login <Link to="/Login">Here</Link></p>
                </div>
            </form>
        </>
    )
}
