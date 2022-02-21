import { useState } from "react";
import Page1 from './Page1'
import Page2 from './Page2'
import './Modal.css'
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";


// import Logo from '../Assets/tandai_hires.png'


export default function App() {
  const [page, setPage] = useState(1);

  function goNextPage() {
    if (page === 2) return;
    setPage((page) => page + 1);
  }

  function goPrevPage() {
    if (page === 3) return;
    setPage((page) => page - 1);
  }

  function submit() {
    setPage(0)
  }


function OnboardingOne({ }) {
    const newData = {};
  
    return (
      <div>
       <Page1/>
      </div>
    );
  }
  
  function OnboardingTwo({ }) {
    return (
    <div>
      <Page2/>
    </div>
    );
    
  }

  return (
    <>
    <div className="Apps" style={{marginTop:"-110px"}}>
    {/* the content goes here */}
    <div>
      {page === 1 && <OnboardingOne/>}
      {page === 2 && <OnboardingTwo/>}
    </div>
    {page === 1 && (
    <div>
      <span className="button" onClick={goNextPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginTop:"760px", marginLeft:"820px", border:"none"}} >Next <IoIosArrowRoundForward size={32}/> </span>
      {/* {page === 1 &&  (
      <span className="button" onClick={goPrevPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginLeft:"620px", marginTop:"650px", border:"none"}} disabled> <IoIosArrowRoundBack size={32}/> Back </span>
    )} */}
    </div>
    )}

    {page === 2 && (
    <div>
      <span className="button" onClick={goPrevPage} style={{color:"white",backgroundColor:"#333333",position:"fixed", marginLeft:"620px", marginTop:"760px", border:"none"}} ><IoIosArrowRoundBack size={32}/> Back  </span>
      {/* <button className="tag is-success is-medium" onClick={()=>setCloseModal(false)}style={{height: "40px" ,width: "91px",borderRadius: "4px",padding: "10px, 20px, 10px, 20px", position:"fixed", marginTop:"650px", marginLeft:"820px"}} >Finish </button> */}
    </div>     
    )}
    {/* the progress bar goes here */}
     <div>
      <progress class="progress is-success" max="2" value={page} style={{position:"fixed", marginTop:"690px" , marginLeft:"125px", width:"759px", height:"20px"}} />
    </div>
 
  </div> 
    </>
  );
}
