import React from 'react';
import "./navbar.css";

const Navbar = () => {
    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    <li className="nav-li"><a href="/">Home</a></li>
                    {/* <li className="nav-li"><a href="/upload">Upload</a></li>
                    <li className="nav-li"><a href="/add">Add</a></li>
                    <li className="nav-li"><a href="/addnote">Add Note</a></li> */}
                    <li className="nav-login-li"><a href="/adminlogin">Admin Login</a></li>
                    <li className="nav-login-li"><a href="/userlogin">Student Login</a></li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar
