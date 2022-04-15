import React, { useState } from 'react';
// import "./adminRegister.css";
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase"
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
// import img_2 from "../../User/Images/VI-4.jpg";

const AddAdmin = () => {

    const navigate = useNavigate();

    const values = {
        name: '',
        email: '',
        password: ''
    }
    const [initialState, setInitialState] = useState("");
    const { name, email, password } = initialState;

    const handelSubmit = (e) => {
        e.preventDefault()
        fireDB.database().ref().child(`Admin Panel of PDF App`).child(`${initialState.name}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        navigate("/adminlogin");
        setInitialState({
            name: "",
            email: "",
            password: ""
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


    function register() {
        navigate("/adminlogin")
    }

    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar/>
            {/* <img src={img_2} className="VI-admin-register-image" alt='admin' /> */}
            <div className="admin-login-body">
                <div className="login-admin-input-container">
                    <form className="login-admin-form">
                        <input className="input-admin-login" name="name" type="text" placeholder="Enter Full Name" onChange={handelInputChange} />
                        <input className="input-admin-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange} />
                        <input className="input-admin-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange} />
                        <input onClick={handelSubmit} className="input-admin-btn" type="submit" value="Register" />
                        {/* <input onClick={register} className="input-admin-btn" type="submit" value="LogIn" /> */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAdmin
