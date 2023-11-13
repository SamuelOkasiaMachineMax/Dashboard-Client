import React, { useEffect, useState } from 'react';

import "./subgroup_filter.css"

import Select from 'react-select';


const SubgroupFilter = () => {

    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const [customerData, setCustomerData] = useState({});
    const [selectedKey, setSelectedKey] = useState('');
    const [subOrganizations, setSubOrganizations] = useState([]);

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        // Replace with your actual endpoint URL
        fetch(API_URL_prod+`/api/CustomerFilter/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) // Sending an empty object
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
        } else {
            setSelectedKey('');
            setSubOrganizations([]);
        }
    };

    const [filename, setFilename] = useState("");
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

        try {
            const response = await fetch(API_URL_prod + `/api/CustomerFilter/${subOrganizations}`, {
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
            // Optionally, you can handle the error in the UI, e.g., by setting an error state and displaying it
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
                {isLoading && <p className="subgrpfltr__upload--loading label">Loading...</p>}
                {filename && <a className="subgrpfltr__upload--download label" href={`${API_URL_prod}api/download/${filename}`} download>Download Processed File</a>}
            </div>



        </div>
    );
};

export default SubgroupFilter;