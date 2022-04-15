import React, { useEffect, useState } from 'react'
import fireDB from '../../../firebase';
import { useNavigate } from 'react-router';
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
import { DataNavigation } from 'react-data-navigation';

const AddDepartment = () => {

    const navigate = useNavigate();

    const [data, setData] = useState("");

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

    const selection = async (e) => {
        DataNavigation.setData('year_name', e.target.value);
        console.log(e.target.value);
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
    }

    const handelInputChange = (e) => {
        // console.log(e.target.value);
        DataNavigation.setData('add_department_name', e.target.value);
    }

    const handelClick = () => {

        fireDB.database().ref().child(`Test Admin/Department`).push(DataNavigation.getData('add_department_name'), (err) => {
            if (err) {
                console.log(err);
                alert(`Some error Occured !!!`);
            } else {
                alert(`${DataNavigation.getData('add_department_name')} added successfully !!!!!`)
                navigate("/add");
            }
        })

        // console.log("this :- "+DataNavigation.getData('year_name'))

    }

    return (
        <div>
            {localStorage.getItem('Name') !== "" ? null : navigate("/error")}
            <AdminNavbar />

            <br /><br />
            {Object.keys(data).map((id, index) => {
                return (
                    <button className="upload-btn" onClick={selection} value={data[id]}>{data[id]}</button>
                )
            })}
            <input onChange={handelInputChange} className="add-input add-semester-input" type="text" placeholder="CSE" />
            <button onClick={handelClick} className="add-btn add-semester-btn">Submit</button>


        </div>
    )
}

export default AddDepartment