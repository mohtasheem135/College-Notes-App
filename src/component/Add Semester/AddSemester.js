import React from 'react';
import img_1 from "../Add/Images/VI-1.jpg";
import AdminNavbar from '../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import "./addSemester.css";
import { DataNavigation } from 'react-data-navigation';
import fireDB from '../../firebase';
import { useEffect, useState } from 'react/cjs/react.development';


const AddSemester = () => {

    const navigate = useNavigate();
    const [data, setData] = useState("");

    useEffect(() => {
        fireDB.database().ref().child(`Semester`).on("value", (snapshot) => {
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
        // console.log(e.target.value);
        DataNavigation.setData('add_semester_name', e.target.value);
    }

    const handelClick = () => {
        fireDB.database().ref().child('Semester').push(DataNavigation.getData('add_semester_name'), (err) => {
            if (err) {
                console.log(err);
                alert(`Some error Occured !!!`);
            } else {
                alert(`${DataNavigation.getData('add_semester_name')} added successfully !!!!!`)
                navigate("/add");
            }
        })

    }

    const addCategory = () => {
        navigate("/add");
    }
    return (
        <div>
            {localStorage.getItem('Name') !== "" ? null : navigate("/error")}
            <AdminNavbar />
            <img src={img_1} className="upload-image" alt='image' />
            <input onChange={handelInputChange} className="add-input add-semester-input" type="text" placeholder="Eg. 4th Semester" />
            <button onClick={handelClick} className="add-btn add-semester-btn">Submit</button>
            <button onClick={addCategory} className="add-btn add-semester-btn">Add Category</button>

        </div>
    )
}

export default AddSemester
