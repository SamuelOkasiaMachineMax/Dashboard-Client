'use client'

import  { useState } from 'react';
import {GrDocument} from "react-icons/gr";
import { LuFile, LuFileCheck2} from "react-icons/lu";

import './fileUpload.css'
const FileUpload = ( {onUpload} ) => {

    const [outcome, setOutcome] = useState([]);
    const [data, setData] = useState([]);

    const [filename, setFilename] = useState("No file selected");
    const [file, setFile] = useState("");
    const [orgID, setOrgID] = useState("");
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('orgID', orgID);

        const response = await fetch("http://127.0.0.1:5000/search-telematics-upload", {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        /*
                console.log(data.machines);
        */
        setData(data.machines)
        onUpload(data.machines)
        setOutcome(data);
    };


    return (
        <div className="fileupload">
            <div className="fileupload__content">
                <div className='fileupload__content__button'>
                    <input
                        id="fileUpload"
                        className="fileupload__content__button--input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setFilename(e.target.files[0] ? e.target.files[0].name : 'No file selected');
                        }}
                    />

                    {/* Your custom button or text */}
                    <label htmlFor="fileUpload" className="button title--sub">Upload File +</label>
                    <a className="fileupload__content__button--filename">{filename}</a>
                </div>
                <div className="fileupload__content__icon">
                    {filename === 'No file selected' ? < LuFile size={55} color="#5A6270"/> : <LuFileCheck2 size={55} color="#2FA769"/> }
                </div>
            </div>
        </div>
    );
};

export default FileUpload;