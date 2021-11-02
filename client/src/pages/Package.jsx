import React from 'react'
import {
    Link,
} from "react-router-dom";
import check from "../Assets/checklist.png"
export default function Package() {
    return (
        <>
            <p style={{ fontFamily: "inter", fontSize: "25px", fontWeight: "bold" }}>
                <Link to="/profile">Profile</Link> | <Link to="/package" style={{ color: "black" }}>Package</Link>
            </p>

            <div className="columns" style={{ marginLeft: "25px", marginTop: "50px", marginRight: "25px" }}>
                <div className="column">
                    <div className="card">
                        <header className="card-header bronze">
                            <p className="card-header-title">
                                Starter
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content" style={{ textAlign: "left", fontSize: "Inter" }}>
                                <p><span style={{ fontSize: "30px", fontWeight: "bold" }}>Rp 0</span>  / month</p>
                                <p><span class="icon"><img src={check} /></span> Detection : 1000 requests / month</p>
                                <p><span class="icon"><img src={check} /></span> Transfer Learning : 10k dataset records / month </p>
                                <p><span class="icon"><img src={check} /></span> Email Support </p>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <Link to="/" className="card-footer-item"><button className="button bronze">Contact Us</button></Link>
                        </footer>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <header className="card-header silver">
                            <p className="card-header-title">
                                Pro
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content" style={{ textAlign: "left", fontSize: "Inter" }}>
                                <p><span style={{ fontSize: "30px", fontWeight: "bold" }}>Rp 5.000.000</span>  / month</p>
                                <p><span class="icon"><img src={check} /></span> Detection : Unlimited</p>
                                <p><span class="icon"><img src={check} /></span> Transfer Learning : 100k dataset records / month </p>
                                <p><span class="icon"><img src={check} /></span> Chat & Email Support </p>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <Link to="/" className="card-footer-item"><button className="button silver">Contact Us</button></Link>
                        </footer>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <header className="card-header gold">
                            <p className="card-header-title">
                                Enterprise
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content" style={{ textAlign: "left", fontSize: "Inter" }}>
                                <p><span style={{ fontSize: "30px", fontWeight: "bold" }}>Contact us for the price</span></p>
                                <p><span class="icon"><img src={check} /></span> On Demand</p>
                                <p><span class="icon"><img src={check} /></span> Unlimited Request </p>
                                <p><span class="icon"><img src={check} /></span> Dedicated Team Support </p>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <Link to="/" className="card-footer-item"><button className="button gold">Contact Us</button></Link>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
