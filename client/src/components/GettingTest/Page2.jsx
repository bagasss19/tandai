import Logo from '../../Assets/api\ testing.png'
import { AiOutlineCloudUpload } from "react-icons/ai";


export default function StartedTestPage2() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="column is-8">
              <figure>
                <br/><br/><br/>
                <img src={Logo} alt="tandai" style={{height:"300px"}}/>
              </figure>
                </div>  
              <div className="column is-4 has-text-left" style={{marginLeft:"-5%"}}>
                  <h1 className="is-size-5 title" style={{color:"white"}}>Test Model</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto", fontWeight:"bold"}}>Dropdown</h2>
                  <br />
                  <div className="select is-dark is-small" Disable>
                       <span className="input is-dark" style={{ width: "125px",height:"35px"}} disabled> Multiple</span>
                  </div> <br /><br />
                  <p style={{color:"white",fontSize:"14px"}}>Choose “Simple” for a manually typed sentence, or “Multiple” to upload multiple sentences in a CSV file.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto",fontWeight:"bold"}}>Model ID</h2>
                  <br />
                  <div className="field" Disable style={{width:"300px"}}>
                    <input id="ph" className="input is-dark" placeholder="Model 1" disabled/>
                  </div>
                  <p style={{color:"white",fontSize:"14px"}}>A combination of unique special letters and numbers that are generated automatically.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto",fontWeight:"bold"}}>Model Words</h2>
                  <br />
                  <div className="field" style={{width:"300px"}}>
                    <span id="ph" className="input is-dark" style={{ width: "325px"}} disabled><AiOutlineCloudUpload/> &nbsp; Choose Your File</span>
                  </div>
                  <p style={{color:"white",fontSize:"14px"}}>Upload your CSV file here. Please refer to the documentation for convention and formats required.</p>
                  <br />      
              </div>
            </div>
          </div>
      </section>
    </>
  );
}