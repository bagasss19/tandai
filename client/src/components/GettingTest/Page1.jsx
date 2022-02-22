import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    const[modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
  return(
    <div className="modal-backdrops">
        <div className="model-list">
         <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Test Model</p>
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Dropdown</p>
         <div className="select is-dark is-small" Disable style={{ marginTop: "288px", marginRight: "-628px" }}>
         <span id="ph" className="input is-dark" style={{ width: "125px",height:"35px" , position:"static"}} disabled> Simple</span>
                    </div>
        <p style={{color:"white",fontSize:"16px", left: "974px",top: "216px",position:"fixed"}}>Choose “Simple” for a manually typed sentence, or “Multiple”</p>
        <p style={{color:"white",fontSize:"16px", left: "974px",top: "236px",position:"fixed"}}>to upload multiple sentences in a CSV file.</p>

        </div> 
        <div className="model-name">
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "273px",fontWeight:"bold",position:"fixed"}}>Model ID</p>
         <div className="field" Disable style={{width:"300px"}}>
          <input id="ph" className="input is-dark" placeholder="Model 1" style={{position:"static", marginLeft:"970px", marginTop:"103px"}} disabled/>
        </div>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "363px",position:"fixed"}}>A combination of unique special letters and numbers that </p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "383px",position:"fixed"}}> are generated automatically.</p>
        </div> 
        <div className="model-name">
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "419px",fontWeight:"bold",position:"fixed"}}>Model Words</p>
         <div className="field" style={{width:"300px"}}>
         <input id="ph" className="input is-dark" placeholder="Input your words here" style={{ width: "325px" , position:"static",marginLeft:"970px", marginTop:"95px"}} disabled/>
        </div>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "513px",position:"fixed"}}>Type a sentence here.</p>
        </div> 
    <div className="modal-test-wrapper1">
      <div modal-content>
      </div>
    </div>
  </div>
  

  );
}