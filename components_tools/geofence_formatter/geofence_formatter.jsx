'use client'

import { useState } from 'react';
import Title from "@/components /title/title";

import './geofence_formatter.css'
const GeofenceFormatter = () => {
    const [filename, setFilename] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");

    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const API_URL_IN_USE = API_URL_prod


    const handleUpload = async (event) => {
        const file = event.target.files[0];

        // Check if a file has been selected
        if (!file) {
            console.log("No file selected.");
            return; // Exit the function if no file is selected
        }

        setIsLoading(true);
        setFilename(null);
        setUploadedFileName(file.name); // Store the uploaded file name

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(API_URL_IN_USE + 'api/GeoFenceFormatter', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFilename(data.filename);
        } catch (error) {
            console.error('Error during file upload:', error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='geofence'>
            <div className="geofence__content">
                <div className="geofence__content__file__container">

                    <div className='geofence__content__file'>
                            <input
                                id="fileUpload"
                                className="fileInput"
                                type="file"
                                onChange={handleUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileUpload" className="geofence__content__file--label title--sub button__box">Upload File +
                            </label>
                    </div>
                    {uploadedFileName && <p className="label">{uploadedFileName}</p>} {/* Display uploaded file name */}
                </div>

                <div className="geofence__content__file__download">
                    {isLoading && <a className="geofence__content__file__download--download label">Loading...</a>} {/* Display loading indicator */}

                    {filename && <a className="geofence__content__file--download label" href={`${API_URL_IN_USE}api/download/${filename}`} download>Download Processed File {filename}</a>}
                </div>

            </div>

        </div>
    );
};

export default GeofenceFormatter;