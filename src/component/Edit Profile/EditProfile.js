import React, { useEffect, useState } from 'react';
import fireDB from '../../firebase';
import UserNavbar from '../User/User Navbar/UserNavbar';
import "./editprofile.css";
import { useNavigate } from 'react-router';

const EditProfile = () => {

  const navigate = useNavigate();

  const values = {
    name: '',
    pemail: '',
    cemail: '',
    roll: '',
    semester: '',
    department: '',
    college: '',
    address: '',
    passcode: ''
  }
  const [initialState, setInitialState] = useState({});
  const { name, pemail, cemail, roll, semester, department, college, address, passcode } = initialState;

  useEffect(() => {
    fireDB.database().ref().child(`Test Admin/Students DB/${localStorage.getItem('Selected_Year')}/${localStorage.getItem('Selected_Department')}/${localStorage.getItem('user_login_roll')}`).on("value", (snapshot) => {
        if (snapshot.val() != null) {
            setInitialState({
                ...snapshot.val(),
            });
        } else {
            snapshot({});
        }
    });
    
}, []);


  const handelSubmit = (e) => {

    e.preventDefault();
    // console.log(initialState);

    fireDB.database().ref().child(`Test Admin`).child('Students DB').child(`${localStorage.getItem('Selected_Year')}`).child(`${localStorage.getItem('Selected_Department')}`).child(`${initialState.roll}`).set(initialState, (err) => {
      if (err) {
        console.log(err);
      } else {
        alert("Updated Successfully 👍👍👍");
        navigate("/myprofile")
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


  return (
    <div>
      {localStorage.getItem('User_Name')!=="" ? null: navigate("/") }
      <UserNavbar /> 
      <br /><br /><br />
      <div className="Add-Profile-container">
        <input className="add-input-1" name="name" type="text" value={name} onChange={handelInputChange} placeholder="Name" />
        <input className="add-input-1 add-input-2" type="email" name="pemail" value={pemail} onChange={handelInputChange} placeholder="Personal Email" />
        <input className="add-input-1 add-input-2" type="email" name="cemail" value={cemail} onChange={handelInputChange} placeholder="College Email" />
        {/* <input className="add-input-1 add-input-2" type="text" name="roll" value={roll} onChange={handelInputChange} placeholder="Roll No." /> */}
        <input className="add-input-1 add-input-2" type="text" name="semester" value={semester} onChange={handelInputChange} placeholder="Semester" />
        <input className="add-input-1 add-input-2" type="text" name="department" value={department} onChange={handelInputChange} placeholder="Department" />
        <input className="add-input-1 add-input-2" type="text" name="college" value={college} onChange={handelInputChange} placeholder="College" />
        <input className="add-input-1 add-input-2" type="text" name="address" value={address} onChange={handelInputChange} placeholder="Address" />
        <input className="add-input-1 add-input-2" type="text" name="passcode" value={passcode} onChange={handelInputChange} placeholder="Pass Code" />
        <button onClick={handelSubmit} className="profile-button">Update</button>
      </div>
    </div>
  );
};

export default EditProfile;
