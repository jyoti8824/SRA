import React from 'react';
import "./styles.css";
import logo from "../../assets/SRA.png";


function Footer() {
    return (
        <footer className="footer-container">
            <div className='footer-row'>
                <div>
                    <img src={ logo } />
                </div>
                <div>
                    <ul>
                        <li>+91 9922334455</li>
                        <li>studentreportadvisor@support.com</li>
                    </ul>
                </div>
            </div>
            <div className='footer-row'>
                <p>© 2024 Student Report Advisor - All Rights Reserved.</p>
            </div>

        </footer>
    );
}

export default Footer;
