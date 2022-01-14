import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import fireDB from "../../firebase";
import "./home.css";
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import img_1 from "./Images/BG-3.jpg"
import img_2 from "./Images/VI-2.png"
import img_3 from "./Images/giphy-2.gif"
import img_4 from "./Images/giphy-1.gif"
import img_5 from "./Images/VI-4.jpg"
import UserNavbar from '../User/User Navbar/UserNavbar';

const Home = () => {

    const [data, setData] = useState({});
    const [notice, setNotice] = useState({});
    const [date, setDate] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fireDB.database().ref().child(`Semester`).on("value", (snapshot) => {
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
        navigate("list");
        
    }
    

    return (
        <div className="main-home">
            {/* {localStorage.getItem('User_Name')!="" ? <UserNavbar/> : <Navbar/> } */}
            <Navbar/>
            
            {/* <img src={img_1} className="bg-img" /> */}
            <div className="notice-home-section">
                <h1 className="notice-home-head">Notice</h1>
                {Object.keys(notice).map((id, index) => {
                    
                return(
                    
                    <>
                    <p className="notice-home-main-para">{notice[id]}</p>
                    {/* <hr/> */}
                    </>
                )
                
            })}
            {/* <p className="notice-main-para">END</p> */}
            
            </div>
            <div className="option-btn">
            {/* {Object.keys(data).map((id, index) => {
                return(
                    
                    <button className="selection-home" onClick={handelClick} value={data[id]}>{data[id]}</button>
                    
                )
            })} */}
            </div>

            {/* <img src={img_2} className="vector-home-image" /> */}
            <img src={img_5} className="vector-home-image" />
            {/* <img src={img_3} className="gif-home-image" /> */}
            {/* <img src={img_4} className="gif-home-image-1" /> */}
            
            </div>
    )
}

export default Home
