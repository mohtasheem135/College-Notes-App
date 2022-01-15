import { render } from '@testing-library/react';
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import fireDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';
import Navbar from '../Navbar/Navbar';
import UserNavbar from "../User/User Navbar/UserNavbar"
import "./list.css";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import img_1 from "./Images/VI-2.jpg";

const List = () => {
    const [data, setData] = useState({});
    const [values, setValues] = useState({});
    const [dLink, setDLink] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        // console.log(DataNavigation.getData('Semester'))

            fireDB.database().ref().child(`Teacher/${DataNavigation.getData('Semester')}`).on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    setData({
                        ...snapshot.val()
                    })
                } else {
                    snapshot({});
                }
            })
    }, [])

    const view = async (e) => {
        console.log("THISSS   -"+DataNavigation.getData('teacher_name_folder'));

        // {<h1><a href={e.target.value} >{e.target.value}</a></h1>}
        const link = fireDB.storage().ref().child(`PDF Folder/${DataNavigation.getData('Semester')}/${DataNavigation.getData('teacher_name_folder')}/${e.target.value}`)
        await link.getDownloadURL().then((URL => {
            console.log(URL);
            // setDLink(URL);
            window.open(URL)
            // navigate(URL)
            DataNavigation.setData('name', URL);
        }));
    }

    const selection = (e) => {
        console.log(e.target.value);
        DataNavigation.setData('teacher_name_folder', e.target.value);

        fireDB.storage().ref().child(`PDF Folder/${DataNavigation.getData('Semester')}/${e.target.value}`).listAll().then((snap => {
            // console.log(snap._delegate.items[0].name);
            setValues(snap._delegate.items)
        }))
        console.log(values)
    }

    return (
        
        <div>
            
            {localStorage.getItem('User_Name')!="" ? <UserNavbar /> : <Navbar/> }
            <h2 className="List-head">~ {DataNavigation.getData('Semester')} ~</h2><hr />
            <img src={img_1} className="List-image" />
            {/* <div className="list-item"> */}
            {Object.keys(data).map((id, index) => {
                return (
                    <button className="list-btn" onClick={selection} value={data[id]}>{data[id]}</button>
                )
            })}
            <br/><br/>

            <div className="list-option-btn">
                <h1 className="notes-head">Notes</h1>
            {Object.keys(values).map((id, index) => {
                // console.log(data[id].name);
                return (
                    // <h2>{data[id].name}</h2>
                    <>
                    
                    <button className="list-button" onClick={view} value={values[id].name}>{values[id].name}</button>
                    </>
                )
            })}
            </div>

        </div>
    )
}

export default List
