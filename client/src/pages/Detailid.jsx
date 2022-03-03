import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import {
    useParams,
    Link
} from "react-router-dom"
// import csv from '../Assets/review.csv'
// import { readString } from 'react-papaparse'
import GetDetail from '../components/GetDetail'
import { BiHelpCircle } from "react-icons/bi";
import Zoom from 'react-medium-image-zoom'
import '../App.css'
Modal.setAppElement('#root');


export default function Testid() {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [model, setmodel] = useState(null)
    const [review, setreview] = useState(null)
    const [filter, setfilter] = useState("default")
    const [detailModalOpen,setDetailModalOpen] = useState(localStorage.started_detail=="true"?true:false)


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

    const getChangesStarted = () => {
        if (localStorage.started_detail=='true'){
          Axios({
            url: 'user/started/detail/' + localStorage.id,
            method: 'get',
            headers: {
              "Authorization": localStorage.token
          }
          })
            .then(function (){
              localStorage.started_detail = false;
              setDetailModalOpen(false)
              setloading(false)
              Swal.fire({
                title: 'Success!',
                text: 'You Already know to use this page',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            })
        } else {
          setDetailModalOpen(false)
        }
      }

    useEffect(() => {
        Axios({
            url: 'model/' + id,
            method: 'get',
            headers: {
                // "Authorization": localStorage.token
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
            <Link to="/">
                <p style={{ color: "black", textAlign: "left", marginLeft: "50px", marginTop: "30px", fontFamily: "Inter", fontWeight: "bold" }} >
                    &lt; Back
                </p>
            </Link>
            
            {
    detailModalOpen?
      // {/* ======modal====== */}
      <div className="modal is-active">
      <div className="modal-background"></div>
       <div className="Apps-home">
         {/* the content goes here */}
         <div>
            <GetDetail/>
        </div>
        <div>
        <span className="button" onClick={()=>getChangesStarted()} style={{color:"white",backgroundColor:"#2DAA72", border:"none", marginTop:"-100px"}} > FINISH </span>
       </div>  
     </div>  
    </div>

      :
      null
      }

            

            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>Model Detail</h1>
            <h1 className="title is-6" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>{model.model_ID}</h1>
            <div style={{marginTop:"0px",marginLeft:"92%",textAlign:"left"}}>
             <button className='button' onClick={()=>setDetailModalOpen(true)} style={{border:"none" , position:"static", backgroundColor:"white"}} ><BiHelpCircle size={30} marginLeft="100px" color="#1A8856"/></button>   
            </div>
            <div className="columns" style={{ marginLeft: "25px", marginTop: "10px", marginRight: "25px" }}>

                <div className="column is-two-fifths">
                    <div className="card" style={{ height: "350px" , position:"static"}}>
                        <header className="card-header" style={{backgroundColor : "#F0F7F4", position:"static"}}>
                            <p className="card-header-title">
                                Review
                            </p>

                            <div className="dropdown" style={{ marginTop: "10px", marginRight: "5px", position:"static" }}>
                                <select defaultValue={filter} style={{position:"static"}} onChange={e => { setfilter(e.target.value) }}>
                                    <option value="default" >Default</option>
                                    <option value="bagasganteng">False Positive</option>
                                    <option value="bagastampan">False Negative</option>
                                </select>
                            </div>
                        </header>
                        <div className="card-content" style={{ overflow: "scroll",height: "320px",paddingTop:"0px",paddingRight:"0px",paddingLeft:"0px"}}>
                            <table className="table" style={{textAlign : "left"}}>
                                <thead className="sticky" style={{backgroundColor : "white",zIndex : 200, position:"static"}}>
                                    <tr>
                                        <th>Review</th>
                                        <th>Before</th>
                                        <th>After</th>
                                    </tr>
                                </thead>
                                {filter === "default" && review.map((x) => (
                                    <tbody className="tablemodel">
                                        <tr>
                                            <td>{x.review}</td>
                                            <td>{x.sent}</td>
                                            <td>{x.sent_pred}</td>
                                        </tr>
                                    </tbody>
                                ))}

                                {filter === "bagasganteng" && review.map((x) => (
                                    x.sent !== x.sent_pred && x.sent === "1" ?
                                    <tbody className="tablemodel">
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
                                    <tbody className="tablemodel">
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
                    <div className="card" style={{ height: "350px" , position:"static"}}>
                        <header className="card-header" style={{backgroundColor : "#F0F7F4"}}>
                            <p className="card-header-title">
                                Statistic
                            </p>
                        </header>
                        <div className="card-content" style={{ overflow: "scroll",height: "320px",paddingTop:"0px",paddingRight:"0px",paddingLeft:"0px"}}>
                            <table className="table" style={{width : "100%", textAlign : "left"}}>
                                <thead className="sticky" style={{backgroundColor : "white",zIndex : 200, position:"static"}}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Test Accuracy</td>
                                        <td>{`${mathRound(model.statistics_test_acc).slice(0, 5)} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Test Loss</td>
                                        <td>{model.statistics_test_loss.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Train Accuracy</td>
                                        <td>{`${mathRound(model.statistics_train_acc).slice(0, 5)} %`}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Train Loss</td>
                                        <td>{model.statistics_train_loss.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>F1 Score</td>
                                        <td>{model.statistics_f1.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Precision Score</td>
                                        <td>{model.statistics_precision.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Recall Score</td>
                                        <td>{model.statistics_recall.toFixed(2)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>True Positive</td>
                                        <td>{thousand(model.statistics_tp)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>False Positive</td>
                                        <td>{thousand(model.statistics_fp)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>True Negative</td>
                                        <td>{thousand(model.statistics_tn)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>False Negative</td>
                                        <td>{thousand(model.statistics_fn)}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card" style={{ height: "350px", width: "100%", paddingTop:"0px",paddingRight:"0px",paddingLeft:"0px", position:"static" }}>
                        <header className="card-header" style={{backgroundColor : "#F0F7F4"}}>
                            <p className="card-header-title">
                                Train Time
                            </p>
                        </header>

                        <div className="card-content" >
                            <table className="table" style={{textAlign : "left"}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Taining Start Time</td>
                                        <td>{generateDate(model.training_starttime)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Training End Time</td>
                                        <td>{generateDate(model.training_endtime)}</td>
                                    </tr>
                                </tbody>

                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Duration</td>
                                        <td>{duration(model.training_starttime, model.training_endtime)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="columns">
                    <div className="columns" style={{ marginTop: "50px", margin : "auto", marginLeft : "50px", position:"static" }}>
                        <Zoom>
                            <figure className="item-wrap fancybox" style={{position:"static"}}>
                                <img src={`https://api.tand.ai${model.accuracy_image}`} style={{position:"static"}} alt="accuracy" className="img-fluid" />
                            </figure>
                        </Zoom>

                        <Zoom>
                            <figure className="image" style={{ marginLeft: "5px" }}>
                                <img src={`https://api.tand.ai${model.loss_image}`} alt="accuracy" className="img-fluid" />
                            </figure>
                        </Zoom>
                    </div>
            </div>
            
        </>
    )
}
