import React, { useEffect, useState } from 'react';
import fireDB from '../../firebase';
import "./upload.css";
import { DataNavigation } from 'react-data-navigation';
import AdminNavbar from '../Admin Panel/Admin Navbar/AdminNavbar';
import { useNavigate } from 'react-router';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState({});
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  

  useEffect(() => {
    fireDB.database().ref().child(`Semester`).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })

  }, [])



  const handleSubmission = async () => {
    console.log(selectedFile)
    const fileRef = fireDB.storage().ref().child(`PDF Folder`).child(`${DataNavigation.getData('semester_name')}`).child(`${DataNavigation.getData('teacher_name')}`).child(`${selectedFile.name}`)
    await fileRef.put(selectedFile, alert(`${selectedFile.name} Uploded Successfully 👍👍👍`), (err) => {
      if (err) {
        console.log(err);
      }
    })
  };



  const selection = async (e) => {

    const links = fireDB.database().ref().child(`Teacher/${e.target.value}`)
    await links.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setValue({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })
    DataNavigation.setData('semester_name', e.target.value);
    console.log(e.target.value);
    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
    // console.log(value);

  }

  const choose = (e) => {
    console.log("THIs-----" + e.target.value);
    DataNavigation.setData('teacher_name', e.target.value);
    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
  }


  return (
    <div>
      {localStorage.getItem('Name') !== "" ? null : navigate("/error")}
      <AdminNavbar />
      <br /><br />

      <p className="label-para-1">Choose under which category you want to add the PDF . . .</p>

      {Object.keys(data).map((id, index) => {
        return (
          <button className="upload-btn" onClick={selection} value={data[id]}>{data[id]}</button>
        )
      })}
      <hr className="line-1"/>
      {/* <p className="label-para-1">Choose where you want to add the PDF . . .</p> */}
      {Object.keys(value).map((id, index) => {
        return (
          <>
         
          <button className="upload-btn-choose" onClick={choose} value={value[id]}>{value[id]}</button>
          </>
        )
      })}
      <hr className="line-2"/>
      <div className="input-upload">
        <input type="file" class="custom-file-input"  name="file" onChange={changeHandler} />
       
        {/* <p className="input-text">Drag and Drop the File here</p> */}
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="display-input">Select a file to show details</p>
        )}
      </div>
      <div>
        <button className="upload-input-btn" onClick={handleSubmission}>Submit</button>
      </div>
    </div>

  )


}

export default FileUploadPage;