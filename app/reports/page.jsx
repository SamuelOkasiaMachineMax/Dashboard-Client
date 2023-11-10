'use client'

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

import './page.css';
import Title from "@/components /title/title";
import Report_exp from "@/components /report_exp/report_exp";
import ExcelDataGrid from "@/components /excelDataGrid/excelDataGrid";
const Page = () => {
    const [reports, setReports] = useState([]);
    const [viewCustomer, setViewCustomer] = useState('')
    const [viewName, setViewName] = useState('')

    const [file, setDile] = useState([]);
    const embedUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file)}`;

    useEffect(() => {
        // Fetch reports when the component mounts
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/reports');
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports: ", error);
            }
        };

        fetchReports();
    }, []);




    return (
        <div className="report">
            <Title title="Reports"/>

            <div className="report__content content__padding">
                <div className="report__content__header">
                    <div className="report__content__header--title">
                        <p className="title--sub">Reports</p>
                    </div>
                    <div className="report__content__header--reports">
                        {reports.map(([customer, reportName], index) => (
                            <Report_exp customer={customer} name={reportName} ssetViewCustomer={setViewCustomer} ssetViewName={setViewName}/>
                            )
                        )}
                    </div>
                </div>


                <div className="report__content__view">
                    <div className="report__content__view__header">
                        <p className="title--sub">{viewCustomer}</p>
                        <p className="label">{viewName}</p>
                    </div>
                    <div className="report__content__view__table">
                        <ExcelDataGrid customer ={viewCustomer} name={viewName}/>
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