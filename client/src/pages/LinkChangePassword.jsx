import React, { useState } from 'react'
import '../App.css'
import "bulma/css/bulma.css";

import {
    useParams,
} from "react-router-dom"
import ReactLoading from 'react-loading'
import Axios from '../config/axios'
import Swal from 'sweetalert2'

export default function LinkChangePassword(props) {
    let { email } = useParams()
    const [loading, setloading] = useState(false)
    const [password, setpassword] = useState("")
    const [code, setcode] = useState("")
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

        setloading(true)
        Axios({
            url: 'user/forgot',
            method: 'put',
            data : {email, code, password}
        })
            .then(function (response) {
                // handle success
                Swal.fire({
                    title: 'Success!',
                    text: `Change Password Success`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                setloading(false)
            })
        
    }


    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }
    return (
        <div class="login">
            <div class="card" style={{margin:"auto", justifyContent: "center", borderRadius:"10px",top:"30%",padding:"10px",position: "sticky", height: "320px", width: "500px"}}>
                <p style={{ justifyContent: "center", fontFamily: "inter", fontWeight: "bolder", fontSize: "22px", marginTop: "10px" }}>
                    Change Password
                </p>
                <div className="card-content">
                    <div className="content">
                        <form className="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                updatepassword()
                            }}>
                            <div className="field">
                                <label className="label" style={{ fontFamily: "Inter", textAlign: "left" }}>Email</label>
                                <input className="input is-small" type="email" name="Email"
                                    style={{ marginBottom: "10px" }}
                                    defaultValue={email}
                                    disabled />
                            </div>

                            <div className="field">
                                <label className="label" style={{ fontFamily: "Inter", textAlign: "left" }}>Code</label>
                                <input className="input is-small" type="text" name="Code" placeholder='code' onChange={e => setcode(e.target.value)}
                                    style={{ marginBottom: "10px" }} />
                            </div>


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
