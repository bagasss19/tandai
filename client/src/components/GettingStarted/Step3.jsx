import Logo from '../../Assets/Model List.png'
import "./Modal.css";

export default function StartedHomePage3() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="column is-8">
              <figure>
                <br/><br/><br/>
                <img src={Logo} alt="tandai"/>
              </figure>
                </div>  
              <div className="column is-4 has-text-left">
                  <h1 className="is-size-3 title" style={{color:"white"}}>Model List</h1>
                  <h2 className="is-size-4 subtitle" style={{color:"white",margin:"auto"}}>Model Id</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Model ID is a combination of unique special letters and numbers that are generated automatically. The model with the ID “lstmw13” is our baseline model.</p>
                  <br />
                  <h2 className="is-size-4 subtitle" style={{color:"white", margin:"auto"}}>Model Name</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Model Name is used as the display name of the model. It is editable, so that the user can easily recognize which model is which</p>
                  <br />
                  <h2 className="is-size-4 subtitle" style={{color:"white", margin:"auto"}}>Status</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Status provides you the conditions and progresses of the models.</p>
                  <br />
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-success is-normal">Ready</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>The model is ready to be used.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-warning is-normal">On Progress</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>The model is currently being trained and is not available to use yet.</p>
                    </div>
                  </div>  
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-danger is-normal">Error</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>The training ends with an error and the model cannot be used.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>(PS: Please check the dataset uploaded for mismatch (refer to “CSV Convention” section) and/or contact us for further support.)</p>
                    </div>
                  </div>      
              </div>
            </div>
          </div>
      </section>
    </>
  );
}