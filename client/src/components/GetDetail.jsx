import Logo from '../Assets/detail1.png'
import Logo2 from '../Assets/detail2.png'
import Logo3 from '../Assets/detail3.png'
import { BiChevronDown } from "react-icons/bi";

export default function StartedDetailPage() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="columns">
              <div class="column is-one-quarter">
              </div>
              <div class="column is-half">
                 <figure >
                    <img src={Logo} alt="tandai" style={{height:"200px", width:"650px"}}/>
                  </figure>
                  <figure >
                    <img src={Logo2} alt="tandai" style={{height:"197px", width:"297px"}}/>
                  </figure>
                  <figure >
                    <img src={Logo3} alt="tandai" style={{height:"197px", width:"297px"}}/>
                  </figure>
              </div>
              <div class="column is-one-quarter">
              </div>
              </div> 
              <div className="column is-6-tablet has-text-left">
                  <h1 className="is-size-5 subtitle" style={{color:"white"}}>Model Detail</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto", fontWeight:"bold"}}>Review</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Review is a comparison of the sentiment values between the dataset and the results from the model post-training. There are 3 filters available to navigate the results better: </p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto", fontWeight:"bold"}}>Dropdown</h2>
                  <div className="columns">
                    <div className="column is-3">
                        <span id="ph" className="input is-dark" style={{ width: "105px",height:"35px"}} disabled> Default<BiChevronDown/></span>
                    </div>
                    <div className="column is-1"></div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"12px"}}>Shows all the results.</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-4">
                        <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px" }} disabled> False Positive<BiChevronDown/></span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"12px"}}>shows the ones where the model predicts positive sentiments when the actual values from the dataset are negatives. </p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-4">
                        <span id="ph" className="input is-dark" style={{ width: "150px",height:"35px"}} disabled> False Negative<BiChevronDown/></span>
                    </div>
                    <div className="column">
                      <p style={{color:"white",fontSize:"12px"}}>shows the ones where the model predicts negative sentiments when the actual values from the dataset are positives.</p>
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