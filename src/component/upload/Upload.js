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
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };



  useEffect(() => {
    fireDB.database().ref().child(`Test Admin/Year`).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })

  }, [])

  const selection1 = async (e) => {

    const links = fireDB.database().ref().child(`Test Admin/Department`)
    await links.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setValue({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })
    DataNavigation.setData('Year_Name', e.target.value);
    console.log("Year : - " + e.target.value);
    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
    // console.log(value);

  }

  const selection2 = async (e) => {

    const links = fireDB.database().ref().child(`Test Admin/Semester/${DataNavigation.getData('Year_Name')}/${e.target.value}`)
    await links.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setValue2({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })
    DataNavigation.setData('department_name', e.target.value);
    console.log("Department : - " + e.target.value);
    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
    // console.log("Year_Name"+DataNavigation.getData('Year_Name'));

  }

  const selection3 = (e) => {
    console.log("Semester : - " + e.target.value);
    DataNavigation.setData('semester_name', e.target.value);

    const links = fireDB.database().ref().child(`Test Admin/Teacher/${DataNavigation.getData('Year_Name')}/${DataNavigation.getData('department_name')}/${e.target.value}`)
    links.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setValue3({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
    })

    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
  }

  const selection4 = (e) => {
    console.log("Teacher : - " + e.target.value);
    DataNavigation.setData('teacher_name', e.target.value);

    e.target.style.backgroundColor = "#ff7b59";
    e.target.style.color = "#ffffff";
  }

  const handleSubmission = async () => {
    console.log(selectedFile)
    const fileRef = fireDB.storage().ref().child(`PDF Folder-3`).child(`${DataNavigation.getData('Year_Name')}`).child(`${DataNavigation.getData('department_name')}`).child(`${DataNavigation.getData('semester_name')}`).child(`${DataNavigation.getData('teacher_name')}`).child(`${selectedFile.name}`)
    await fileRef.put(selectedFile, alert(`${selectedFile.name} Uploded Successfully 👍👍👍`), (err) => {
      if (err) {
        console.log(err);
      }
    })
  };

  return (
    <div>
      {localStorage.getItem('Name') !== "" ? null : navigate("/error")}
      <AdminNavbar />

      <h1>Upload Question</h1>

      <p className="label-para-1">Click the button under which you want to add the file.....</p>

      {Object.keys(data).map((id, index) => {
        return (
          <button className="upload-btn" onClick={selection1} value={data[id]}>{data[id]}</button>
        )
      })}
      <hr className="line-1" />
      {/* <p className="label-para-1">Choose where you want to add the PDF . . .</p> */}
      {Object.keys(value).map((id, index) => {
        return (
          <>

            <button className="upload-btn-choose" onClick={selection2} value={value[id]}>{value[id]}</button>
          </>
        )
      })}
      <hr className='line-1' />
      {Object.keys(value2).map((id, index) => {
        return (
          <>

            <button className="upload-btn-choose" onClick={selection3} value={value2[id]}>{value2[id]}</button>
          </>
        )
      })}
      <hr className="line-2" />
      {Object.keys(value3).map((id, index) => {
        return (
          <>

            <button className="upload-btn-choose" onClick={selection4} value={value3[id]}>{value3[id]}</button>
          </>
        )
      })}
      <hr className="line-2" />
      <div className="input-upload">
        <input type="file" class="custom-file-input" name="file" onChange={changeHandler} />

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