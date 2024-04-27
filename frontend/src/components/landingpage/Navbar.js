import React from 'react';
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/studentreportadvisor.png";
function Navbar() {
    return (
        <header className='header-container'>
            <nav className='navbar-container'>
                <img src={ logo } alt="logo" className='logo' />
                <ul className='navigation-links'>
                    <li className="navigation-link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="navigation-link">
                        <Link to="/choose">

                            Login

                        </Link>

                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
