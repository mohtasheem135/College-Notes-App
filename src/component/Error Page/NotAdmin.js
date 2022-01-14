import React from 'react';
import { useNavigate } from 'react-router';

const NotAdmin = () => {

    const navigate = useNavigate();

    const goBack=()=>{
        navigate("/");
    }
    return (
        <div>
            <h1>You are not an admin, Please go back to to the home page and reconsider your choices !!! </h1>
            <br/><br/><br/><br/><br/><br/>
            <button onClick={goBack}>Home</button>
        </div>
    )
}

export default NotAdmin
