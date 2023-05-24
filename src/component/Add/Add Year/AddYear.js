import React from 'react';
import fireDB from '../../../firebase';
import { useEffect, useState } from 'react/cjs/react.development';
import { DataNavigation } from 'react-data-navigation';
import img_1 from "../Images/VI-1.jpg";
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';;




const AddYear = () => {

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
        DataNavigation.setData('add_year', e.target.value);
    }

    const handelClick = () => {
        fireDB.database().ref().child('Test Admin/Previous Years').push(DataNavigation.getData('add_year'), (err) => {
            if (err) {
                console.log(err);
                alert(`Some error Occured !!!`);
            } else {
                alert(`${DataNavigation.getData('add_year')} added successfully !!!!!`)
                navigate("/add");
            }
        })


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
            <img src={img_1} className="upload-image" alt='image' />
            <input onChange={handelInputChange} className="add-input add-semester-input" type="text" placeholder="Eg. 2021 - 2025" />
            <button onClick={handelClick} className="add-btn add-semester-btn">Submit</button>
            {/* <button onClick={addCategory} className="add-btn add-semester-btn">Add Category</button> */}
            {/* <button onClick={addYear} className="add-btn add-semester-btn">Add Year</button> */}

        </div>
    )
}

export default AddYear
