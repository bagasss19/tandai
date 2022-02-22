import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    const[modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
  return(
    <div className="">
        <div className="model-list">
         <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Model List</p>
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Model ID</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "180px",position:"fixed"}}>Model ID is a combination of unique special letters and</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "200px",position:"fixed"}}>numbers that are generated automatically.</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "220px",position:"fixed"}}>The model with the ID “lstmw13” is our baseline model.</p>
        </div> 
        <div className="model-name">
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "263px",fontWeight:"bold",position:"fixed"}}>Model Name</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "303px",position:"fixed"}}>Model Name is used as the display name of the model.</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "323px",position:"fixed"}}>It is editable, so that the user can easily recognize which</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "343px",position:"fixed"}}>model is which.</p>
        </div> 
        <div className="status">
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "386px",fontWeight:"bold",position:"fixed"}}>Status</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "418px",position:"fixed"}}>Status provides you the conditions and progresses of</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "438px",position:"fixed"}}>the models.</p>
         <span className="tag is-success is-medium" style={{left: "984px",top: "476px",position:"fixed"}}>Ready
         <p style={{color:"white",fontSize:"16px", left: "1124px",top: "480px",position:"fixed"}}>The model is ready to be used.</p>

         </span>
         <span className="tag is-warning is-medium" style={{left: "984px",top: "532px",position:"fixed"}}>On Progress
         <p style={{color:"white",fontSize:"16px", left: "1124px",top: "526px",position:"fixed"}}>The model is currently being trained</p>
         <p style={{color:"white",fontSize:"16px", left: "1124px",top: "546px",position:"fixed"}}>and is not available to use yet.</p>
         </span>
         <span className="tag is-danger is-medium" style={{left: "984px",top: "592px",position:"fixed"}}>Error
         <p style={{color:"white",fontSize:"16px", left: "1124px",top: "587px",position:"fixed"}}>The training ends with an error and</p>
         <p style={{color:"white",fontSize:"16px", left: "1124px",top: "607px",position:"fixed"}}>the model cannot be used.</p>
         <p style={{color:"white",fontSize:"16px", left: "1080px",top: "637px",position:"fixed"}}>PS: Please check the dataset uploaded for</p>
         <p style={{color:"white",fontSize:"16px", left: "1080px",top: "657px",position:"fixed"}}>mismatch (refer to “CSV Convention” section)</p>
         <p style={{color:"white",fontSize:"16px", left: "1080px",top: "677px",position:"fixed"}}>and/or contact us for further support.</p>
         </span>
        </div> 
    <div className="modal-content-wrapper">
      <div modal-content>
      </div>
    </div>
  </div>
  

  );
}