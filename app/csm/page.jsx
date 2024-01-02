'use client'

import React, { useEffect, useState } from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';

import Title from "@/components /title/title";
import FileUpload from "@/components /fileUpload/fileUpload";

import './page.css'
import { LuFile, LuFileCheck2 } from "react-icons/lu";
import { BeatLoader } from 'react-spinners';

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const Page = () => {

    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const API_URL_IN_USE = API_URL_prod


    //
    // useEffect(() => {
    //     // Fetch data from your API
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:5000/csm'); // Adjust the endpoint if necessary
    //             if (!response.ok) {
    //                 throw new Error(`Error: ${response.status}`);
    //             }
    //             let fetchedData = await response.json();
    //             // Add a unique id to each row
    //             fetchedData = fetchedData.map((item, index) => ({ ...item, id: index }));
    //             setData(fetchedData);
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    function renderSensorData(params) {
        if (params.value && typeof params.value === 'object') {
            // Calculate the total count
            const total = Object.values(params.value).reduce((sum, count) => sum + count, 0);

            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '0.5rem' }}>
                    {Object.entries(params.value).map(([sensor, count]) => (
                        <div key={sensor} style={{ marginRight: '10px', display: 'flex' }}>
                            <span className="label" style={{ fontWeight: 'bold' }}>{sensor}:</span>
                            <span className="label" style={{ marginLeft: '5px' }}>{count}</span>
                        </div>
                    ))}
                    <p style={{ fontWeight: 'bold' }} className="label">({total})</p>
                </div>
            );
        }
        return '';
    }


/*    const columns = [
        { field: 'Customer', headerName: 'Customer', width: 200 },
        { field: 'Responsive Detailed', headerName: 'Responsive (Detailed)', width: 300, renderCell: renderSensorData  },
        { field: 'Unresponsive Detailed', headerName: 'Unresponsive (Detailed)', width: 300, renderCell: renderSensorData },
        { field: 'Responsive Total', headerName: 'Responsive', width: 150, hide: true },
        { field: 'Unresponsive Total', headerName: 'Unresponsive', width: 150, hide: true }
    ];*/

    const renderDetailedData = (params) => {
        if (params.value && typeof params.value === 'object') {
            return (
                <ul>
                    {Object.entries(params.value).map(([sensor, count]) => (
                        <li key={sensor}>{sensor}: {count}</li>
                    ))}
                </ul>
            );
        }
        return '';
    };


    const columnGroupingModel = [
        // {
        //     groupId: 'identity',
        //     headerName: 'Identity',
        //     children: [
        //         { field: 'Customer' },
        //     ],
        // },

        {
            groupId: 'responsive',
            headerName: 'Responsive',
            children: [
                { field: 'Responsive_FMT100' },
                { field: 'Responsive_CELLULAR' },
                { field: 'Responsive_LORA' },
                { field: 'Responsive_FMC225' },
                { field: 'Responsive_FMC230' },
                { field: 'Responsive_FMC125' },


            ],
        },
        {
            groupId: 'unresponsive',
            headerName: 'Unresponsive',
            children: [
                { field: 'Unresponsive_FMT100' },
                { field: 'Unresponsive_CELLULAR' },
                { field: 'Unresponsive_LORA' },
                { field: 'Unresponsive_FMC225' },
                { field: 'Unresponsive_FMC230' },
                { field: 'Unresponsive_FMC125' },

            ],
        },

        {
            groupId: 'total',
            headerName: 'Total',
            children: [
                { field: 'Total Responsive' },
                { field: 'Total Unresponsive' },
            ],
        },
    ];

// Define your columns as usual
    const columns = [


        { field: 'Customer', headerName: 'Customer', width: 150 },

        { field: 'Total Responsive', headerName: 'Responsive', width: 120 },
        { field: 'Total Unresponsive', headerName: 'Unresponsive', width: 120 },

        { field: 'Responsive_FMT100', headerName: 'FMT100', width: 90 },
        { field: 'Responsive_CELLULAR', headerName: 'CELLULAR', width: 90 },
        { field: 'Responsive_LORA', headerName: 'LORA', width: 90 },
        { field: 'Responsive_FMC225', headerName: 'FMC225', width: 90 },
        { field: 'Responsive_FMC230', headerName: 'FMC230', width: 90 },
        { field: 'Responsive_FMC125', headerName: 'FMC125', width: 90 },


        { field: 'Unresponsive_FMT100', headerName: 'FMT100', width: 90 },
        { field: 'Unresponsive_CELLULAR', headerName: 'CELLULAR', width: 90 },
        { field: 'Unresponsive_LORA', headerName: 'LORA', width: 90 },
        { field: 'Unresponsive_FMC225', headerName: 'FMC225', width: 90 },
        { field: 'Unresponsive_FMC230', headerName: 'FMC230', width: 90 },
        { field: 'Unresponsive_FMC125', headerName: 'FMC125', width: 90 },






        // ... other columns
    ];
    const [dataCSM, setDataCSM] = useState([]);
    const [dataFULL, setDataFULL] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("No file selected");

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        setFile(event.target.files[0]);
        setFilename(event.target.files[0] ? event.target.files[0].name : 'No file selected');

        // Check if a file has been selected
        if (!file) {
            console.log("No file selected.");
            return; // Exit the function if no file is selected
        }

        setIsLoading(true); // Start loading
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch( API_URL_IN_USE + `csm`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let fetchedData = await response.json();
            // Add a unique id to each row

            let fetchedDataCSM = fetchedData.CSM
            fetchedDataCSM = fetchedDataCSM.map((item, index) => ({ ...item, id: index }));
            setDataCSM(fetchedDataCSM);

            let fetchedDataFULL = fetchedData.FULL
            fetchedDataFULL = fetchedDataFULL.map((item, index) => ({ ...item, id: index }));
            setDataFULL(fetchedDataFULL);

        } catch (error) {
            console.error('Error during file upload:', error.message);
            // Optionally, you can handle the error in the UI, e.g., by setting an error state and displaying it
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const [tabValue, setTabValue] = useState(0);



    return (
        <div className="csm">
            <Title title="CSM Overview"/>
            <div className="csm__content section__padding">

                <div className="csm__content__fileupload">

                    <div className="fileupload">
                        <div className="fileupload__content">
                            <div className='fileupload__content__button'>
                                <input
                                    id="fileUpload"
                                    className="fileupload__content__button--input"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleUpload}
                                />

                                {/* Your custom button or text */}
                                <label htmlFor="fileUpload" className="button title--sub">Upload File +</label>
                                <a className="fileupload__content__button--filename">{filename}</a>
                            </div>
                            <div className="fileupload__content__icon">
                                {filename === 'No file selected' ? < LuFile size={55} color="#5A6270"/> : <LuFileCheck2 size={55} color="#2FA769"/> }
                            </div>
                            {isLoading && (
                                <div className="fileupload__content--spinner">
                                    <BeatLoader color="#123abc" loading={isLoading} />
                                </div>
                            )}


                        </div>



                    </div>



                </div>


                <div className="csm__content__view">
                    <Tabs
                        value={tabValue}
                        onChange={(event, newValue) => setTabValue(newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="CSM Overiview" />
                        <Tab label="Full Overview" />
                    </Tabs>

                    {tabValue === 0 && (
                        <DataGrid

                            experimentalFeatures={{ columnGrouping: true }}
                            columnGroupingModel={columnGroupingModel}

                            rows={dataCSM}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            stickyHeader = {true}
                            /*
                                                    checkboxSelection
                            */
                            slots={{ toolbar: GridToolbar}}
                        />                    )}
                    {tabValue === 1 && (
                        <DataGrid

                            experimentalFeatures={{ columnGrouping: true }}
                            columnGroupingModel={columnGroupingModel}

                            rows={dataFULL}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            stickyHeader = {true}
                            /*
                                                    checkboxSelection
                            */
                            slots={{ toolbar: GridToolbar}}
                        />                                   )}

                </div>


            </div>
        </div>
    );
};

export default Page;