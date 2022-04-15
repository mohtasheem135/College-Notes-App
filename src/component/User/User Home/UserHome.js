import React, { useEffect, useState } from 'react';
import fireDB from "../../../firebase";
import "./userHome.css";
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import img_4 from "./Images/VI-6.png"
import img_5 from "./Images/VI-4-1.png"
import img_6 from "./Images/VI-7.png"
import img_7 from "./Images/VI-8.png"
import UserNavbar from '../User Navbar/UserNavbar';

const UserHome = () => {

    const [data, setData] = useState({});
    const [notice, setNotice] = useState({});
    const [date, setDate] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fireDB.database().ref().child(`Test Admin/Semester/${localStorage.getItem('Selected_Year')}/${localStorage.getItem('Selected_Department')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

        fireDB.database().ref().child(`Notice Board/Notice`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setNotice({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
        fireDB.database().ref().child(`Notice Board/Date`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setDate({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
       
    }, [])

    console.log("Notice - -  - -"+notice);
       console.log("Date - -  - -"+date);

    const handelClick=(e)=>{
        console.log(e.target.value);
        DataNavigation.setData('Semester',e.target.value);
        localStorage.setItem('this-Semester', e.target.value)
        navigate("list");
        
    }
    

    return (
        
        <div className="main-home">
            {localStorage.getItem('User_Name')!=="" ? null : navigate("/") }
            {/* {localStorage.getItem('User_Name')!="" ? <UserNavbar/> : <Navbar/> } */}
            {/* <Navbar/> */}
            <UserNavbar />
            
            {/* <img src={img_1} className="bg-img" /> */}
            <div className="notice-section">
                <h1 className="notice-head">Notice</h1>
                {Object.keys(notice).map((id, index) => {
                    
                return(
                    
                    <>
                    <p className="notice-user-para">{notice[id]}<br/><hr/></p>
                    </>
                )
                
            })}
            
            
            </div>
            <div className="option-btn">
            {Object.keys(data).map((id, index) => {
                return(
                    
                    <button className="selection-home" onClick={handelClick} value={data[id]}>{data[id]}</button>
                    
                )
            })}
            </div>

            {/* <img src={img_2} className="vector-image" /> */}
            {/* <img src={img_3} className="gif-image" /> */}
            <img src={img_4} className="vector-plane-image" alt='plane-1' /> 
            <img src={img_5} className="vector-image" alt='vect-1' />
            <img src={img_6} className="vector-plane-image-1" alt='plane-2' />
            <img src={img_7} className="vector-plane-image-2" alt='plane-3' />
            </div>
    )
}

export default UserHome
