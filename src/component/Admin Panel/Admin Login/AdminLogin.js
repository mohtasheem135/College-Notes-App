import React, { useState } from 'react';
import "./adminRegister.css"
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase";
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import img_1 from "../../User/Images/VI-3.jpg";


const AdminLogin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState("");

    const values = {
        name: '',
        email: '',
        password: ''
    }
    const [initialState, setInitialState] = useState("");
    const { name, email, password } = initialState;




    const handelSubmit = (e) => {
        e.preventDefault()
        // console.log(initialState.password)

        console.log(DataNavigation.getData('Login_Name'))
        console.log(DataNavigation.getData('Login_Email'))
        console.log(DataNavigation.getData('Login_Password'));

        localStorage.setItem('Name', DataNavigation.getData('Login_Name'))

        {
            Object.keys(data).map((id, index) => {
                console.log(data[id])
                if (data[id].email === DataNavigation.getData('Login_Email') && data[id].password === DataNavigation.getData('Login_Password')) {
                    // navigate(`/upload`)
                    navigate(`/add`)
                }
                else {
                    alert("Incorrect Password or Email")
                    window.location.reload();
                    // navigate("/")
                }
            })
        }
    }
    const handelInputChange_Name = (e) => {
        DataNavigation.setData('Login_Name', e.target.value);
        fireDB.database().ref().child(`Admin Panel of PDF App`).child(`${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }

    const handelInputChange_Email = (e) => {
        DataNavigation.setData('Login_Email', e.target.value)
    }

    const handelInputChange_Password = (e) => {
        DataNavigation.setData('Login_Password', e.target.value)
    }




    function register() {
        navigate("/adminregister")
    }
    return (
        <div>
            <Navbar />
            <img src={img_1} className="VI-login-image" alt='login' />
            <div className="admin-login-body">
                <div className="login-admin-input-container">
                    <form className="login-admin-form">
                        <input className="input-admin-login" name="name" type="email" placeholder="Enter Name" onChange={handelInputChange_Name} />
                        <input className="input-admin-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange_Email} />
                        <input className="input-admin-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange_Password} />
                        <input onClick={handelSubmit} className=" input-admin-btn" type="submit" value="LogIn" />
                        {/* <input onClick={register} className=" input-admin-btn" type="submit" value="Register" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
