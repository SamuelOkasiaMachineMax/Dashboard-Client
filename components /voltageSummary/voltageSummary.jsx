'use client'

import React, {useState} from 'react';
import {IoIosSearch} from "react-icons/io";
import SearchBar from "@/components /searchBar/searchBar";
import {DataGrid} from "@mui/x-data-grid";

import './voltageSummary.css'
import {ClipLoader} from "react-spinners";

const VoltageSummary = ( {data, loading} ) => {


    const a_columns = [
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'no_voltage', headerName: 'No Voltage', width: 150 },
        { field: 'low_voltage', headerName: 'Low Voltage', width: 150 },
        { field: 'normal_voltage', headerName: 'Normal Voltage', width: 150 },

    ];

    const [searchText,setSearchText] = useState('');

    // Filter data based on search text
    const filteredData = data.filter((row) => {
        return Object.values(row).some((field) => {
            // Check if the field is not null or undefined before calling toString
            return field != null && field.toString().toLowerCase().includes(searchText.toLowerCase());
        });
    });

    return (
            <div className="alerts__content__battery">
                <div className='alerts__header content__sub__padding'>
                    <p className='alerts__header--title title--sub'>Voltage Summary</p>
                    <div className='alerts__header__search'>
                        <IoIosSearch/>
                        <SearchBar onSearch={(text) => setSearchText(text)} />
                        {loading && (
                            <div className="fileupload__content--spinner">
                                <ClipLoader color="#1976d2" loading={loading}/>
                            </div>
                        )}
                    </div>
                </div>
                <DataGrid rows={filteredData} columns={a_columns} pageSize={5}  getRowId={(row) => row.customer + row.message} />
            </div>
    );
};

export default VoltageSummary;