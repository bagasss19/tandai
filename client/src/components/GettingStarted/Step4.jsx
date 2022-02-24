import { BiHelpCircle } from "react-icons/bi";

export default function StartedHomePage4() {
  return(
    <>
      <section class="section">
          <div class="container">
            <div className="columns">
              <div className="column is-8">
              <figure style={{marginTop:"-30px"}}>
                <br/><br/><br/>
                <BiHelpCircle size={400} marginLeft="100px" color="#1A8856" height={300}/>
              </figure>
              <br/><br/><br/> <br/><br/>
                </div>  
              <div className="column is-4 has-text-left" style={{marginLeft:"-5%"}}>
                <br /><br />
                  <h1 className="is-size-5 title" style={{color:"white"}}>Help</h1>
                  <h2 className="is-size-6 subtitle" style={{color:"white",margin:"auto"}}>Help Feature</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Try to help you on every way while you using our product.This sign button are already put for each pages to helpyou configure what was happening.</p>
                  <br />
                  <p style={{color:"white",fontSize:"14px"}}>PS: (You can find it on corner or right side the page.)</p>
                  <br />
                  <h2 className="is-size-6 subtitle" style={{color:"white", margin:"auto"}}>Status</h2>
                  <p style={{color:"white",fontSize:"14px"}}>Status provides you the conditions and progresses of the models.</p>
                  <br />      
              </div>
            </div>
          </div>
      </section>
    </>
  );
}