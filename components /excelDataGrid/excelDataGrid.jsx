import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import "./excelDataGrid.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const ExcelDataGrid = ({customer, name}) => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);


    const [tabValue, setTabValue] = useState(0);


    useEffect(() => {
        axios.get(`http://localhost:5000/reports/${customer}/${name}/view`)
            .then(response => {
                const sheet1Data = response.data.Sheet1;
                const sheet2Data = response.data.Sheet2;
                // Ensure the response data is an array
                if (Array.isArray(sheet1Data)) {
                    // Process the data to add an id to each row
                    const processedData = sheet1Data.map((item, index) => ({ id: index, ...item }));
                    setData(processedData);
                } else {
                    console.error("The response data is not an array:", sheet1Data);
                }

                if (Array.isArray(sheet2Data)) {
                    // Process the data to add an id to each row
                    const processedData = sheet2Data.map((item, index) => ({ id: index, ...item }));
                    setData2(processedData);
                } else {
                    console.error("The response data is not an array:", sheet2Data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [customer, name]);  // added dependencies to the useEffect

    if (!data.length) return <div className="centeredContainer"><p className="loading title--title">Select Report</p></div>;

    const desiredOrder = [
        "imei", "source_name", "asset_id", "machine_name", "source_status", "battery_voltage",
        "battery_status", "signal_status", "latest_connection", "data_completion",
        "latest_hours", "latest_latitude", "latest_location_timestamp", "site",
        "device_model", "firmware_version", "configuration_version", "device_mode",
        "first_associated", "signal"
    ];

    const desiredOrder_overview = [
        "start_date", "end_date", "asset_id", "machine_name",
        "machine_type", "load_capacity_tonnes", "oem", "model", "vin",
        "manufacturing_year", "engine_type", "emission_standard", "site",
        "active_time", "idle_time", "total_on_time", "off_time",
        "data_completeness", "idle_percentage", "utilisation_percentage",
        "data_level_percentage", "telematics_found", "activity_data_source",
        "location_data_source", "hour_meter_data_source", "ownership_type",
        "owner", "note", "subscriptions"
    ];


    const styledCellRenderer = (params) => {
        let bgColor = 'default'; // Default background color
        const stringValue = String(params.value); // Convert the value to a string

        // Check for 'red' or 'green' in cell value
        if (stringValue.includes('red')) {
            bgColor = '#FFC7CE';
        } else if (stringValue.includes('green')) {
            bgColor = '#C6EFCE';
        } else if (stringValue.includes('amber')) {
            bgColor = '#FFEB9C';
        }

        // Remove 'red' or 'green' from the cell value
        const displayValue = stringValue.replace('red', '').replace('green', '').replace('amber','').trim();

        return <div className='test MuiDataGrid-cellContent' style={{ backgroundColor: bgColor }}>{displayValue}</div>;
    };


    const columns = desiredOrder.map(key => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),  // Making the headerName a bit more readable
        width: 120,
        renderCell: styledCellRenderer

    }));

    const columns_overview = desiredOrder_overview.map(key => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),  // Making the headerName a bit more readable
        width: 120,
        renderCell: styledCellRenderer

    }));


    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Sesnors" />
                <Tab label="Machines" />
            </Tabs>

            {tabValue === 0 && (
                <DataGrid rows={data} columns={columns} pageSize={5} />
            )}

            {tabValue === 1 && (
                <DataGrid rows={data2} columns={columns_overview} pageSize={5} />
            )}

        </div>
    );
};

export default ExcelDataGrid;
