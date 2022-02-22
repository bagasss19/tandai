import { useState } from "react";
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import './Modal.css'
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";



// import Logo from '../Assets/tandai_hires.png'


export default function App() {
  const [page, setPage] = useState(1);

  function goNextPage() {
    if (page === 4) return;
    setPage((page) => page + 1);
  }

  function goPrevPage() {
    if (page === 5) return;
    setPage((page) => page - 1);
  }

  function submit() {
    setPage(0)
  }


function OnboardingOne({ }) {
    return (
      <div>
       <Step1/>
      </div>
    );
  }
  
  function OnboardingTwo({ }) {
    return (
    <div>
      <Step2/>
    </div>
    );
    
  }
  
  function OnboardingThree({ }) {
    return (
      <div>
      <Step3/>
    </div>
    );
  }

  function OnboardingFour({ }) {
    return (
      <div>
      <Step4/>
    </div>
    );
  }
  

  return (
    <>
    <div className="Apps" style={{marginTop:"-75px"}}>
    {/* the content goes here */}
    <div>
      {page === 1 && <OnboardingOne/>}
      {page === 2 && <OnboardingTwo/>}
      {page === 3 && <OnboardingThree/>}
      {page === 4 && <OnboardingFour/>}
    </div>
    {page !== 4 && (
    <div>
      <span className="button" onClick={goNextPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginTop:"720px", marginLeft:"850px", border:"none"}} >Next <IoIosArrowRoundForward size={32}/> </span>
      {page !== 1 &&  (
      <span className="button" onClick={goPrevPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginTop:"720px",marginLeft:"620px", border:"none"}} > <IoIosArrowRoundBack size={32}/> Back </span>
    )}
      {/* {page === 1 &&  (
      <span className="button" onClick={goPrevPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginLeft:"620px", marginTop:"650px", border:"none"}} disabled> <IoIosArrowRoundBack size={32}/> Back </span>
    )} */}
    </div>
    )}

    {page === 4 && (
    <div>
      <span className="button" onClick={goPrevPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginTop:"720px",marginLeft:"620px", border:"none"}} > <IoIosArrowRoundBack size={32}/> Back </span>
      {/* <button className="tag is-success is-medium" onClick={()=>setCloseModal(false)}style={{height: "40px" ,width: "91px",borderRadius: "4px",padding: "10px, 20px, 10px, 20px", position:"fixed", marginTop:"650px", marginLeft:"820px"}} >Finish </button> */}
    </div>     
    )}
    {/* the progress bar goes here */}
     <div>
      <progress class="progress is-success" max="4" value={page} style={{ position:"fixed", marginTop:"670px" , marginLeft:"85px", width:"862px", height:"20px"}} />
    </div>
  </div> 
    </>
  );
}
