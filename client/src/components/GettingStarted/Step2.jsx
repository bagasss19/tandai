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
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Action</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "180px",position:"fixed"}}>This section consists of a list of actionable buttons.  </p>
         {/* <p style={{color:"white",fontSize:"16px", left: "974px",top: "200px",position:"fixed"}}>Volutpat volutpat massa odio egestas vivamus eleifend</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "220px",position:"fixed"}}>momentum.</p> */}
        </div> 
        <div className="status">
         <span className="tag is-success is-medium" style={{left: "984px",top: "233px",position:"fixed",backgroundColor : "#1D8C59", color:"white"}}>Train
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "213px",position:"fixed"}}>This button will take you to the “Train” page,</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "233px",position:"fixed"}}>where you can create a new model based on</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "253px",position:"fixed"}}>a previous one, using your own dataset.</p>

         </span>
         <span className="tag is-success is-medium" style={{left: "984px",top: "323px",position:"fixed",backgroundColor : "#1D8C59", color:"white"}}>Test
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "293px",position:"fixed"}}>This button will take you to the “Test” page,</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "313px",position:"fixed"}}>where you can try out the models to analyze</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "333px",position:"fixed"}}>sentiments on a manually inputted sentence</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "353px",position:"fixed"}}>or a CSV file containing multiple sentences.</p>
         </span>
         <span className="tag is-success is-medium" style={{left: "984px",top: "413px",position:"fixed",backgroundColor : "#1D8C59", color:"white"}}>Detail
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "393px",position:"fixed"}}>This button will take you to the “Detail” page,</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "413px",position:"fixed"}}>where you can look out value of models that</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "433px",position:"fixed"}}>already done to test and train.</p>

         </span>
         <span className="tag is-success is-medium" style={{left: "984px",top: "493px",position:"fixed",backgroundColor : "#CB3A31", color:"white"}}>Delete
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "473px",position:"fixed"}}>Use this feature if you want to delete a model.</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "493px",position:"fixed"}}>Please note that the baseline model “lstmw13”</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "513px",position:"fixed"}}>cannot be deleted.</p>

         </span>
         <span className="tag is-success is-medium" style={{left: "984px",top: "560px",position:"fixed",backgroundColor : "#D5D5D5", color:"white"}}>Delete
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "553px",position:"fixed"}}>try to delete it ? it was Disabled delete button</p>
         <p style={{color:"white",fontSize:"16px", left: "1094px",top: "573px",position:"fixed"}}>for our base line model "lstmw13"</p>
         </span>
        </div> 
    <div className="modal-content-wrapper">
      <div modal-content>
      </div>
    </div>
  </div>
  

  );
}