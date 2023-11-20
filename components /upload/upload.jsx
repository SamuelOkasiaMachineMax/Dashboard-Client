'use client'

import { useState } from 'react';
import './upload.css'
import { GrDocumentCsv, GrDocument,  } from "react-icons/gr"
import { LuFileCheck2 } from 'react-icons/lu'
import { BiChevronDown } from 'react-icons/bi'
import Dashboard from "@/components /dashboard/dashboard";
const Upload = ({onUpload}) => {

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
        <div className="upload">
            <div className="upload__main">
                <div className='upload__main__button'>
                    <input
                        id="fileUpload"
                        className="upload__main__button--input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setFilename(e.target.files[0] ? e.target.files[0].name : 'No file selected');
                        }}
                    />

                    {/* Your custom button or text */}
                    <label htmlFor="fileUpload" className="button title--sub">Upload Telematics File +</label>
                    <a className="upload__main__button--filename">{filename}</a>
                </div>
                <div className="upload__main__icon">
                    {filename === 'No file selected' ? < GrDocument size={50} /> : <LuFileCheck2 size={55}/> }
                </div>
                <div className="upload__main__org">
                    <p className="upload__main__org--org title--sub">Select Organisation ID<button className="upload__main__org--org--dropdown button__box"><BiChevronDown size={15}/></button></p>
                    <input className="upload__main__org--input label" value={orgID} onChange={(e) => setOrgID(e.target.value)} placeholder="Or enter one in"/>
                </div>

            </div>
            <div className="upload__sub">
                <button className="upload__sub--button title--sub button" onClick={handleSubmit}>Start</button>
            </div>
        </div>
    );
};

export default Upload;