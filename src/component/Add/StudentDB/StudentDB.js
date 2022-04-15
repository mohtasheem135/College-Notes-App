import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar'
import "./studentDB.css";
import { useNavigate } from 'react-router';
import fireDB from '../../../firebase';
import { DataNavigation } from 'react-data-navigation';
import Popup from 'reactjs-popup';

const StudentDB = () => {

    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [value, setValue] = useState("");
    const [depart, setDepart] = useState("");

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
        console.log("Year : " + e.target.value);
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
    }

    const selection2 = (e) => {
        console.log("Department : " + e.target.value);
        // setValue(e.target.value);
        DataNavigation.setData('Department_Name', e.target.value)
        e.target.style.backgroundColor = "#e61515";
        e.target.style.color = "#ffffff";

        fireDB.database().ref().child(`Test Admin/Students DB_2/${DataNavigation.getData('year_name')}/${e.target.value}`)
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


const show=(e)=> {
    console.log("KKKKK : "+e.target.value)
}

    return (

        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />
            <br />

            {Object.keys(data).map((id, index) => {
                return (
                    <button className="upload-btn" onClick={selection1} value={data[id]}>{data[id]}</button>
                )
            })}
            <br />

            {Object.keys(value).map((id, index) => {
                return (
                    <>

                        <button className="upload-btn-choose" onClick={selection2} value={value[id]}>{value[id]}</button>
                    </>
                )
            })}

            <hr /><br />

            {Object.keys(depart).map((id, index) => {
                return (
                    <>

                        {/* <button className="upload-btn-choose" value={depart[id].name}>{depart[id].name} - {depart[id].roll}</button>
                        <button className="upload-btn-choose" value={depart[id].roll}>{depart[id].roll}</button> */}
                        <div className='db-list'>

                            <ul className='db-list-name'>{depart[id].name}</ul>
                            {/* <button className='db-list-btn'>View</button> */}
                            <Popup value={depart[id].roll} trigger={<button value={depart[id].roll} className='db-list-btn' onClick={show}> View</button>} position="left">
                                <div className='main-db'>
                                    <p className='main-db-p'>Name :- {depart[id].name}</p>
                                    <p className='main-db-p'>Roll number :- {depart[id].roll}</p>
                                </div>
                                
                            </Popup>
                        </div>
                    </>
                )
            })}



        </div>
    )
}

export default StudentDB