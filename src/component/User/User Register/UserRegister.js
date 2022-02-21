import React, { useState } from 'react';
import "./userRegister.css";
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase"
import Navbar from '../../Navbar/Navbar';
import img_2 from "../Images/VI-2.jpg";

const UserRegister = () => {

    const navigate = useNavigate();

    // const values = {
    //     name: '',
    //     roll: ''
    // }
    const [initialState, setInitialState] = useState("");
    // const { name, roll } = initialState;

    const handelSubmit = (e) => {
        e.preventDefault();
        // console.log(initialState);
        fireDB.database().ref().child(`User Panel of PDF App`).child(`${initialState.roll}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        navigate("/userlogin");
        setInitialState({
            name: '',
            roll: ''
        })
        // console.log(initialState.email)
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }


    // function register() {
    //     navigate("/userlogin")
    // }

    return (
        <div>
            <Navbar/>
            <img src={img_2} className="VI-user-register-image" alt='register' />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                        <input className="input-login" name="name" type="text" placeholder="Enter Full Name" onChange={handelInputChange} />
                        <input className="input-login" name="roll" type="text" placeholder="Enter Your Class Roll Number" onChange={handelInputChange} />
                        {/* <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange} /> */}
                        {/* <input className="input-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange} /> */}
                        <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="Register" />
                        {/* <input onClick={register} className="input-login input-btn" type="submit" value="LogIn" /> */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
