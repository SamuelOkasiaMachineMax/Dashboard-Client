'use client'

import { useState, useEffect } from 'react';
import './page.css'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Title from "@/components /title/title";
import {BiChevronDown} from "react-icons/bi";
const Page = () => {

    const API_URL_dev = "http://127.0.0.1:5000/FFTools"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/FFTools/"

    const [sensor, setSensor] = useState("");
    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [columns, setColumns] = useState([]);

    const buttonList = ['Speed (km/h)', 'Accelerometer x (mg)', "Accelerometer y (mg)", "Accelerometer z (mg)", "GPS coordinates", "Movement", "Fuel", "GSM Signal"]
    const [selectedButtons, setSelectedButtons] = useState([]);

    const toggleButtonSelection = (buttonText) => {
        setSelectedButtons(prevSelected => {
            if (prevSelected.includes(buttonText)) {
                // If the button is already selected, remove it from the list
                return prevSelected.filter(text => text !== buttonText);
            } else {
                // If the button is not selected, add it to the list
                return [...prevSelected, buttonText];
            }
        });
    };

    const handleFilter = () => {
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        const filtered = rows.filter(item => {
            const dateTime = new Date(item.dateTime);
            console.log("Row Date:", dateTime);
            return dateTime >= new Date(startDate) && dateTime <= new Date(endDate);
        });

        console.log("Filtered Data:", filtered);
        setFilteredData(filtered);
    };





    useEffect(() => {
        if (!sensor) return;

        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL_prod}/${selectedButtons}/${startDate}/${endDate}`);
                const fetchedData = response.data["866907057595893"];

                // Check if we received data and it's not empty
                if (fetchedData && Object.keys(fetchedData).length > 0) {
                    // We use the keys from the first entry to create columns
                    const firstEntryKey = Object.keys(fetchedData)[0];
                    const firstEntry = fetchedData[firstEntryKey];

                    const dynamicColumns = Object.keys(firstEntry).map(key => ({
                        field: key,
                        headerName: key.replace(/_/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()), // Capitalize and replace underscores
                        width: 200, // You might want to dynamically adjust this
                        // other column properties if needed
                    }));

                    // Don't forget to add the 'dateTime' column as well if needed
                    dynamicColumns.unshift({
                        field: 'dateTime',
                        headerName: 'Date Time',
                        width: 200,
                        // You can also add a value getter here to format date time if needed
                    });

                    setColumns(dynamicColumns); // Set the dynamic columns

                    // Then format your rows
                    const formattedRows = Object.keys(fetchedData).map((dateTime, id) => ({
                        id,
                        dateTime, // Make sure this is formatted as needed for display
                        ...fetchedData[dateTime]
                    }));

                    console.log(formattedRows);

                    setRows(formattedRows);
                    setFilteredData(formattedRows); // set all fetched data as default
                }
            } catch (error) {
                console.error("Error fetching the data: ", error);
            }
        }

        fetchData();
    }, [sensor, selectedButtons, startDate, endDate]); // Make sure to include all dependencies here


  /*  const columns = [
        { field: 'dateTime', headerName: 'Date Time', width: 200, filterable: true, type: 'dateTime', hide: true, valueGetter: (params) => new Date(params.value)},
        { field: 'Speed (km/h)', headerName: 'Speed (km/h)', width: 150 },
        { field: 'Accelerometer x (mg)', headerName: 'Accelerometer X (mg)', width: 200, filterable: true },
        { field: 'Accelerometer y (mg)', headerName: 'Accelerometer Y (mg)', width: 200 },
        { field: 'Accelerometer z (mg)', headerName: 'Accelerometer Z (mg)', width: 200 },
        { field: 'GPS coordinates', headerName: 'GPS Coordinates', width: 200 },
        { field: 'Movement', headerName: 'Movement', width: 150 },
        { field: 'GSM signal', headerName: 'GSM Signal', width: 100 },
        { field: 'GNSS status', headerName: 'GNSS Status', width: 200 },
        { field: 'External voltage (mV)', headerName: 'External Voltage (mV)', width: 200 },
        { field: 'Timestamp', headerName: 'Timestamp', width: 200 },

    ];*/

    return (
        <div className="FFTools">
            <Title title="FFTools"/>

            <div className="FFTools__content content__padding">

                <div className="FFTools__content__input">
                    <p className="title--sub">Sensor IMEI</p>
                    <input className="label"
                           value={sensor}
                           onChange={(e) => setSensor(e.target.value)}
                           placeholder="Enter sensor IMEI"/>
                </div>

                <div className="FFTools__content__range">
                    <p className="title--sub">Set Range</p>
                    <input className=""
                           type="datetime-local"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input className=""
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
{/*
                    <button className="button" onClick={handleFilter}>Filter</button>
*/}
                </div>

                <div className="FFTools__content__variables">
                    <p className="title--sub">Variables</p>
                    {buttonList.map((buttonText, index) => (
                        <button className="button"
                            key={index}
                            variant="outlined"
                            style={{
                                margin: '0.5em',
                                backgroundColor: selectedButtons.includes(buttonText) ? '#4CAF50' : '#FFFFFF', // Change color when selected
                                color: selectedButtons.includes(buttonText) ? '#FFFFFF' : '#000000',
                            }}
                            onClick={() => toggleButtonSelection(buttonText)}
                        >
                            {buttonText}
                        </button>
                    ))}
                </div>


                <DataGrid rows={filteredData} columns={columns} pageSize={5} />


            </div>
        </div>
    );
};

export default Page;