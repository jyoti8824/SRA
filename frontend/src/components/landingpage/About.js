import React from 'react';
import Accordian from './Accordian';
import "./styles.css";
import AboutCard from './AboutCard';

function About() {
    return (
        <section className='about-container'>
            <AboutCard/>
            <Accordian />

        </section>
    );
}

export default About;
