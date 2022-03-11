import Logo from '../Assets/Train.png'
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function StartedDetailPage() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="column is-8">
              <figure style={{marginTop:"10%"}}>
                <img src={Logo} alt="tandai"/>
              </figure>
                </div>  
              <div className="column is-4 has-text-left">
                  <h1 className="is-size-5 title" style={{color:"white"}}>Train Model</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto", fontWeight:"bold"}}>Model ID</h2>
                  <br />
                  <div className="field" Disable style={{width:"300px"}}>
                    <input id="ph" className="input is-dark" placeholder="Model ID" disabled/>
                  </div>
                  <p style={{color:"white",fontSize:"14px"}}>A combination of unique special letters and numbersthat are generated automatically.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto",fontWeight:"bold"}}>Model Name</h2>
                  <br />
                  <div className="field" Disable style={{width:"300px"}}>
                    <input id="ph" className="input is-dark" placeholder="Model Name" disabled/>
                  </div>
                  <p style={{color:"white",fontSize:"14px"}}>The Display name of model.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto", fontWeight:"bold"}}>Choose File..</h2>
                  <br />
                  <div className="field" style={{width:"300px"}}>
                    <span id="ph" className="input is-dark" style={{ width: "325px"}} disabled><AiOutlineCloudUpload/> &nbsp; Choose Your File</span>
                  </div>
                  <p style={{color:"white",fontSize:"14px"}}>Upload your CSV file here. Please refer to the documentation for convention and formats required.</p>   
              </div>
            </div>
          </div>
      </section>
    </>
  );
}



  //   <div className="modal-backdrop">
  //       <div className="model-list">
  //        <p style={{color:"white",fontSize:"30px", left: "974px",top: "90px",fontWeight:"bold",position:"fixed"}}>Train Model</p>
  //       </div> 
  //       <div className="model-name">
  //        <p style={{color:"white",fontSize:"20px", left: "974px",top: "153px",fontWeight:"bold",position:"fixed"}}>Model ID</p>
  //        <div className="field" Disable style={{width:"300px"}}>
  //         <input id="ph" className="input is-dark" placeholder="Model 1" style={{position:"static", marginLeft:"970px", marginTop:"193px"}} disabled/>
  //       </div>
  //        <p style={{color:"white",fontSize:"16px", left: "974px",top: "243px",position:"fixed"}}>A combination of unique special letters and numbers</p>
  //        <p style={{color:"white",fontSize:"16px", left: "974px",top: "263px",position:"fixed"}}>that are generated automatically. </p>
  //       </div> 
  //       <div className="model-name">
  //        <p style={{color:"white",fontSize:"20px", left: "974px",top: "303px",fontWeight:"bold",position:"fixed"}}>Model Name</p>
  //        <div className="field" Disable style={{width:"300px"}}>
  //         <input id="ph" className="input is-dark" placeholder="Model Name" style={{position:"static", marginLeft:"970px", marginTop:"96px"}} disabled/>
  //       </div>
  //        <p style={{color:"white",fontSize:"16px", left: "974px",top: "393px",position:"fixed"}}>The display name of the model.</p>
  //       </div> 
  //       <div className="model-name">
  //        <p style={{color:"white",fontSize:"20px", left: "974px",top: "433px",fontWeight:"bold",position:"fixed"}}>Choose file..</p>
  //        <div className="field" style={{width:"300px"}}>
  //        <span id="ph" className="input is-dark" style={{ width: "325px" , position:"static",marginLeft:"970px", marginTop:"78px"}} disabled><AiOutlineCloudUpload/> &nbsp; Choose Your File</span>
  //       </div>
  //        <p style={{color:"white",fontSize:"16px", left: "974px",top: "523px",position:"fixed"}}>Upload your CSV file here. Please refer to the documentation</p>
  //        <p style={{color:"white",fontSize:"16px", left: "974px",top: "543px",position:"fixed"}}>for convention and formats required.</p>
  //       </div> 
  //   <div className="modal-test-train">
  //     <div modal-content>
  //     </div>
  //   </div>
  // </div>
