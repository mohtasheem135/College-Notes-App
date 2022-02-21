import React, { useState } from 'react';
import "./addNote.css";
import fireDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';
import AdminNavbar from '../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import img_1 from "./Images/VI-1.jpg";

const AddNote = () => {

    const [notice, setNotice] = useState("");
    const navigate = useNavigate();


    const handelInput = (e) => {
        DataNavigation.setData("notice", e.target.value);
        setNotice(e.target.value);
    }

    const handelSubmission = () => {

        // Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        // Push the Notice Data

        console.log("THIS - -- " + notice);
        fireDB.database().ref().child(`Notice Board/Notice`).push(notice, (err)=>{
            if (err) {
                console.log(err);
            } else {
                alert(`Notice Added Successfully !!!`);
                window.location.reload();
            }
        })

        fireDB.database().ref().child(`Notice Board/Date`).push(today, (err)=>{
            if (err) {
                console.log(err);
            } else {
                // alert(`Notice Added Successfully !!!`);
            }
        })

        
    }


    return (
        <div>
            {localStorage.getItem('Name')!="" ? null : navigate("/error") }
            <AdminNavbar/>
            <img src={img_1} className="Notice-img"/>
            <div className="textarea">
            <textarea onChange={handelInput} className="input-notice" type="text" placeholder="Type the Notice here" />
            <br/>
            <button className="notice-btn" onClick={handelSubmission}>Add</button>
            </div>
        </div>
    )
}

export default AddNote
