'use client'

import { useState, useEffect } from 'react';
import './page.css'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Title from "@/components /title/title";
import {BiChevronDown} from "react-icons/bi";
const Page = () => {

    const [sensor, setSensor] = useState("");
    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);



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
                const response = await axios.get(`http://127.0.0.1:5000/FFTools`);
                const fetchedData = response.data["866907057595893"];

                const formattedRows = Object.keys(fetchedData).map((dateTime, id) => ({
                    id,
                    dateTime,
                    ...fetchedData[dateTime]
                }));

                console.log(formattedRows)

                setRows(formattedRows);
                setFilteredData(formattedRows); // set all fetched data as default

            } catch (error) {
                console.error("Error fetching the data: ", error);
            }
        }

        fetchData();
    }, [sensor]);

    const columns = [
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

    ];

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
                    <button className="button" onClick={handleFilter}>Filter</button>
                </div>




                <DataGrid rows={filteredData} columns={columns} pageSize={5} />


            </div>
        </div>
    );
};

export default Page;