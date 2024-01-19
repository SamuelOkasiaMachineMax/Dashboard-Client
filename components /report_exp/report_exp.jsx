'use client'

import React, { useEffect, useState } from 'react';
import "./reportEXP.css";
import { GoArrowRight } from "react-icons/go";
import Select from "react-select";
import {ClipLoader} from "react-spinners";

const ReportExp = ({ ssetCustomerOrg, ssetCustomerName }) => {
    const API_URL_dev = "http://127.0.0.1:5000";

    const [customerData, setCustomerData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);


    useEffect(() => {

        const fetchCustomerData = async () => {
            try {
                const response = await fetch(API_URL_dev + '/customer-select');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && Array.isArray(data.data)) {
                    setCustomerData(data.data);
                } else {
                    console.error('Invalid data format received from the server');
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchCustomerData();
    }, []);

    const options = customerData.map((item) => ({
        value: item.value,
        label: item.name
    }));

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        ssetCustomerName(selectedOption.label)
        if (selectedOption && selectedOption.value) {
            console.log('Selected value:', selectedOption.value);
            // You can use the selected value in your code as needed.
        } else {
            console.warn('No option selected.');
        }
    };

    return (
        <div className="reportEXP">
            <div className="reportEXP__content">
                    <p className="title--sub">Data Completeness</p>
                <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Select Organisation"
                    className="title--sub"
                />
            </div>
            <div className="reportEXP__actions">
                <button className="reportEXP__actions--view" onClick={(e) => {
                    ssetCustomerOrg(selectedOption.value);
                    // ssetCustomerName(selectedOption.name);
                }}>
                    <GoArrowRight size={30} color={"#5A6270"} />
                </button>

            </div>
        </div>
    );
};

export default ReportExp;
