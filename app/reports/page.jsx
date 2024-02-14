'use client'

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

import './page.css';
import Title from "@/components /title/title";
import Report_exp from "@/components /report_exp/report_exp";
import ExcelDataGrid from "@/components /excelDataGrid/excelDataGrid";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {ClipLoader} from "react-spinners";
import {useRouter} from "next/navigation";
const Page = () => {

    const router = useRouter();
    const [showPage, setShowPage] = useState(false);

    const API_URL_DEV = "http://127.0.0.1:5000/";
    const API_URL_PROD = "https://samuelokasiamachinemax.pythonanywhere.com/";
    const API_IN_USE = API_URL_PROD;

    const [customerOrg, setCustomerOrg] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [triggerDownload, setTriggerDownload] = useState(false);

    // Function to download Excel file
    const downloadExcel = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        // Function to fetch data or Excel file
        const fetchData = async () => {
            if (!triggerDownload || !customerOrg) return;


            setIsLoading(true); // Start loading

            try {
                const response = await fetch(API_IN_USE + `reports-data_completeness/${customerOrg}`);
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                    const blob = await response.blob();
                    downloadExcel(blob, `Data_completeness_${customerName}.xlsx`);
                } else {
                    const data = await response.json();
                    // Process JSON data as required
                    // Example: setTableData(data);
                    console.log(customerName);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
                setTriggerDownload(false); // Reset trigger for next download
            }
        };

        fetchData();
    }, [customerOrg, triggerDownload]); // Include triggerDownload as a dependency

    return (
        <div className="report">
            <Title title="Reports"/>
            <div className="report__content content__padding">
                <div className="report__content__header">
                    <div className="report__content__header__title">
                        <p className="title--sub">Reports</p>
                        {isLoading && <ClipLoader color="#1976d2" loading={isLoading}/>}
                    </div>
                    <div className="report__content__header--reports">
                        <Report_exp
                            ssetCustomerOrg={(org) => {
                                setCustomerOrg(org);
                                setTriggerDownload(true); // Trigger download when a new organization is selected
                            }}
                            ssetCustomerName={setCustomerName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
