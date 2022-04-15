import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import fireDB from "../../firebase";
import "./home.css";
import img_5 from "./Images/VI-4.jpg";
import countapi from "countapi-js";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Home = () => {
    const [data, setData] = useState({});
    const [notice, setNotice] = useState({});
    const [date, setDate] = useState({});
    const [count, setCount] = useState("");

    useEffect(() => {
        fireDB.database().ref().child(`Semester`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });

        fireDB.database().ref().child(`Notice Board/Notice`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setNotice({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
        fireDB.database().ref().child(`Notice Board/Date`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setDate({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, []);

    console.log("Notice - -  - -" + notice);
    console.log("Date - -  - -" + date);

    useEffect(() => {
        countapi.visits("global").then((result) => {
            console.log(result.value);
            setCount(result.value);
        });
    }, []);

    

    return (
        <div className="main-home">
            <Navbar />
            {/* <VisibilityIcon className="viewIcon" /> */}
            {/* <h3 className="views">{count}</h3> */}
            <div className="notice-home-section">
                <h1 className="notice-home-head">Notice</h1>
                {Object.keys(notice).map((id, index) => {
                    return (
                        <>
                            <p className="notice-home-main-para">{notice[id]}</p>
                        </>
                    );
                })}
            </div>
            <div className="option-btn">

            </div>
            <img src={img_5} className="vector-home-image" alt="home" />
            <div className="footer-Home-container">
                <p className="foot-para">&copy; Mohtasheem Ejaz</p>
            </div>
        </div>
    );
};

export default Home;
