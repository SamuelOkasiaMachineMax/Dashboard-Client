'use client'

import React, {useState} from 'react';
import {IoIosSearch} from "react-icons/io";
import SearchBar from "@/components /searchBar/searchBar";
import {DataGrid} from "@mui/x-data-grid";

import './batterySummary.css'
import {ClipLoader} from "react-spinners";

const BatterySummary = ( {data, loading} ) => {


    const a_columns = [
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'low_battery_count', headerName: 'Low battery', width: 150 },
        { field: 'medium_battery_count', headerName: 'Medium battery', width: 150 },
        { field: 'high_battery_count', headerName: 'High battery', width: 150 },

    ];

    const [searchText, setSearchText] = useState('');

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
                    <p className='alerts__header--title title--sub'>Battery Summary</p>
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

export default BatterySummary;