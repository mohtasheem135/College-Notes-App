import React from 'react';
import "./addPYQ.css"
import AdminNavbar from '../../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';

const AddPYQ = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            {localStorage.getItem('Name') != "" ? null : navigate("/error")}
            <AdminNavbar />
        </div>
    )
}

export default AddPYQ