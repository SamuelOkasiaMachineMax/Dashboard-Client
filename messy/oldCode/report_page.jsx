'use client'

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

import './page.css';
import Title from "@/components /title/title";
import Report_exp from "@/components /report_exp/report_exp";
import ExcelDataGrid from "@/components /excelDataGrid/excelDataGrid";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
const Page = () => {
    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"
    const API_IN_USE = API_URL_dev

    const [customerOrg, setCustomerOrg] = useState('')
    const [customerName, setCustomerName] = useState('')

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Fetch data from the endpoint using selectedValue
        if (customerOrg) {
            // Example: Fetch data from an API based on selectedValue
            fetch(API_IN_USE + `reports-data_completeness/${customerOrg}`)
                .then((response) => response.json())
                .then((data) => {

                    if (data && data.report && Array.isArray(data.report)) {
                        // Assuming 'report' is the key containing the array of data
                        setTableData(data.report.map((row, index) => ({ id: index, ...row })));
                        console.log(customerName)
                    } else {
                        console.error('Invalid data format received from the server');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [customerOrg]);




    const columns = [

        { field: 'status', headerName: 'status', width: 250 },
        { field: 'asset_id', headerName: 'Asset ID', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'deveui', headerName: 'IMEI', width: 150 },
        { field: 'last_updated_at', headerName: 'Time', width: 150 },
        { field: 'data_completeness', headerName: 'Data Completeness', width: 150 },

    ];

    function customSort(a, b) {
        // First compare by 'status'
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;

        // If 'status' is equal, compare by 'model'
        if (a.model < b.model) return -1;
        if (a.model > b.model) return 1;

        return 0;
    }

// Sort your data
    const sortedTableData = [...tableData].sort(customSort);
    return (
        <div className="report">
            <Title title="Reports"/>

            <div className="report__content content__padding">
                <div className="report__content__header">
                    <div className="report__content__header--title">
                        <p className="title--sub">Reports</p>
                    </div>
                    <div className="report__content__header--reports">
                            <Report_exp
                                ssetCustomerOrg={setCustomerOrg} ssetCustomerName={setCustomerName}
                            />
                    </div>

                </div>


                <div className="report__content__view">
                    <div className="report__content__view__header">
                        <p className="title--sub">{customerName}</p>
                        <p className="label">{customerOrg}</p>
                    </div>
                    <div className="report__content__view__table">
                        <DataGrid rows={sortedTableData} columns={columns} pageSize={5} slots={{ toolbar: GridToolbar}}/>
                    </div>
                </div>



                {/* <div className="report__content__view">
                    <div className="report__content__view__header">
                        <SelectCustomer onCustomerSelect={handleCustomerSelect} />
                        {selectedCustomerName && < SensorDashboard customerName={selectedCustomerName} />}

                    </div>
                </div>*/}



            </div>

        </div>
    );
};

export default Page;