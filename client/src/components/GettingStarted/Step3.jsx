import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    const[modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
  return(
    <div className="">
        <div className="api-usage">
         <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Usage</p>
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Api Usage</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "180px",position:"fixed"}}>This is the hit counter for the sentiment detection API.</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "200px",position:"fixed"}}>Basically it counts how many times the API has been hit </p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "220px",position:"fixed"}}>to analyze sentences.</p>
        </div> 
        <div className="tfl-usage">
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "263px",fontWeight:"bold",position:"fixed"}}>Transfer Learning Usage</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "303px",position:"fixed"}}>This is the dataset counter for the “Transfer Learning”</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "323px",position:"fixed"}}>feature. It accumulates how many rows of sentences have </p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "343px",position:"fixed"}}>been uploaded by the user.</p>
        </div> 
    <div className="modal-content-wrapper2">
      <div modal-content>
      </div>
    </div>
  </div>
  

  );
}