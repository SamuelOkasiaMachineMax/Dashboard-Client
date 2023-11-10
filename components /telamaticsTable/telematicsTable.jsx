import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './telamaticsTable.css';
import { BsFileEarmarkExcel } from "react-icons/bs";

// Component to render serial data in the desired format
function DataRenderer({ primaryData, secondaryData, color = '#ED5500' }) {
    return (
        <div className="MuiDataGrid-Cell-Text">
                <p>{primaryData}</p>
            <div style={{ color }}>
                <p>{secondaryData}</p>
            </div>
        </div>
    );
}



const columns = [
    {
        field: 'serial',
        headerName: 'Serial',
        width: 200,
        cellClassName: 'myCustomCell',
        renderCell: (params) => (
            <DataRenderer
                primaryData={params.row.serialPlatform}
                secondaryData={params.row.serialPostman}
            />
        )
    },
    {
        field: 'assetID',
        headerName: 'Asset ID',
        width: 200,
        cellClassName: 'myCustomCell',
        renderCell: (params) => (
            <DataRenderer
                primaryData={params.row.assetIDPlatform}
                secondaryData={params.row.assetIDPostman}
            />
        )
    },
    { field: 'source', headerName: 'Source', width: 130 }
];


function TelematicsTable({ data, customerNmae }) {
    // Convert raw data into a desired format
    const convertData = (originalData) => {
        return originalData.map((item, index) => ({
            id: index,
            serialPlatform: item['Serial Platform'],
            serialPostman: item['Serial Postman'],
            assetIDPlatform: item['Asset ID Platform'],
            assetIDPostman: item['Asset ID Postman'],
            source: item['Source']
        }));
    }

    const convertedData = convertData(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(convertedData);
    useEffect(() => {
        setFilteredData(convertData(data));
    }, [data]);


    function handleSearchChange(e) {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (!value) {
            setFilteredData(convertedData);
            return;
        }

        const filtered = convertedData.filter(item =>
            item.serialPlatform.toLowerCase().includes(value) ||
            item.serialPostman.toLowerCase().includes(value) ||
            item.assetIDPlatform.toLowerCase().includes(value) ||
            item.assetIDPostman.toLowerCase().includes(value) ||
            item.source.toLowerCase().includes(value)
        );

        setFilteredData(filtered);
    }


    return (
        <div className="telamaticsTable">
            <div className='telamaticsTable__header content__sub__padding'>
                <p className='telamaticsTable__header--title title--sub'>{customerNmae}</p>
                <div className='telamaticsTable__header__search'>
                    <input
                        className="telamaticsTable__header__search--search"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <p className="telamaticsTable__header--total title--sub">Found: {data.length}</p>


            </div>
            <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
}

export default TelematicsTable;
