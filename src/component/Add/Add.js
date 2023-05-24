import React, { useEffect } from 'react';
import "./add.css"
import fireDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';
import { useState } from 'react/cjs/react.development';
import AdminNavbar from '../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';
import img_1 from "./Images/VI-2.jpg";


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

    const addSemester = () => {
        navigate("/addsem");
    }

    const addYear = () => {
        navigate("/addYear")
    }

    const addTeacher = () => {
        navigate("/addTeacher")
    }

    const AddAdmin = () => {
        navigate('/addadmin');
    }

    const addStudent = () => {
        navigate('/addstudent')
    }

    const studentDB = () => {
        navigate('/studentdb')
    }
    const uploadNotes = () => {
        navigate('/upload')
    }
    const uploadQuestions = () => {
        navigate('/uploadquestions')
    }




    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />

            <img src={img_1} className='addimg_1' />

            <div className='add-container'>

                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        View the students Database
                    </p>
                    <br />
                    <button onClick={studentDB} className='add-ct-btn'>View</button>
                </div>

                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        You can add the New Year here.....
                    </p>
                    <br />
                    <button onClick={addYear} className='add-ct-btn'>Add Year</button>
                </div>

                <div className='add-box add-box-2'>
                    <p className='add-para'>
                        You can Add new semester here...
                    </p>
                    <br />
                    <button onClick={addSemester} className='add-ct-btn'>Add Semester</button>
                </div>
                <div className='add-box add-box-1'>
                    <p className='add-para'>
                        Add Subject/Teacher name...
                    </p>
                    <br />
                    <button onClick={addTeacher} className='add-ct-btn'>Add Teacher</button>
                </div>


                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        Add the New Admin ....
                    </p>
                    <br />
                    <button onClick={AddAdmin} className='add-ct-btn'>Add Admin</button>
                </div>
                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        You can add the students here.....
                    </p>
                    <br />
                    <button onClick={addStudent} className='add-ct-btn'>Add Student</button>
                </div>
                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        You can upload the notes here.....
                    </p>
                    <br />
                    <button onClick={uploadNotes} className='add-ct-btn'>Upload Notes</button>
                </div>
                <div className='add-box add-box-3'>
                    <p className='add-para'>
                        You can upload the question paper here.....
                    </p>
                    <br />
                    <button onClick={uploadQuestions} className='add-ct-btn'>Upload Questions</button>
                </div>
            </div>

        </div>
    )
}

export default Add
