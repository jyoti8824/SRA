import React from "react";
import "./styles.css"
import { AiFillAccountBook } from "react-icons/ai";

function AboutCard() {
  return (
    <div className='about-container-card'>
      <div className='about-card'>
        <span><AiFillAccountBook/></span>
        <p>Traffic growth went up to</p>
        <p>600%</p>
        <p>in one year using Whatsapp</p>
      </div>
      <div className='about-card'>
      <span><AiFillAccountBook/></span>
        <p>Customer satisfaction rate reaches</p>
        <p>98.9%</p>
        <p>with 100% resolution within 48 hours</p>
      </div>
      <div className='about-card'>
      <span><AiFillAccountBook/></span>
        <p>Managing requests via Whatsapp</p>
        <p>10x</p>
        <p>more than before</p>
      </div>
    </div>
  );
}

export default AboutCard;
