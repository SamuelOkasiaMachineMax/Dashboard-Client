'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SensorDashboard = ( {customerName} ) => {

    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        if (customerName) {
            fetch(`http://127.0.0.1:5000/sensors/${customerName}`)
                .then(res => res.json())
                .then(data => setSensors(data))
                .catch(error => console.error('Error fetching sensor data:', error));
        }
    }, [customerName]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Asset ID</TableCell>
                        <TableCell>Machine Name</TableCell>
                        <TableCell>Source Status</TableCell>
                        <TableCell>Battery Voltage</TableCell>
                        <TableCell>Signal Status</TableCell>
                        <TableCell>Device Model</TableCell>
                        {/* Add other columns as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sensors.map(sensor => (
                        <TableRow key={sensor.id}>
                            <TableCell>{sensor.asset_id}</TableCell>
                            <TableCell>{sensor.machine_name}</TableCell>
                            <TableCell>{sensor.source_status}</TableCell>
                            <TableCell>{sensor.battery_voltage}</TableCell>
                            <TableCell>{sensor.signal_status}</TableCell>
                            <TableCell>{sensor.device_model}</TableCell>
                            {/* Add other cell data as needed */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SensorDashboard;