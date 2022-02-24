import Logo from '../Assets/Detail.png'
import { BiChevronDown } from "react-icons/bi";

export default function StartedDetailPage() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="column is-8">
              <figure style={{marginTop:"20%"}}>
                <img src={Logo} alt="tandai" style={{height:"200px"}}/>
              </figure>
                </div>  
              <div className="column is-4 has-text-left">
                  <h1 className="is-size-5 title" style={{color:"white"}}>Model Detail</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto", fontWeight:"bold"}}>Review</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Review is a comparison of the sentiment values between the dataset and the results from the model post-training. There are 3 filters available to navigate the results better: </p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto", fontWeight:"bold"}}>Dropdown</h2>
                  <br />
                  <div className="columns">
                    <div className="column is-3">
                        <span id="ph" className="input is-dark" style={{ width: "105px",height:"35px"}} disabled> Default<BiChevronDown/></span>
                    </div>
                    <div className="column is-2"></div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>Shows all the results.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-5">
                        <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px" }} disabled> False Positive<BiChevronDown/></span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>shows the ones where the model predicts positive sentiments when the actual values from the dataset are negatives. </p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-5">
                        <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px"}} disabled> False Negative<BiChevronDown/></span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"14px"}}>shows the ones where the model predicts negative sentiments when the actual values from the dataset are positives.</p>
                    </div>
                  </div>
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto", fontWeight:"bold"}}>Static</h2>
                  <p style={{color:"white",fontSize:"14px"}}>The Statistic section gives detailed information of the training process. Accuracies and losses as well as other related data can be viewed here.</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto", fontWeight:"bold"}}>Train Time</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Train time keeps record of the duration it took to create your model in the training process, along with the start and end time.</p>
                  <br />    
              </div>
            </div>
          </div>
      </section>
    </>
  );
}