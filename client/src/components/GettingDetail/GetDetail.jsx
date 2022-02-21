import React, { useState } from "react";
import "./ModalDetail.css";
import { BiChevronDown } from "react-icons/bi";

export default function Modal() {
    const[modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
  return(
    <div>
        <div className="model-list">
         <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Model Detail</p>
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Review</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "180px",position:"fixed"}}>Review is a comparison of the sentiment values between</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "200px",position:"fixed"}}>the dataset and the results from the model post-training.</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "220px",position:"fixed"}}>There are 3 filters available to navigate the results better: </p>
        </div> 
        <div className="model-name">
        <p style={{color:"white",fontSize:"20px", left: "990px",top: "260px",fontWeight:"bold",position:"fixed"}}>Dropdown</p>
        <div className="select is-dark is-small" Disable style={{ marginTop: "302px", marginRight: "-540px" }}>
         <span id="ph" className="input is-dark" style={{ width: "105px",height:"35px" , position:"fixed"}} disabled> Default<BiChevronDown/></span>
        </div>  
        <p style={{color:"white",fontSize:"14px", textAlign:"initial",left: "1160px",top: "305px",position:"fixed"}}>shows all the results. </p>
        </div> 
        <div className="model-name">
        <div className="select is-dark is-small" Disable style={{ marginTop: "20px", marginRight: "-540px" }}>
         <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px" , position:"fixed"}} disabled> False Positive<BiChevronDown/></span>
        </div>
        <p style={{color:"white",fontSize:"14px", textAlign:"initial",left: "1160px",top: "338px",position:"fixed"}}> shows the ones where the model predicts positive sentiments when the actual values from the dataset are negatives.</p>
        </div> 
        <div className="model-name">
        <div className="select is-dark is-small" Disable style={{ marginTop: "45px", marginRight: "-540px" }}>
         <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px" , position:"fixed"}} disabled> False Negative<BiChevronDown/></span>
        </div>    
        <p style={{color:"white",fontSize:"14px", textAlign:"initial",left: "1160px",top: "412px",position:"fixed"}}>shows the ones where the model predicts negative sentiments when the actual values from the dataset are positives.</p>
        </div> 
        <div className="model-name">
        <p style={{color:"white",fontSize:"20px", left: "974px",top: "480px",fontWeight:"bold",position:"fixed"}}>Static</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "520px",position:"fixed"}}>The Statistic section gives detailed information of the</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "540px",position:"fixed"}}>training process. Accuracies and losses as well as other</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "560px",position:"fixed"}}>related data can be viewed here.</p>

        </div>
        <div className="model-name">
        <p style={{color:"white",fontSize:"20px", left: "974px",top: "600px",fontWeight:"bold",position:"fixed"}}>Train Time</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "640px",position:"fixed"}}>Train time keeps record of the duration it took to create your</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "660px",position:"fixed"}}>your model in the training process,along with the start and </p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "680px",position:"fixed"}}>end time. </p>
        </div>
    <div className="modal-test-wrapper">
      <div modal-content>
      </div>
    </div>
  </div>
  

  );
}