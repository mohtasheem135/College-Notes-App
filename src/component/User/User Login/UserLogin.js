import React, { useState } from 'react';
import "./userLogin.css"
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase";
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import img_1 from "../Images/VI-1.jpg";



const UserLogin = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");

    const handelSubmit = (e)=>{
        e.preventDefault()

        localStorage.setItem('user_login_roll',loginId.roll);
        localStorage.setItem('User_Name', loginId.name)
        if(loginId.roll ===DataNavigation.getData('User_Login_Roll') && loginId.passCode===DataNavigation.getData('User_Login_Pass_Code')){
            navigate("/userhome")
        } else {
            alert("Incorrect Roll Number or Pass Code");
            window.location.reload();
        }

    }

    const handelInputChange_Roll = (e) => {
        DataNavigation.setData('User_Login_Roll', e.target.value)

        fireDB.database().ref().child(`Profile/${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setLoginId({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }

    const handelInputChange_pass=(e)=>{
        DataNavigation.setData('User_Login_Pass_Code', e.target.value);
    }

    // function register(){
    //     navigate("/userregister")
    // }


    return (
        <div>
            <Navbar/>
            <img src={img_1} className="VI-user-login-image" alt='login' />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                    <input className="input-login" name="roll" type="text" placeholder="Enter Your Roll no." onChange={handelInputChange_Roll} />
                    <input className="input-login" name="passcode" type="text" placeholder="Enter the Pass Code" onChange={handelInputChange_pass} />
                    <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="LogIn" />
                    {/* <input onClick={register} className="input-login input-btn" type="submit" value="Register" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
