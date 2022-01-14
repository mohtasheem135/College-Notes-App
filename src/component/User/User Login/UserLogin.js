import React, { useState } from 'react';
import "./userLogin.css"
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase";
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import img_1 from "../Images/VI-1.jpg";



const UserLogin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState("");

    const values = {
        name:'',
        roll:''
    }
    const [initialState, setInitialState] = useState("");
    const { name, roll } = initialState;




    const handelSubmit = (e)=>{
        e.preventDefault()
        // console.log(initialState.password)

        console.log(DataNavigation.getData('User_Login_Name'))
        console.log(DataNavigation.getData('User_Login_Roll'))

        

        // fireDB.database().ref().child(`User Panel of PDF App`).child(`${DataNavigation.getData('User_Login_Roll')}`).on("value", (snapshot) => {
        //     if (snapshot.val() != null) {
        //         setData({
        //             ...snapshot.val()
        //         })
        //     } else {
        //         snapshot({});
        //     }
        // })
        // console.log(data)
        {Object.keys(data).map((id, index)=>{
            console.log("THISSSSSS ------"+data[id].name)
            localStorage.setItem('User_Name', data[id].name)
            if(data[id].roll==DataNavigation.getData('User_Login_Roll') ){
                navigate(`/userhome`)
            }
            else {
                alert("Incorrect Roll Number")
                window.location.reload();
                // navigate("/")
            }
        })}

        
    }


    // const handelInputChange = (e) => {
    //     let { name, value } = e.target;
    //     setInitialState({
    //         ...initialState,
    //         [name]: value,
    //     })
    //     // console.log(initialState.email)
    // }


    const handelInputChange_Roll = (e) => {
        DataNavigation.setData('User_Login_Roll', e.target.value)

        fireDB.database().ref().child(`User Panel of PDF App`).child(`${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }

    


    function register(){
        navigate("/userregister")
    }
    return (
        <div>
            <Navbar/>
            <img src={img_1} className="VI-user-login-image" />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                    {/* <input className="input-login" name="name" type="text" placeholder="Enter Name" onChange={handelInputChange_Name} /> */}
                    <input className="input-login" name="roll" type="text" placeholder="202010xx" onChange={handelInputChange_Roll} />
                    {/* <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange_Email} /> */}
                    {/* <input  className="input-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange_Password} /> */}
                    <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="LogIn" />
                    {/* <input onClick={register} className="input-login input-btn" type="submit" value="Register" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
