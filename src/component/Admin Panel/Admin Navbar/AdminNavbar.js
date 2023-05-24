import React from 'react';
import "./adminNavbar.css";
import { useNavigate } from 'react-router';
import { DataNavigation } from 'react-data-navigation';

const AdminNavbar = () => {
    
    const navigate = useNavigate();

    const logout=(e)=>{
        navigate('/');
        localStorage.setItem('Name', "");
        // localStorage.setItem('Selected_Year', null)
        // localStorage.setItem('Selected_Department', null)
        // localStorage.setItem('User_Login_Roll', null)
        localStorage.getItem('User_Login_Pass_Code', "")
        localStorage.removeItem('Selected_Department')
        localStorage.removeItem('Selected_Year')
        localStorage.removeItem('User_Login_Roll')

    }
    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    {/* <li className="nav-li nav-li-upload"><a href="/upload">Upload</a></li> */}
                    <li className="nav-li nav-li-category"><a href="/add">Add</a></li>
                    <li className="nav-li nav-li-notice"><a href="/addnote" >Notice</a></li>
                    <li className="nav-login-li nav-li-logout"><a style={{cursor: 'pointer'}} onClick={logout}>Log Out</a></li>

                </ul>
            </div>
        </div>
    )
}

export default AdminNavbar
