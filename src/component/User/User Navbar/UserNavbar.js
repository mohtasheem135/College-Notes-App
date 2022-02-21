import React from 'react';
import "./userNavbar.css";
import { useNavigate } from 'react-router';
import img from "../Images/profile-1.png"

const UserNavbar = () => {

    const navigate = useNavigate();

    const logout = (e) => {
        navigate('/');
        localStorage.setItem('Name', "");
        localStorage.setItem('User_Name', "");

    }

    const MyProfile = () => {
        navigate("/myprofile")
    }

    const EditProfile = () => {
        navigate("/editprofile")
    }

    return (
        <div>
            <div className="navbar-user-container">
                <ul className="nav-user-ul">
                    <li className="nav-user-li"><a href="/userhome">Home</a></li>
                    {/* <li className="nav-user-login-li"><a style={{ cursor: 'pointer' }} onClick={logout}>Log Out</a></li> */}
                    <div className="dropdown">
                        <li className="nav-user-login-li-name dropdown"><img src={img} className="profile-img" alt='profile'/>  {localStorage.getItem('User_Name')}</li>
                        <div >
                            <button onClick={MyProfile} className="dropdown-content">My Profile</button>
                            <button onClick={EditProfile} className="dropdown-content dropdown-content-1">Edit Profile</button>
                            <button onClick={logout} className="dropdown-content dropdown-content-2">Log Out</button>
                        </div>
                    </div>

                </ul>

            </div>


        </div>
    )
}

export default UserNavbar
