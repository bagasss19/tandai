import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import {
    useParams
} from "react-router-dom";
import Accuracy from '../Assets/testing1_Accuracy Graphics.png'
import Loss from '../Assets/testing1_Loss Graphics.png'
import csv from '../Assets/review.csv'
import { readString } from 'react-papaparse'

Modal.setAppElement('#root');


export default function Testid() {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [model, setmodel] = useState(null)
    const [data, setdata] = useState(null)
    const [filter, setfilter] = useState("default")

    const papaConfig = {
        complete: (results, file) => {
            setdata(results.data)
            // console.log('Parsing complete:', results.data);
        },
        download: true,
        error: (error, file) => {
            // console.log('Error while parsing:', error, file);
        },
    };

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

    const duration = (date1, date2) => {
        let d = new Date(date1)
        let e = new Date(date2)

        return `${Math.floor((e - d) / (1000 * 60))} Minute(s)`
    }

    const pickle = () => {

    }

    useEffect(() => {
        readString(csv, papaConfig)
        pickle()
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
                setloading(false)
            })
    }, [id])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Roboto" }}>{model.model_ID}</h1>
            <div className="columns" style={{ marginLeft: "200px", marginTop: "10px", marginRight: "100px" }}>

                <div className="column is-7">
                    <div className="card" style={{ height: "350px", overflow: "scroll", width: "100%" }}>
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

                        <div className="card-content" >
                            <table className="table is-hoverable" style={{ backgroundColor: "#d3cef5", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>{data[0][1]}</th>
                                        <th>{data[0][2]}</th>
                                        <th>{data[0][3]}</th>
                                    </tr>
                                </thead>

                                {filter === "default" && data.slice(1).map((x) => (
                                    <tbody>
                                        <tr>
                                            <td>{x[1]}</td>
                                            <td>{x[2]}</td>
                                            <td>{x[3]}</td>
                                        </tr>
                                    </tbody>
                                ))}

                                {filter === "bagasganteng" && data.slice(1).map((x) => (
                                    x[2] !== x[3] && x[2] === "1" ?
                                        <tbody>
                                            <tr>
                                                <td>{x[1]}</td>
                                                <td>{x[2]}</td>
                                                <td>{x[3]}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <></>
                                ))}

                                {filter === "bagastampan" && data.slice(1).map((x) => (
                                    x[2] !== x[3] && x[2] === "0" ?
                                        <tbody>
                                            <tr>
                                                <td>{x[1]}</td>
                                                <td>{x[2]}</td>
                                                <td>{x[3]}</td>
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
                    <div className="card" style={{ height: "350px", overflow: "scroll", width: "100%" }}>
                        <header className="card-header">
                            <p className="card-header-title">
                                Statistic
                            </p>
                        </header>

                        <div className="card-content" >
                            {/* <table className="table is-hoverable">
                        <thead>
                            <tr>
                                <th>statistics_tp</th>
                                <th>statistics_fp</th>
                                <th>statistics_tn</th>
                                <th>statistics_fn</th>
                                <th>statistics_f1</th>
                                <th>statistics_precision</th>
                                <th>statistics_recall</th>
                                <th>statistics_train_acc</th>
                                <th>statistics_train_loss</th>
                                <th>statistics_test_acc</th>
                                <th>statistics_test_loss</th>
                                <th>train start</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{model.statistics_tp}</td>
                                <td>{model.statistics_fp}</td>
                                <td>{model.statistics_tn}</td>
                                <td>{model.statistics_fn}</td>
                                <td>{model.statistics_f1.toFixed(2)}</td>
                                <td>{model.statistics_precision}</td>
                                <td>{model.statistics_recall}</td>
                                <td>{model.statistics_train_acc}</td>
                                <td>{model.statistics_train_loss}</td>
                                <td>{model.statistics_test_acc}</td>
                                <td>{model.statistics_test_loss}</td>
                                <td>{generateDate(model.training_starttime, model.training_endtime)}</td>
                            </tr>
                        </tbody>
                    </table> */}


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
                                        <td>{`${model.statistics_test_acc.toFixed(5) * 100} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Test Loss</td>
                                        <td>{`${model.statistics_test_loss.toFixed(5) * 100} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Train Accuracy</td>
                                        <td>{`${model.statistics_train_acc.toFixed(5) * 100} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Train Loss</td>
                                        <td>{`${model.statistics_train_loss.toFixed(4) * 100} %`}</td>
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
                                        <td>{model.statistics_tp}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>False Positive</td>
                                        <td>{model.statistics_fp}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>True Negative</td>
                                        <td>{model.statistics_tn}</td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>False Negative</td>
                                        <td>{model.statistics_fn}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>



            <div className="columns" style={{ marginLeft: "200px", marginRight: "100px" }}>
                <div className="column is-7">

                    <div className="columns" style={{ marginTop: "50px" }}>
                        <figure className="image img-wrapper">
                            <img src={Accuracy} alt="accuracy" className="hover-zoom" />
                        </figure>

                        <figure className="image" style={{ marginLeft: "5px" }}>
                            <img src={Loss} alt="loss" />
                        </figure>
                    </div>
                </div>

                <div className="column">
                    <div className="card" style={{ height: "350px", overflow: "scroll", width: "100%" }}>
                        <header className="card-header">
                            <p className="card-header-title">
                                Train Time
                            </p>
                        </header>

                        <div className="card-content" >
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
