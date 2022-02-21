import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css";
import form from '../Assets/Login.png'
import {
    Link,
} from "react-router-dom"
import { AiFillEye } from "react-icons/ai";

export default function Login(props) {
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

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
                localStorage.started_home= response.data.started_home
                localStorage.started_test= response.data.started_test
                localStorage.started_train= response.data.started_train
                localStorage.started_detail= response.data.started_detail
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
        
        <div class="login">
            <div class="card" style={{margin:"auto", justifyContent: "center", borderRadius:"10px",top:"30%",padding:"10px",position: "sticky", height: "400px", width: "500px"}}>
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
                                <div className="pass-wrapper">
                                <input className="input"  type={passwordShown ? "text" : "password"} placeholder="Password" onChange={e => setpassword(e.target.value)} />
                                <i onClick={togglePasswordVisiblity}><AiFillEye/></i>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label is-family-code" href="/forgot-password" style={{ textAlign: "right" }}>
                                <Link to="/forgot-password"><p style={{color:"black"}}>{"Forgot Password ?"}</p></Link>
                                </label>
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
