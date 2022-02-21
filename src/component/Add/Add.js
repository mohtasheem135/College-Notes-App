import React, { useEffect } from 'react';
import "./add.css"
import fireDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';
import { useState } from 'react/cjs/react.development';
import AdminNavbar from '../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import img_1 from "./Images/VI-1.jpg";


const Add = () => {

    const [subName, setSubName] = useState("")
    const [data, setData] = useState("");
    const [value, setValue] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fireDB.database().ref().child(`Semester`).on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })


    }, [])

    const handleInputChange = (e) => {
        setSubName(e.target.value);
    }

    const choose = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
        e.target.style.backgroundColor = "#e61515";
        e.target.style.color = "#ffffff";
    }

    const handleSubmit = () => {
        console.log(subName);
        DataNavigation.setData('category-name', subName);
        const dataRef = fireDB.database().ref().child(`Teacher/${value}`)
        dataRef.push(subName, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert(`${subName} Added Successfully !!!`);
                setSubName("");
            }
        })
    }

    const addSemester=()=>{
        navigate("/addsem");
    }




    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />
            <img src={img_1} className="upload-image" />
            <br /><br />

            <div className="choose-add-option">
                {Object.keys(data).map((id, index) => {
                    return (
                        <button className="choose-add-btn" onClick={choose} value={data[id]}>{data[id]}</button>
                    )
                })}
            </div>
            <br /><br /><br /><br />
            <input onChange={handleInputChange} className="add-input" value={subName} type="text" placeholder="Add the Teacher" />
            <button onClick={handleSubmit} className="add-btn">Submit</button>
            <button onClick={addSemester} className="add-btn">Add Semester</button>


        </div>
    )
}

export default Add
