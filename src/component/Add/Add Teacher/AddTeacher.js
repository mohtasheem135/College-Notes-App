import React, { useEffect } from 'react';
import "./addTeacher.css"
import fireDB from '../../../firebase';
import { DataNavigation } from 'react-data-navigation';
import { useState } from 'react/cjs/react.development';
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import img_1 from "../Images/VI-1.jpg";


const AddTeacher = () => {

    const [subName, setSubName] = useState("")
    const [data, setData] = useState("");
    const [value, setValue] = useState("");
    const [depart, setDepart] = useState("");
    const navigate = useNavigate();


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


    }, [])

    const handleInputChange = (e) => {
        setSubName(e.target.value);
    }

    const selection1 = async (e) => {

        const links = fireDB.database().ref().child(`Test Admin/Department`)
        await links.on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

        DataNavigation.setData('year_name', e.target.value);
        console.log("jjjjjjjjjjg" + e.target.value);
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
    }

    const selection2 = (e) => {
        console.log(e.target.value);
        // setValue(e.target.value);
        DataNavigation.setData('Department_Name', e.target.value)
        e.target.style.backgroundColor = "#e61515";
        e.target.style.color = "#ffffff";

        fireDB.database().ref().child(`Test Admin/Semester/${DataNavigation.getData('year_name')}/${e.target.value}`)
            .on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    setDepart({
                        ...snapshot.val()
                    })
                } else {
                    snapshot({});
                }
            })
    }

    const selection3 = (e) => {
        console.log(e.target.value);
        DataNavigation.setData('Semester_Name', e.target.value)
        e.target.style.backgroundColor = "#e61515";
        e.target.style.color = "#ffffff";
    }

    const handleSubmit = () => {
        console.log(subName);
        DataNavigation.setData('category-name', subName);
        const dataRef = fireDB.database().ref().child(`Test Admin/Teacher/${DataNavigation.getData('year_name')}/${DataNavigation.getData('Department_Name')}/${DataNavigation.getData('Semester_Name')}`)
        dataRef.push(subName, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert(`${subName} Added Successfully !!!`);
                setSubName("");
                navigate("/add");
            }
        })
    }


    const addSemester = () => {
        navigate("/addsem");
    }

    const addYear = () => {
        navigate("/addYear")
    }




    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />
            {/* <img src={img_1} className="upload-image" /> */}
            

            <br /><br />
            {Object.keys(data).map((id, index) => {
                return (
                    <button className="upload-btn" onClick={selection1} value={data[id]}>{data[id]}</button>
                )
            })}

            <br /> <br />

            {Object.keys(value).map((id, index) => {
                return (
                    <>

                        <button className="upload-btn-choose" onClick={selection2} value={value[id]}>{value[id]}</button>
                    </>
                )
            })}

            <br /><br />

            {Object.keys(depart).map((id, index) => {
                return (
                    <>

                        <button className="upload-btn-choose" onClick={selection3} value={depart[id]}>{depart[id]}</button>
                    </>
                )
            })}

            {/* <div className="choose-add-option">
                {Object.keys(data).map((id, index) => {
                    return (
                        <button className="choose-add-btn" onClick={choose} value={data[id]}>{data[id]}</button>
                    )
                })}
            </div> */}
            <br /><br /><br /><br />
            <input onChange={handleInputChange} className="add-input" value={subName} type="text" placeholder="Add the Teacher" />
            <button onClick={handleSubmit} className="add-btn">Submit</button>
            {/* <button onClick={addSemester} className="add-btn">Add Semester</button> */}
            {/* <button onClick={addYear} className="add-btn">Add Year</button> */}



        </div>
    )
}

export default AddTeacher
