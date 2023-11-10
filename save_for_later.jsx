import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import "./excelDataGrid.css"

import { styled } from '@mui/styles';


const RedCell = styled('div')({
    backgroundColor: '#FFC7CE',
    width: '100%',
    height: '100%',
    display: 'flex',
});

const GreenCell = styled('div')({
    backgroundColor: '#C6EFCE',
    width: '100%',
    height: '100%',
    display: 'flex',
});


const ExcelDataGrid = ({customer, name}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/reports/${customer}/${name}/view`)
            .then(response => {
                // Ensure the response data is an array
                if (Array.isArray(response.data)) {
                    // Process the data to add an id to each row
                    const processedData = response.data.map((item, index) => ({ id: index, ...item }));
                    setData(processedData);
                } else {
                    console.error("The response data is not an array:", response.data);
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

    const styledCellRenderer = (params) => {
        const stringValue = String(params.value);
        let Component = 'div';
        let displayValue = stringValue;

        if (stringValue.includes('red')) {
            Component = RedCell;
            displayValue = stringValue.replace('red', '').trim();
        } else if (stringValue.includes('green')) {
            Component = GreenCell;
            displayValue = stringValue.replace('green', '').trim();
        }

        return <Component>{displayValue}</Component>;
    };




    const columns = desiredOrder.map(key => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),  // Making the headerName a bit more readable
        width: 120,
        /*
                renderCell: styledCellRenderer
        */

    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
    );
};

export default ExcelDataGrid;
