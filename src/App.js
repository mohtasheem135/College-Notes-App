import React from "react";
import { Route, Routes } from "react-router";
import Home from "./component/Home/Home";
import Upload from "./component/upload/Upload"
import List from "./component/List/List";
import Add from "./component/Add/Add";
import AddNote from "./component/Add Note/AddNote";
import AdminNavbar from "./component/Admin Panel/Admin Navbar/AdminNavbar";
import AdminLogin from "./component/Admin Panel/Admin Login/AdminLogin";
import AdminRegister from "./component/Admin Panel/Admin Login/AdminRegister";
import NotAdmin from "./component/Error Page/NotAdmin";
import UserLogin from "./component/User/User Login/UserLogin";
import UserRegister from "./component/User/User Register/UserRegister";
import UserHome from "./component/User/User Home/UserHome";
import AddSemester from "./component/Add Semester/AddSemester";
import PYQ from "./component/PYQ/PYQ";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="userhome/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="adminnavbar" element={<AdminNavbar />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="adminregister" element={<AdminRegister />} />
        <Route path="error" element={<NotAdmin />} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="userregister" element={<UserRegister />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/addsem" element={<AddSemester />} />
        <Route path="/pyq" element={<PYQ />} />
      </Routes>
    </div>
  )
}

export default App
