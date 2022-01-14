import React from 'react';
import "./userNavbar.css";
import { useNavigate } from 'react-router';

const UserNavbar = () => {

    const navigate = useNavigate();

    const logout=(e)=>{
        navigate('/');
        localStorage.setItem('Name', "");
        localStorage.setItem('User_Name', "");

    }

    return (
        <div>
            <div className="navbar-user-container">
                <ul className="nav-user-ul">
                    <li className="nav-user-li"><a href="/userhome">Home</a></li>
                    <li className="nav-user-login-li"><a style={{cursor: 'pointer'}} onClick={logout}>Log Out</a></li>
                    <li className="nav-user-login-li-name">{localStorage.getItem('User_Name')}</li>
                    
                </ul>
            </div>
        </div>
    )
}

export default UserNavbar
