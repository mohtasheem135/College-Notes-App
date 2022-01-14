import React from 'react';
import "./adminNavbar.css";
import { useNavigate } from 'react-router';

const AdminNavbar = () => {
    
    const navigate = useNavigate();

    const logout=(e)=>{
        navigate('/');
        localStorage.setItem('Name', "");

    }
    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    <li className="nav-li nav-li-upload"><a href="/upload">Upload</a></li>
                    <li className="nav-li nav-li-category"><a href="/add">Category</a></li>
                    <li className="nav-li nav-li-notice"><a href="/addnote" >Notice</a></li>
                    <li className="nav-login-li nav-li-logout"><a style={{cursor: 'pointer'}} onClick={logout}>Log Out</a></li>

                </ul>
            </div>
        </div>
    )
}

export default AdminNavbar
