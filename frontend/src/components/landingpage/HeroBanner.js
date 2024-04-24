import React from "react";
import heroBannerImg from "../../assets/Herobanner1.png";
import { Link, useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate()

  return (
    <section className='heroBanner-container'>
      <div className='heroBanner-wrapper'>
        <div className='heroBanner-left'>
          <img src={ heroBannerImg } />
        </div>
        <div className='heroBanner-right'>
          <h1>
            Student Report <span>Advisor</span>
          </h1>
          <p>
            Student Report Advisor is here to help with your academic journey.
            Elevate your grade with proper guidance, polished reports and
            Academic Excellence with the functionality "A Report with
            Recommendation".
          </p>

          <div className='heroBanner-logins'>
            <button onClick={()=>navigate("/choose")}>
              Login
            </button>

            <p>
              Don't have an account? <Link to='/Adminregister'>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
