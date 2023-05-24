import React from 'react';
import img_1 from "../Images/VI-1.jpg";
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import "./addSemester.css";
import { DataNavigation } from 'react-data-navigation';
import fireDB from '../../../firebase';
import { useEffect, useState } from 'react/cjs/react.development';


const AddSemester = () => {

    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        fireDB.database().ref().child(`Test Admin/Year`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }, []);

    const handelInputChange = (e) => {
        DataNavigation.setData('add_semester_name', e.target.value);
    }

    const handelClick = () => {

        fireDB.database().ref().child(`Test Admin/Semester/${DataNavigation.getData('year_name')}/${DataNavigation.getData('department')}`).push(DataNavigation.getData('add_semester_name'), (err) => {
        // fireDB.database().ref().child(`Test Admin/Questions Semester`).push(DataNavigation.getData('add_semester_name'), (err) => {
            if (err) {
                console.log(err);
                alert(`Some error Occured !!!`);
            } else {
                alert(`${DataNavigation.getData('add_semester_name')} added successfully !!!!!`)
                navigate("/add");
            }
        })
    }

    const selection = async (e) => {
        DataNavigation.setData('year_name', e.target.value);
        console.log("Year : "+ e.target.value);
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
        
        fireDB.database().ref().child(`Test Admin/Department`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }

    const choose = (e) => {
        DataNavigation.setData('department', e.target.value);
        console.log(e.target.value);
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
    }

    const addCategory = () => {
        navigate("/add");
    }

    const addYear = () => {
        navigate("/addYear");
    }

    return (
        <div>
            {localStorage.getItem('Name') !== "" ? null : navigate("/error")}
            <AdminNavbar />

            <br />
            {Object.keys(data).map((id, index) => {
                return (
                    <button className="upload-btn-choose" onClick={selection} value={data[id]}>{data[id]}</button>
                )
            })}
            <hr/>
            {Object.keys(value).map((id, index) => {
                return (
                    <>

                        <button className="upload-btn-choose" onClick={choose} value={value[id]}>{value[id]}</button>
                    </>
                )
            })}
            
            <br /><br /><br /><br />
            <input onChange={handelInputChange} className="add-input" type="text" placeholder="Eg. 5th Semester" />
            <button onClick={handelClick} className="add-btn">Submit</button>

        </div>
    )
}

export default AddSemester
