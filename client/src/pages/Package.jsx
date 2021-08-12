import React from 'react'
import {
    Link,
} from "react-router-dom";
export default function Package() {
    return (
        <>
            <div className="tabs is-centered">
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li className="is-active"><Link to="/package">Package</Link></li>
                </ul>
            </div>

            <div className="columns" style={{ marginLeft: "100px" }}>
                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                                Free
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.    
                            </div>
                        </div>
                        <footer className="card-footer">
                            <Link to="/" className="card-footer-item"><button className="button is-dark is-outlined" >Buy</button></Link>
                        </footer>
                    </div>
                </div>


                <div className="column">
                    <div className="card">
                        <header className="card-header" style={{backgroundColor : "#ff5100"}}>
                            <p className="card-header-title">
                                Bronze
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.    
                            </div>
                        </div>
                        <footer className="card-footer">
                        <Link to="/" className="card-footer-item"><button className="button" style={{backgroundColor : "#ff5100"}}>Buy</button></Link>
                        </footer>
                    </div>
                </div>

                <div className="column">
                     <div className="card">
                        <header className="card-header" style={{backgroundColor : "#bfbfbf"}}>
                            <p className="card-header-title">
                                Silver
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.    
                            </div>
                        </div>
                        <footer className="card-footer">
                        <Link to="/" className="card-footer-item"><button className="button" style={{backgroundColor : "#bfbfbf"}}>Buy</button></Link>
                        </footer>
                    </div>
                </div>

                <div className="column">
                     <div className="card">
                        <header className="card-header" style={{backgroundColor : "#f5b236"}}>
                            <p className="card-header-title">
                                Gold
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.    
                            </div>
                        </div>
                        <footer className="card-footer">
                        <Link to="/" className="card-footer-item"><button className="button" style={{backgroundColor : "#f5b236"}}>Buy</button></Link>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
