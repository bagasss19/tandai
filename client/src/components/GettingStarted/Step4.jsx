import React, { useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import "./Modal.css";

export default function Modal() {
    const[modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
  return(
    <div className="">
        <div className="api-usage">
         <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Help</p>
         <p style={{color:"white",fontSize:"20px", left: "974px",top: "140px",fontWeight:"bold",position:"fixed"}}>Help Feature</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "180px",position:"fixed"}}>Try to help you on every way while you using our product.</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "200px",position:"fixed"}}>This sign button are already put for each pages to help</p>
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "220px",position:"fixed"}}>you configure what was happening.</p>
        </div> 
        <div className="tfl-usage">
         <p style={{color:"white",fontSize:"16px", left: "974px",top: "263px",position:"fixed"}}>PS: (You can find it on corner or right side the page.)</p>
        </div> 
    <div className="modal-content-wrapper3">
      <div modal-content>
      <BiHelpCircle size={400} marginLeft="100px" color="#1A8856"/>
      </div>
    </div>
  </div>
  

  );
}