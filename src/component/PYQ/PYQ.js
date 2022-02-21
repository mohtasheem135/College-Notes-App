import React, { useEffect, useState } from 'react';
import { DataNavigation } from 'react-data-navigation';
import fireDB from '../../firebase';
import "./pyq.css";
import Navbar from '../Navbar/Navbar';

const PYQ = () => {

    const [data, setData] = useState({});
    const [values, setValues] = useState({});

    useEffect(() => {

        // console.log(DataNavigation.getData('Semester'))

        fireDB.database().ref().child(`Teacher/PYQ`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }, [])

    const view = async (e) => {
        // console.log(DataNavigation.getData('teacher_name_folder'));

        // {<h1><a href={e.target.value} >{e.target.value}</a></h1>}
        const link = fireDB.storage().ref().child(`PDF Folder/PYQ/${DataNavigation.getData('PYQ_sem_name_folder')}/${e.target.value}`)
        await link.getDownloadURL().then((URL => {
            console.log(URL);
            // setDLink(URL);
            window.open(URL)
            // navigate(URL)
            DataNavigation.setData('name', URL);
        }));
    }

    const selection = (e) => {
        console.log(e.target.value);
        DataNavigation.setData('PYQ_sem_name_folder', e.target.value);

        fireDB.storage().ref().child(`PDF Folder/PYQ/${e.target.value}`).listAll().then((snap => {
            // console.log(snap._delegate.items[0].name);
            setValues(snap._delegate.items)
        }))
        console.log(values)
    }

    return (
        <div>
            <Navbar />
            <div className="list-btn-container-pyq">
                {Object.keys(data).map((id, index) => {
                    return (
                        <button className="list-btn list-btn-pyq" onClick={selection} value={data[id]}>{data[id]}</button>
                    )
                })}
            </div>

            <div className="list-option-btn list-option-btn-pyq">
                <h1 className="notes-head"> <p className="notes-head-name">{DataNavigation.getData('PYQ_sem_name_folder')}</p> ~ Papers</h1>
                {Object.keys(values).map((id, index) => {
                    // console.log(data[id].name);
                    return (
                        // <h2>{data[id].name}</h2>
                        <>

                            <button className="list-button list-button-pyq" onClick={view} value={values[id].name}>{values[id].name}</button>
                        </>
                    )
                })}
            </div>

            <div className="footer-container footer-container-pyq">
                <p className="foot-para foot-para-pyq">&copy; Mohtasheem Ejaz</p>
            </div>

        </div>
    )
}

export default PYQ
