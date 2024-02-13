'use client'

import React, { useState } from 'react';
import axios from 'axios';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import VoltageGraph from "@/components /voltageGraph/voltageGraph";
import GraphTabs from "@/components /graphTabs/graphTabs";
import Title from "@/components /title/title";
import './page.css'

import { MdLink } from "react-icons/md";
import { ClipLoader } from "react-spinners";


const Page = () => {
    const API_URL = "http://127.0.0.1:5000";  // Adjust according to your backend URL
    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const API_URL_IN_USE = API_URL_prod

    const [latestData, setLatestData] = useState("");


    const [sensor, setSensor] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const fetchData = async () => {
        if (!sensor || !startDate || !endDate){
            setError("Please Select Date Range");
            return;

        }

        setRows([])
        setError('')
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(`${API_URL_IN_USE}FFToolsPro/${sensor}/${startDate}/${endDate}`, {
                sensor,
                startDate,
                endDate
            });

            const data = response.data.range_data;
            const latest_data = response.data.latest_data

            setLatestData(latest_data)
            console.log(latest_data)


            if (data && data.length > 0) {

                setRows(data.map((row, index) => ({ id: index, ...row })));
                //
                // if (data[0]) {
                //     setColumns(Object.keys(data[0]).map(key => ({
                //         field: key,
                //         headerName: key.replace(/_/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
                //         width: 150,
                //     })));
                // }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const columns = [
        {
            field: 'read_at',
            headerName: 'Time',
            width: 350,
            type: 'dateTime',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: (params) => {
                return params.value ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(new Date(params.value)) : '';
            }
        },
        { field: 'external_voltage', headerName: 'External Voltage', width: 200 },
        { field: 'gsm_signal', headerName: 'GSM Signal', width: 150 },
        { field: 'gnss_status', headerName: 'GNSS Status', width: 150 },
        { field: 'speed', headerName: 'Speed', width: 150 },
        { field: 'movement', headerName: 'Movement', width: 150 },



        // ... more columns as needed
    ];

    function DataItem({ keyName, value }) {
        const renderValue = () => {
            if (typeof value === 'string' && value.startsWith('http')) {
                // Check if the value is a URL
                return <a href={value} target="_blank" rel="noopener noreferrer"><MdLink size={30} color="#0057E2"/></a>;
            } else {
                // Default rendering for other data types
                return String(value);
            }
        };

        return (
            <div className="FFTools__content__latest__content" key={keyName}>
                <p className="label">{keyName}:</p>
                <p className="text">{renderValue()}</p>
            </div>
        );
    }



    return (
        <div className="FFTools">
            <Title title="FFTools"/>

            <div className="FFTools__content content__padding">
                <div className="FFTools__content__input">
                    <p className="title--sub">Sensor IMEI</p>
                    <input className="label FFTools__content__input--input"
                           value={sensor}
                           onChange={(e) => setSensor(e.target.value)}
                           placeholder="Enter sensor IMEI"/>
                </div>

                <div className="FFTools__content__range">
                    <p className="title--sub">Set Range</p>
                    <input
                           className=" label datetime-local"
                           type="datetime-local"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        className="label"
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="button title--sub" onClick={fetchData}>Fetch Data</button>
                    {isLoading && (
                        <div className="fileupload__content--spinner">
                            <ClipLoader color="#1976d2" loading={isLoading}/>
                        </div>
                    )}
                    <p className="label error">{error}</p>

                </div>

                <div className="FFTools__content__latest ">
                    <h1 className="title--sub">Latest Data</h1>
                    <div className="data-container">
                        {Object.entries(latestData).map(([key, value]) => (
                            <DataItem keyName={key} value={value} key={key} />
                        ))}
                    </div>


                </div>

                <div className='FFTools__content__graph'>
                    {/*<VoltageGraph rows={rows} startDate={startDate} endDate={endDate}/>*/}
                    <GraphTabs rows={rows} startDate={startDate} endDate={endDate}/>
                </div>

                <div className="FFTools__content__data">
                    <div className="FFTools__content__data__title">
                        <p className="title--sub">Data</p>
                    </div>

                    <DataGrid rows={rows} columns={columns} pageSize={5} slots={{ toolbar: GridToolbar}}
                    />
                </div>





            </div>
        </div>
    );
};

export default Page;
