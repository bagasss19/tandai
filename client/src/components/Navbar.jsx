import React from 'react'
import {
    Link,
} from "react-router-dom";
import Logo from '../Assets/logo_tandai.png'

export default function Navbar() {
    //admin login
    if (localStorage.token) {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation" style={{ position: 'sticky', top: 0, backgroundColor : "#ffffff" }}>
                <div className="navbar-brand" style={{position: "absolute", zIndex: 1 }}>
                    <Link to="/" className="navbar-item"><img src={Logo} alt="tandai" /></Link>
                </div>

                {/* <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item"><p>Home</p></Link>
                    </div>
                </div> */}
                <div className="navbar-end" style={{width : "300px"}} >
                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">
                        <img src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" alt="profil" style={{ margin: "auto", marginRight : "5px" }} />
                            {localStorage.username}
                        </p>

                        <div className="navbar-dropdown">
                            <Link to="/profile">
                                <p className="navbar-item">
                                    Profile
                                </p>
                            </Link>
                            {/* <p className="navbar-item">
                                Setting
                            </p> */}
                            <hr className="navbar-divider" />
                            <Link to="/faq">
                                <p className="navbar-item">
                                    Documentation
                                </p>
                            </Link>
                            <div className="buttons" onClick={(e) => {
                                e.preventDefault()
                                localStorage.clear()
                                window.location.reload();
                            }}>
                                <p className="button is-danger" style={{margin : "auto", marginBottom : "20px", marginTop : "20px"}}><strong>Logout</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    //logout
    else {
        return (
            <></>
        )
    }
}