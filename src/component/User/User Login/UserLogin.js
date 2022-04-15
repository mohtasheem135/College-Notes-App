import React, { useState } from 'react';
import "./userLogin.css"
import { useNavigate } from 'react-router';
import fireDB from "../../../firebase";
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import img_1 from "../Images/VI-1.jpg";
import Select from 'react-select';



const UserLogin = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
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
        e.preventDefault()

        localStorage.setItem('user_login_roll', loginId.roll);
        localStorage.setItem('User_Name', loginId.name)

        // && loginId.passCode === DataNavigation.getData('User_Login_Pass_Code')
        // Pass Code is Disabeled for now !!!!!


        if (localStorage.getItem('User_Login_Roll') == null || localStorage.getItem('Selected_Year') == null || localStorage.getItem('Selected_Department') == null) {
            alert("Don't Leave it blank...\nFill it Properly...");
        }
        else {
            if (loginId.roll === localStorage.getItem('User_Login_Roll') && loginId.passcode === DataNavigation.getData('User_Login_Pass_Code')) {
                navigate("/userhome")
            } else {
                alert("Try Again");
                window.location.reload();
            }
        }

    }

    const handelInputChange_Roll = (e) => {
        DataNavigation.setData('User_Login_Roll', e.target.value)
        localStorage.setItem('User_Login_Roll', e.target.value)

        fireDB.database().ref().child(`Test Admin/Students DB/${localStorage.getItem('Selected_Year')}/${localStorage.getItem('Selected_Department')}/${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setLoginId({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }

    const handelInputChange_pass = (e) => {
        DataNavigation.setData('User_Login_Pass_Code', e.target.value);
        localStorage.setItem('User_Login_Pass_Code', e.target.value);
    }


    const handelOptionSelect1 = (selectedOption) => {
        console.log("Sesion : " + selectedOption.value);
        setSelectedOption1(selectedOption.value);
        DataNavigation.setData('Year', selectedOption.value)
        localStorage.setItem('Selected_Year', selectedOption.value)
        // document.write(`Option selected:`, selectedOption.value);
    }

    const handelOptionSelect2 = (selectedOption) => {
        console.log("Department : " + selectedOption.value);
        setSelectedOption2(selectedOption.value);
        DataNavigation.setData('Department', selectedOption.value)
        localStorage.setItem('Selected_Department', selectedOption.value)
        // document.write(`Option selected:`, selectedOption.value);
    }


    return (
        <div>
            <Navbar />
            <img src={img_1} className="VI-user-login-image" alt='login' />
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
                        <input className="input-login" name="roll" type="text" placeholder="Enter Your Roll no." onChange={handelInputChange_Roll} />
                        <input className="input-login" name="passcode" type="text" placeholder="Enter the Pass Code" onChange={handelInputChange_pass} />
                        <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="LogIn" />
                        {/* <input onClick={register} className="input-login input-btn" type="submit" value="Register" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
