import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import axios from '../config/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link,
} from "react-router-dom";
import Swal from 'sweetalert2'

export default function Profile() {
    const [user, setuser] = useState("null")
    const [loading, setloading] = useState(true)

    const getUser = () => {
        axios({
            url: 'user/' + localStorage.id,
            method: 'get',
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                setuser(response.data)
                console.log(response.data, "<<<DANDANJADN")
                setloading(false)
            })
    }

    const update = () => {
        console.log(user.username,user.company, "<<<USEEERRR")
        setloading(true)
        axios({
            url: 'user/' + localStorage.id,
            method: 'put',
            headers: {
                "Authorization": localStorage.token
            },
            data : {username : user.username, company : user.company}
        })
            .then(function (response) {
                // handle success)
                setloading(false)
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Profile Success',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            })
    }

    const notify = () => toast.success('Token Copied!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    useEffect(() => {
        getUser()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
          style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
      }
    return (
        <>
            <div className="tabs is-centered">
                <ul>
                    <li className="is-active"><Link to="/profile">Profile</Link></li>
                    <li><Link to="/package">Package</Link></li>
                </ul>
            </div>
            <figure className="image is-128x128" style={{ margin: "auto", marginTop: "75px" }}>
                <img className="is-rounded" alt="profil" src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" />
            </figure>

            <div style={{ width: "50%", margin: "auto" }}> 
                <div className="field">
                    <label className="label is-family-code">Username</label>
                    <input className="input" type="text" name="Title"
                        style={{ marginBottom: "30px" }}
                        defaultValue={user.username}
                        onChange={(e) => {
                            setuser({...user, username : e.target.value})
                        }} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Company</label>
                    <input className="input" type="text" name="Title"
                        style={{ marginBottom: "30px" }}
                        defaultValue={user.company}
                        onChange={(e) => {
                            setuser({...user, company : e.target.value})
                        }} />
                </div>


                <div className="field">
                    <label className="label is-family-code">Email</label>
                    <input className="input" type="email" name="Email"
                        style={{ marginBottom: "30px" }}
                        defaultValue={user.email}
                        disabled />
                </div>

                <div className="field">
                    <label className="label is-family-code">Package</label>
                    <input className="input" type="text" name="Package"
                        style={{ marginBottom: "30px" }}
                        defaultValue={user.package_name}
                        disabled />
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <button className="button Mainkolor" style={{color : "white"}} onClick={() => { navigator.clipboard.writeText(localStorage.token); notify() }}>Get API Token</button>
            <button className="button Mainkolor" style={{marginLeft : "20px", color : "white"}} onClick={update}>Update Profile</button>

        </>
    )
}
