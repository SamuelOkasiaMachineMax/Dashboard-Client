import React, { useEffect, useState } from 'react';

import "./subgroup_filter.css"

import Select from 'react-select';
import { ClipLoader } from "react-spinners";


const SubgroupFilter = () => {

    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const API_IN_USE = API_URL_prod

    const [customerData, setCustomerData] = useState({});
    const [selectedKey, setSelectedKey] = useState('');
    const [subOrganizations, setSubOrganizations] = useState([]);
    const [filename, setFilename] = useState("");


    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        // Replace with your actual endpoint URL
        fetch(API_IN_USE+`OrgToSubOrg`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCustomerData(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []); // Dependencies array is empty, meaning this effect runs once after the initial render


    const options = Object.keys(customerData).map((key) => ({
        value: key,
        label: key
    }));

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedKey(selectedOption.value);
            setSubOrganizations(customerData[selectedOption.value]);
            setFilename(null)
            console.log(subOrganizations)
        } else {
            setSelectedKey('');
            setSubOrganizations([]);
        }
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        // Check if a file has been selected
        if (!file) {
            console.log("No file selected.");
            return; // Exit the function if no file is selected
        }

        setIsLoading(true); // Start loading

        const formData = new FormData();
        formData.append('file', file);

        // Add the JSON data to the FormData
        formData.append('data', JSON.stringify({ value: subOrganizations }));

        try {
            const response = await fetch(API_IN_USE + 'api/CustomerFilter', {
                method: 'POST',
                body: formData, // Send the FormData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFilename(data.filename);
        } catch (error) {
            console.error('Error during file upload:', error.message);
            // Optionally, handle the error in the UI
        } finally {
            setIsLoading(false); // Stop loading
        }
    };



    return (
        <div className="subgrpfltr section__padding">
            <div className="subgrpfltr__select">
                <Select
                    options={options}
                    onChange={handleChange}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Select Organisation"
                    className="title--sub"
                />

                <p className="label">{subOrganizations.length} Sub Organisations Found</p>

            </div>
            <div className="subgrpfltr__upload">
                <div className='subgrpfltr__upload__file'>
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
                {/*{isLoading && <p className="subgrpfltr__upload--loading label">Loading...</p>}*/}

                {isLoading && <ClipLoader color="#1976d2" loading={isLoading}/>}
                {filename && <a className="subgrpfltr__upload--download label" href={`${API_URL_prod}api/download/${filename}`} download>Download Processed File</a>}
            </div>



        </div>
    );
};


export default SubgroupFilter;