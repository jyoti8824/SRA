import React from "react";
import "./styles.css";
import { AiFillAccountBook } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";

function AboutCard() {
  return (
    <div className='about-container-card'>
      <div className='about-card'>
        <span>
          <PiStudentDuotone />
        </span>
        <p>Seamless Students Engagement</p>
        <p>95.12%</p>
        <p>Engage with students in a more personal and direct manner.</p>
      </div>
      <div className='about-card'>
        <span>
          <MdOutlinePeopleAlt />
        </span>
        <p>Fostering Student-Teacher Communication</p>
        <p>95.22%</p>
        <p>For supporting a student's academic journey.</p>
      </div>
      <div className='about-card'>
        <span>
          <MdOutlineSecurity />
        </span>
        <p>Security and confidentiality</p>
        <p>99%</p>
        <p>Secured and protected from unauthorized access.</p>
      </div>
    </div>
  );
}

export default AboutCard;
