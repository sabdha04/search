import LogoAsabri from '../assets/asabri.png'
import '../style/styleNav.css'
import { Link } from 'react-router-dom';
// import { useState } from 'react';

function Navbar() {

    return (
        <section id='header'>
            <nav>
                <div className='wrapper'>
                    <div className="logo">
                        <img src={LogoAsabri} alt="logo" />
                    </div>
                    <ul className="nav-link">
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li>
                            <a href="">Dropdown</a>
                            <ul className="drop-menu">
                                <li><a href="">Dropdown 1</a></li>
                                <li><a href="">Dropdown 2</a></li>
                                <li><a href="">Dropdown 3</a></li>
                                <li><a href="">Dropdown 4</a></li>
                            </ul>
                        </li>
                        <li><a href="">Mega</a>
                            <div className="mega-box">
                                <div className="content">
                                    <div className="row">
                                        {/* <img src="" alt="" /> */}
                                        <header>Design Service</header>
                                        <ul className="mega-link">
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <header>Design Service</header>
                                        <ul className="mega-link">
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <header>Design Service</header>
                                        <ul className="mega-link">
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <header>Design Service</header>
                                        <ul className="mega-link">
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                            <li><a href="">Drop</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><a href="">Feedback</a></li>
                        <Link to="/search" className="search-link">Search</Link>
                    </ul>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
