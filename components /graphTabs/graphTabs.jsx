import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TimeSeriesChart from './TimeSeriesChart';
import Box from '@mui/material/Box';
import VoltageGraph from "@/components /voltageGraph/voltageGraph";
const GraphTabs = ({ rows, startDate, endDate }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleChange} >
                <Tab label="External Voltage" />
                <Tab label="Speed" />
                <Tab label="GSM Signal" />
            </Tabs>
            {selectedTab === 0 && <VoltageGraph rows={rows.map(item => [item.read_at, item.external_voltage])} startDate={startDate} endDate={endDate}/>}
            {selectedTab === 1 && <VoltageGraph rows={rows.map(item => [item.read_at, item.speed])} startDate={startDate} endDate={endDate}/>}
            {selectedTab === 2 && <VoltageGraph rows={rows.map(item => [item.read_at, item.gsm_signal])} startDate={startDate} endDate={endDate}/>}
        </Box>
    );
};

export default GraphTabs;
