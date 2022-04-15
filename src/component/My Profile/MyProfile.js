import React, { useEffect, useState } from 'react';
import fireDB from '../../firebase';
import UserNavbar from '../User/User Navbar/UserNavbar';
import "./myprofile.css"
import img_1 from "./Images/profile-1.png";
import { useNavigate } from 'react-router';

const MyProfile = () => {

  const navigate = useNavigate();

  const [data, setData] = useState("");

  useEffect(() => {
    fireDB.database().ref().child(`Test Admin/Students DB/${localStorage.getItem('Selected_Year')}/${localStorage.getItem('Selected_Department')}/${localStorage.getItem('user_login_roll')}`).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });

  }, []);

  console.log(data.roll)


  return (
    <div>
      {localStorage.getItem('User_Name')!=="" ? null: navigate("/") }
      <UserNavbar />
      <div className="myprofile-img-container">
        <img className="myprofile-img" src={img_1} alt="profile" />
      </div>
      <div className="myprofile-head-container">
        <p className="myprofile-head">Hello, {data.name} 👋</p>
      </div>
      <div className="myprofile-details-container">
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Name :- </p>
          <p className="myprofile-details-data"> {data.name}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Personal Email :- </p>
          <p className="myprofile-details-data"> {data.pemail}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">College Email :- </p>
          <p className="myprofile-details-data"> {data.cemail}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Semester :- </p>
          <p className="myprofile-details-data"> {data.semester}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Roll No. :- </p>
          <p className="myprofile-details-data"> {data.roll}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Department :- </p>
          <p className="myprofile-details-data"> {data.department}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">College :- </p>
          <p className="myprofile-details-data"> {data.college}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Address :- </p>
          <p className="myprofile-details-data"> {data.address}</p>
        </div>
        <div className="myprofile-details">
          <p className="myprofile-details-tag">Pass Code :- </p>
          <p className="myprofile-details-data"> {data.passcode}</p>
        </div>
      </div>




    </div>
  );
};

export default MyProfile;
