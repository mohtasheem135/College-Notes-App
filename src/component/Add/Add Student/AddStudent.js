import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase"
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
// import img_2 from "../Images/VI-2.jpg";
import Select from 'react-select';
import { DataNavigation } from 'react-data-navigation';


const AddStudent = () => {

    const navigate = useNavigate();

    const [initialState, setInitialState] = useState({
        name: '',
        roll: '',
        passcode: '000'
    });
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");


    const options1 = [
        { value: '2019 - 2023', label: '2019 - 2023' },
        { value: '2020 - 2024', label: '2020 - 2024' },
        { value: '2021 - 2025', label: '2021 - 2025' },
        { value: '2022 - 2026', label: '2022 - 2026' },
    ];

    const options2 = [
        { value: 'CSE', label: 'CSE' },
        { value: 'IT', label: 'IT' },
        { value: 'ECE', label: 'ECE' },
        { value: 'CE', label: 'CE' },
    ];



    const handelSubmit = (e) => {

        e.preventDefault();
        fireDB.database().ref().child(`Test Admin/Students DB/${localStorage.getItem('Register_Year')}/${localStorage.getItem('Register_Department')}`).child(`${initialState.roll}`).set(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        alert(initialState.name + " is Added Successfully to the DB")
        setInitialState({
            name: '',
            roll: '',
            passcode: '000'
        })

        fireDB.database().ref().child(`Test Admin/Students DB_2/${localStorage.getItem('Register_Year')}/${localStorage.getItem('Register_Department')}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })

    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }

    const handelOptionSelect1 = (selectedOption) => {
        console.log("Sesion : " + selectedOption.value);
        setSelectedOption1(selectedOption.value);
        DataNavigation.setData('Year', selectedOption.value)
        localStorage.setItem('Register_Year', selectedOption.value)
        // document.write(`Option selected:`, selectedOption.value);
    }

    const handelOptionSelect2 = (selectedOption) => {
        console.log("Department : " + selectedOption.value);
        setSelectedOption2(selectedOption.value);
        DataNavigation.setData('Department', selectedOption.value)
        localStorage.setItem('Register_Department', selectedOption.value)
        // document.write(`Option selected:`, selectedOption.value);
    }

    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />
            {/* <img src={img_2} className="VI-user-register-image" alt='register' /> */}
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                        <Select
                            // value={selectedOption}
                            onChange={handelOptionSelect1}
                            options={options1}
                        // inputValue= {DataNavigation.getData('Year')}
                        />
                        <Select
                            // value={selectedOption}
                            onChange={handelOptionSelect2}
                            options={options2}
                        // inputValue= {DataNavigation.getData('Year')}
                        />
                        <input className="input-login" value={initialState.name} name="name" type="text" placeholder="Enter Full Name" onChange={handelInputChange} />

                        <input className="input-login" value={initialState.roll} name="roll" type="text" placeholder="Enter Roll Number" onChange={handelInputChange} />
                        <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent
