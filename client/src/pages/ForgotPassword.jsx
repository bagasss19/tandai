import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css";
import {
    Link,
} from "react-router-dom"
import Swal from 'sweetalert2'

export default function ForgotPassword(props) {
    const [email, setemail] = useState("")

    function forgot() {
        // axios.defaults.withCredentials = true
        Axios.post('user/forgot', {
            email,
        })
            .then(function (response) {
                Swal.fire({
                    title: 'Success!',
                    text: `Request Reset Password Success! Please check your email.`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
    }

    if (localStorage.token) {
        return (
            <h1>You Already Logged In</h1>
        )
    }
    return (
        <div class="login">
            <div class="card" style={{margin:"auto", justifyContent: "center", borderRadius:"10px",top:"30%",padding:"10px",position: "sticky", height: "250px", width: "500px"}}>
                <p style={{ justifyContent: "center", fontFamily: "inter", fontWeight: "bolder", fontSize: "22px", marginTop: "10px" }}>
                    Please input your email to request reset password
                </p>
                <div className="card-content">
                    <div className="content">
                        <form className="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                forgot()
                            }}>
                            <div className="field">
                                <label className="label is-family-code" style={{ textAlign: "left" }}>Email:</label>
                                <input className="input" type="email" placeholder="Enter your email" onChange={e => setemail(e.target.value)} />
                            </div>
                            <div className="field">

                                <div className="control">
                                    <button className="button is-success is-fullwidth">Submit</button>
                                </div>
                                <p style={{marginTop : "15px"}}>Already remember your password? <Link to="/login">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
