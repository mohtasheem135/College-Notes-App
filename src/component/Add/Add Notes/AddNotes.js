import React, { useEffect, useState } from "react";
import fireDB from "../../../firebase";
import "./addNotes.css";
import AdminNavbar from "../../Admin Panel/Admin Navbar/AdminNavbar";
import { useNavigate } from "react-router";

const uploadFileToStorage = (file, filename, path) => {
    console.log(path)
    const storageRef = fireDB.storage().ref();
    const fileRef = storageRef.child(path).child(filename);

    return fileRef.put(file);
};

const AddNotes = () => {
    const navigate = useNavigate();

    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [flag4, setFlag4] = useState(true);
    const [flag5, setFlag5] = useState(false);
    const [flag6, setFlag6] = useState(false);

    const [data, setData] = useState({});
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [fileName, setFileName] = useState('');

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {
        fireDB
            .database()
            .ref()
            .child(`Test Admin/Year`)
            .on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    setData({
                        ...snapshot.val(),
                    });
                } else {
                    snapshot({});
                }
            });
    }, []);

    const selection1 = async (e) => {
        localStorage.setItem("notes_yearName", e.target.value);
        const links = fireDB.database().ref().child(`Test Admin/Department`);
        await links.on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue1({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
        setFlag1(false);
    };

    const selection2 = async (e) => {
        localStorage.setItem("notes_departmentName", e.target.value);
        const links = fireDB
            .database()
            .ref()
            .child(
                `Test Admin/Semester/${localStorage.getItem("notes_yearName")}/${e.target.value
                }`
            );
        await links.on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue2({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
        setFlag2(false);
    };

    const selection3 = (e) => {
        localStorage.setItem("notes_semesterName", e.target.value);

        const links = fireDB
            .database()
            .ref()
            .child(
                `Test Admin/Teacher/${localStorage.getItem(
                    "notes_yearName"
                )}/${localStorage.getItem("notes_departmentName")}/${e.target.value}`
            );
        links.on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue3({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
        setFlag3(false);
    };

    const selection4 = (e) => {
        localStorage.setItem("notes_teacherName", e.target.value);

        e.target.style.backgroundColor = "#ff7b59";
        e.target.style.color = "#ffffff";
        setFlag4(false);
        setFlag5(true);
    };

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setFlag6(true)
        setFileName(event.target.files[0].name)

    };

    const handelNameChange = (e) => {
        setFileName(e.target.value);
    }

    const handleSubmission = async (e) => {

        e.preventDefault();
        const path = `PDF Folder-3/${localStorage.getItem("notes_yearName")}/${localStorage.getItem("notes_departmentName")}/${localStorage.getItem("notes_semesterName")}/${localStorage.getItem("notes_teacherName")}`
        console.log(fileName);
        uploadFileToStorage(selectedFile, fileName, path)
            .then((snapshot) => {
                console.log('File uploaded successfully:', snapshot);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <div>
            {localStorage.getItem("Name") != "" ? null : navigate("/error")}
            <AdminNavbar />

            {flag1 ? (
                <div className="Add-Notes-Box-main">
                    <div className="Add-Notes-Box">
                        {/* <p className="label-para-1">Select the Batch</p> */}
                        <p className="Add-Notes-Box-para-1">Select the Batch</p>
                    </div>
                </div>
            ) : flag2 ? (
                <div className="Add-Notes-Box-main">
                    <div className="Add-Notes-Box">
                        {/* <p className="label-para-1">Select the Batch</p> */}
                        <p className="Add-Notes-Box-para-1">
                            Batch : {localStorage.getItem("notes_yearName")}
                            <p className="Add-Notes-Box-para-1-2">select Department</p>
                        </p>
                    </div>
                </div>
            ) : flag3 ? (

                <div className="Add-Notes-Box-main">
                    <div className="Add-Notes-Box">
                        {/* <p className="label-para-1">Select the Batch</p> */}
                        <p className="Add-Notes-Box-para-1">
                            Batch : {localStorage.getItem("notes_yearName")} <br />
                            Department : {localStorage.getItem("notes_departmentName")} <br />
                            <p className="Add-Notes-Box-para-1-2">Select Semester</p>
                        </p>
                    </div>
                </div>
            ) : flag4 ? (


                <div className="Add-Notes-Box-main">
                    <div className="Add-Notes-Box">
                        {/* <p className="label-para-1">Select the Batch</p> */}
                        <p className="Add-Notes-Box-para-1">
                            Batch : {localStorage.getItem("notes_yearName")} <br />
                            Department : {localStorage.getItem("notes_departmentName")} <br />
                            Semester : {localStorage.getItem("notes_semesterName")} <br />
                            <p className="Add-Notes-Box-para-1-2">Select Teacher</p>
                        </p>
                    </div>
                </div>
            ) : flag5 ? (

                <div className="Add-Notes-Box-main">
                    <div className="Add-Notes-Box">
                        {/* <p className="label-para-1">Select the Batch</p> */}
                        <p className="Add-Notes-Box-para-1">
                            Batch : {localStorage.getItem("notes_yearName")} <br />
                            Department : {localStorage.getItem("notes_departmentName")} <br />
                            Semester : {localStorage.getItem("notes_semesterName")} <br />
                            Professor : {localStorage.getItem("notes_teacherName")}
                        </p>
                    </div>
                </div>
            ) : null}

            {/* Showing the Years */}
            {flag1
                ? Object.keys(data).map((id, index) => {
                    return (
                        <button
                            className="upload-btn"
                            onClick={selection1}
                            value={data[id]}
                        >
                            {data[id]}
                        </button>
                    );
                })
                : null}

            {/* Showing the Departments */}
            {flag2
                ? Object.keys(value1).map((id, index) => {
                    return (
                        <>
                            <button
                                className="upload-btn-choose"
                                onClick={selection2}
                                value={value1[id]}
                            >
                                {value1[id]}
                            </button>
                        </>
                    );
                })
                : null}

            {/* Showing the Semesters */}
            {flag3
                ? Object.keys(value2).map((id, index) => {
                    return (
                        <>
                            <button
                                className="upload-btn-choose"
                                onClick={selection3}
                                value={value2[id]}
                            >
                                {value2[id]}
                            </button>
                        </>
                    );
                })
                : null}

            {/* Showing the Teachers/subjects */}
            {flag4
                ? Object.keys(value3).map((id, index) => {
                    return (
                        <>
                            <button
                                className="upload-btn-choose"
                                onClick={selection4}
                                value={value3[id]}
                            >
                                {value3[id]}
                            </button>
                        </>
                    );
                })
                : null}

            {/* Upload The File */}
            {flag5 ? (
                <div className="input-upload-main">
                    <div className="input-upload">
                        <input
                            type="file"
                            class="custom-file-input"
                            name="file"
                            onChange={changeHandler}
                        />

                        {/* <p className="input-text">Drag and Drop the File here</p> */}
                        {isFilePicked ? (
                            <div>
                                <p className="input-upload-detail">Filename: <b style={{color: 'red'}}>{fileName}</b></p>
                                <p className="input-upload-detail">Filetype: {selectedFile.type}</p>
                                <p className="input-upload-detail">Size in bytes: {selectedFile.size}</p>
                                <p className="input-upload-detail">
                                    lastModifiedDate:{" "}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            // <p className="display-input">Select a file to show details</p>
                            <p className="input-upload-detail">Select a file to show details</p>
                        )}
                    </div>
                </div>
            ) : null}

            {/* Rename the File */}
            {flag6 ?
                <div className="notes-input-fileName-main">
                    <input className="notes-input-fileName" type="text" value={fileName} onChange={handelNameChange} placeholder="please use '.pdf ' extension" />
                    <button onClick={handleSubmission} className="notes-submit-btn">submit</button>
                </div> : null}
            {/* <p className="input-upload-detail">{fileName}</p> */}
        </div>
    );
};

export default AddNotes;
