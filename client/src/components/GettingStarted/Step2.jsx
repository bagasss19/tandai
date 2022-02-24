import Logo from '../../Assets/Model List.png'


export default function StartedHomePage2() {
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
                  <h1 className="is-size-5 title" style={{color:"white"}}>Model List</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto"}}>Action</h2>
                  <br />
                  <p style={{color:"white",fontSize:"14px"}}>This section consists of a list of actionable buttons.</p>
                  <br /><br />
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-success is-normal">detail</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>This button will take you to the “Detail” page, where you can look out value of modele that already done to test and train.</p>
                    </div>
                  </div>  
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-success is-normal">Test</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>This button will take you to the “Test” page, where you can try out the models to analyze sentiments on a manually inputted sentence or a CSV file containing multiple sentences.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-success is-normal">Train</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>This button will take you to the “Train” page, where you can create a new model based on a previous one, using your own dataset.</p>
                    </div>
                  </div>  
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-danger is-normal">Delete</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>Use this feature if you want to delete a model. Please note that the baseline model “lstmw13” cannot be deleted.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3">
                        <span className="tag is-normal">Delete</span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>Try to delete it ? it was Disabled delete buttonfor our base line model "lstmw13".</p>
                    </div>
                  </div>   
              </div>
            </div>
          </div>
      </section>
    </>
  );
}