import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import {
    useParams
} from "react-router-dom"
// import csv from '../Assets/review.csv'
// import { readString } from 'react-papaparse'
import Zoom from 'react-medium-image-zoom'

Modal.setAppElement('#root');


export default function Testid() {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [model, setmodel] = useState(null)
    const [review, setreview] = useState(null)
    const [filter, setfilter] = useState("default")

    const generateDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()
        let hours = '' + d.getHours()
        let minutes = '' + d.getMinutes()
        let second = '' + d.getSeconds()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hours.length < 2)
            hours = '0' + hours;
        if (minutes.length < 2)
            minutes = '0' + minutes;
        if (second.length < 2)
            second = '0' + second;

        return `${day}-${month}-${year} ${hours}:${minutes}:${second}`
    }

    function mathRound(num) {
        const resultMath = num * 100
        return '' + resultMath;
    }

    function thousand(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const duration = (date1, date2) => {
        let d = new Date(date1)
        let e = new Date(date2)

        return `${Math.floor((e - d) / (1000 * 60))} Minute(s)`
    }

    useEffect(() => {
        Axios({
            url: 'model/' + id,
            method: 'get',
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                setmodel(response.data[0])
                Axios({
                    url: 'model/review/' + id,
                    method: 'get',
                    headers: {
                        "Authorization": localStorage.token
                    }
                })
                    .then(function (response) {
                        // handle success
                        console.log(response.data, "<<<<<<<<<<REVIEEEEWWW");
                        setreview(response.data)
                        setloading(false)
                    })
            })
    }, [id])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Roboto" }}>{model.model_ID}</h1>
            <div className="columns" style={{ marginLeft: "125px", marginTop: "10px", marginRight: "100px" }}>

                <div className="column is-7">
                    <div className="card" style={{ height: "350px", width: "90%" }}>
                        <header className="card-header">
                            <p className="card-header-title">
                                Review
                            </p>

                            <div className="select is-dark is-small" style={{ marginTop: "10px", marginRight: "5px" }}>
                                <select defaultValue={filter} onChange={e => { setfilter(e.target.value) }}>
                                    <option value="default" >Default</option>
                                    <option value="bagasganteng">False Positive</option>
                                    <option value="bagastampan">False Negative</option>
                                </select>
                            </div>
                        </header>

                        <div className="card-content" style={{ overflow: "scroll", height: "300px" }}>
                            <table className="table is-hoverable" style={{ backgroundColor: "#d3cef5", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Review</th>
                                        <th>Sent</th>
                                        <th>Sent Pred</th>
                                    </tr>
                                </thead>

                                {filter === "default" && review.map((x) => (
                                    <tbody>
                                        <tr>
                                            <td>{x.review}</td>
                                            <td>{x.sent}</td>
                                            <td>{x.sent_pred}</td>
                                        </tr>
                                    </tbody>
                                ))}

                                {filter === "bagasganteng" && review.map((x) => (
                                    x.sent !== x.sent_pred && x.sent === "1" ?
                                        <tbody>
                                            <tr>
                                                <td>{x.review}</td>
                                                <td>{x.sent}</td>
                                                <td>{x.sent_pred}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <></>
                                ))}

                                {filter === "bagastampan" && review.slice(1).map((x) => (
                                    x.sent !== x.sent_pred && x.sent === "0" ?
                                        <tbody>
                                            <tr>
                                                <td>{x.review}</td>
                                                <td>{x.sent}</td>
                                                <td>{x.sent_pred}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <></>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card" style={{ height: "350px", width: "100%" }}>
                        <header className="card-header">
                            <p className="card-header-title">
                                Statistic
                            </p>
                        </header>

                        <div className="card-content" style={{ overflow: "scroll", height: "300px" }}>


                            {/* VERSI 2 */}
                            <table className="table is-hoverable" style={{ backgroundColor: "#cee4f5", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Test Accuracy</td>
                                        <td>{`${mathRound(model.statistics_test_acc).slice(0, 5)} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Test Loss</td>
                                        <td>{model.statistics_test_loss.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Train Accuracy</td>
                                        <td>{`${mathRound(model.statistics_train_acc).slice(0, 5)} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Train Loss</td>
                                        <td>{model.statistics_train_loss.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>F1 Score</td>
                                        <td>{model.statistics_f1.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Precision Score</td>
                                        <td>{model.statistics_precision.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Recall Score</td>
                                        <td>{model.statistics_recall.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>True Positive</td>
                                        <td>{thousand(model.statistics_tp)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>False Positive</td>
                                        <td>{thousand(model.statistics_fp)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>True Negative</td>
                                        <td>{thousand(model.statistics_tn)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>False Negative</td>
                                        <td>{thousand(model.statistics_fn)}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns" style={{ marginLeft: "138px", marginRight: "100px" }}>

                <div className="column is-7">
                    <div className="columns" style={{ marginTop: "50px", width: "90%" }}>
                        <Zoom>
                            <figure className="item-wrap fancybox">
                                <img src={`http://20.195.24.100:8000${model.accuracy_image}`} alt="accuracy" className="img-fluid" />
                            </figure>
                        </Zoom>

                        <Zoom>
                            <figure className="image" style={{ marginLeft: "5px" }}>
                                <img src={`http://20.195.24.100:8000${model.loss_image}`} alt="accuracy" className="img-fluid" />
                            </figure>
                        </Zoom>
                    </div>
                </div>

                <div className="column">
                    <div className="card" style={{ height: "300px", width: "100%" }}>
                        <header className="card-header">
                            <p className="card-header-title">
                                Train Time
                            </p>
                        </header>

                        <div className="card-content">
                            <table className="table is-hoverable" style={{ backgroundColor: "#d3cef5", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Taining Starttime</td>
                                        <td>{generateDate(model.training_starttime)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Training Endtime</td>
                                        <td>{generateDate(model.training_endtime)}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>duration</td>
                                        <td>{duration(model.training_starttime, model.training_endtime)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}