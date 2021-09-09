import React from 'react'
import { baseURL } from '../config/axios'
import output from '../Assets/output.png'
import input from '../Assets/input.png'
import header from '../Assets/header.png'

export default function Faq() {
    return (
        <>
            <h1 className="is-size-1 is-family-code" style={{marginTop : "50px"}}> FAQ </h1>
            <article className="message is-dark" style={{ width: "50%", margin: "auto", marginTop : "50px" }}>
                <div className="message-header">
                    <p>How to Use API</p>
                </div>
                <div className="message-body">
                    URL : {`${baseURL}singletext`}<br></br>
                    Header : {"Authorization : <token>"}<br></br>
                    input : JSON
                </div>
            </article>

            <article className="message is-dark" style={{ width: "50%", margin: "auto", marginTop : "50px" }}>
                <div className="message-header">
                    <p>JSON Input Example</p>
                </div>
                <div className="message-body">
                    <figure>
                        <img src={input} alt="input" />
                        <img src={header} alt="header" />
                    </figure>
                    <p>Make sure you follow the exact format, otherwise it will raise error</p>
                </div>
            </article>

            <article className="message is-dark" style={{ width: "50%", margin: "auto", marginTop : "50px" }}>
                <div className="message-header">
                    <p>JSON Output Example</p>
                </div>
                <div className="message-body">
                    <figure>
                        <img src={output} alt="output" />
                    </figure>
                </div>
            </article>
        </>
    )
}
