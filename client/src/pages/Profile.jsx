import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import axios from '../config/axios'

export default function Profile() {
    const [user, setuser] = useState("null")
    const [loading, setloading] = useState(true)
    const [copy, setcopy] = useState(false)

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

    useEffect(() => {
        getUser()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={167} width={75}
            style={{ margin: "auto", width: "50%" }} />)
    }
    return (
        <>
            <figure className="image is-128x128" style={{ margin: "auto", marginTop: "75px" }}>
                <img className="is-rounded" alt="profil" src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" />
            </figure>

            <div style={{ width: "50%", margin: "auto" }}>
                <div className="field">
                    <label className="label is-family-code">Username</label>
                    <input className="input" type="text" name="Title"
                        style={{ marginBottom: "30px" }}
                        disabled
                        defaultValue={user.username} />
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
            {copy && <div className="notification is-primary is-light" style={{width : "30%", bottom : "5%", left : "35%" ,zIndex : "+1", position : "absolute"}}>
                <button className="delete" onClick={() => setcopy(false)}></button>
                Copied!
            </div>}
            <button className="button is-black" onClick={() => { navigator.clipboard.writeText(localStorage.token); setcopy(true) }}>Get API Token</button>
            {/* <button className="button is-black" style={{marginLeft : "20px"}}>Reset Password</button> */}
        </>
    )
}
