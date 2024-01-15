import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ClipLoader } from "react-spinners";
import "./subgroup_filter.css";

const SubgroupFilter = () => {
    const API_URL_dev = "http://127.0.0.1:5000/";
    const API_URL_prod = "https://samuelokasiamachinemax.pythonanywhere.com/";
    const API_IN_USE = API_URL_prod;

    const [customerData, setCustomerData] = useState({});
    const [selectedKey, setSelectedKey] = useState('');
    const [subOrganizations, setSubOrganizations] = useState([]);
    const [filename, setFilename] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [optionsLoading, setOptionsLoading] = useState(false);


    useEffect(() => {
        setOptionsLoading(true);
        fetch(API_IN_USE + `OrgToSubOrg`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setCustomerData(data);
                setOptionsLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error('Fetch operation error:', error);
                setOptionsLoading(false); // Stop loading in case of error
            });
    }, []);

    const handleSelectChange = selectedOption => {
        if (selectedOption) {
            setSelectedKey(selectedOption.value);
            setSubOrganizations(customerData[selectedOption.value]);
            setFilename("");
        } else {
            setSelectedKey('');
            setSubOrganizations([]);
            setFilename("");
        }
    };
    const handleUpload = async event => {
        const fileInput = event.target;

        if (!fileInput.files || fileInput.files.length === 0) {
            console.log("No file selected or file input is not correctly defined.");
            return;
        }

        const originalFile = fileInput.files[0];
        const newFileName = selectedKey ? `${selectedKey}_${originalFile.name}` : originalFile.name;
        const modifiedFile = new File([originalFile], newFileName, { type: originalFile.type });

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', modifiedFile);
        formData.append('data', JSON.stringify({ value: subOrganizations }));

        try {
            const response = await fetch(API_IN_USE + 'api/CustomerFilter', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setFilename(data.filename);
        } catch (error) {
            console.error('File upload error:', error.message);
        } finally {
            setIsLoading(false);
            fileInput.value = ''; // Reset the file input
        }
    };


    return (
        <div className="subgrpfltr section__padding">
            <div className="subgrpfltr__select">
                {optionsLoading ? (
                    <ClipLoader color="#1976d2" loading={optionsLoading} />
                ) : (
                    <Select
                        options={Object.keys(customerData).map(key => ({ value: key, label: key }))}
                        onChange={handleSelectChange} // Use handleSelectChange here
                        isClearable={true}
                        isSearchable={true}
                        placeholder="Select Organisation"
                        className="title--sub"
                    />
                )}
                <p className="label">{subOrganizations.length} Sub Organisations Found</p>
            </div>
            <div className="subgrpfltr__upload">
                <div className='subgrpfltr__upload__file'>
                    <input
                        id="fileUpload"
                        className="fileInput"
                        type="file"
                        onChange={handleUpload} // Keep handleUpload here
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileUpload" className="geofence__content__file--label title--sub button__box">
                        Upload File +
                    </label>
                </div>

                {isLoading && <ClipLoader color="#1976d2" loading={isLoading} />}
                {filename &&
                    <a className="subgrpfltr__upload--download label" href ={`${API_IN_USE}api/download/${filename}`} download>{filename}</a>}
            </div>
        </div>
    );
};

export default SubgroupFilter;
