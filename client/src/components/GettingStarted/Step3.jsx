import Logo from '../../Assets//Usage.png'


export default function StartedHomePage3() {
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
              <div className="column is-4 has-text-left" style={{marginLeft:"-5%", marginTop:"10px"}}>
                  <h1 className="is-size-5 title" style={{color:"white"}}>Usage</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto"}}>Api Usage</h2>
                  <br />
                  <p style={{color:"white",fontSize:"14px"}}>This is the hit counter for the sentiment detection API. Basically it counts how many times the API has been hit to analyze sentences.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto"}}>Transfer Learning</h2>
                  <br />
                  <p style={{color:"white",fontSize:"14px"}}>This is the dataset counter for the “Transfer Learning” feature. It accumulates how many rows of sentences have been uploaded by the user.</p>
                  <br /> 
                  <br /><br /><br /><br /><br /><br /><br /><br /><br />
              </div>
            </div>
          </div>
      </section>
    </>
  );
}