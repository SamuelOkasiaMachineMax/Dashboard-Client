'use client'

import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IoIosSearch } from "react-icons/io";

import SearchBar from "@/components /searchBar/searchBar";
import "./alerts.css"
import {ClipLoader} from "react-spinners";


const fetchData = async () => {
    const response = await fetch('http://localhost:5000/alerts'); // Replace with your backend URL
    if (!response.ok) {
        throw new Error('Data fetching failed');
    }
    return response.json();
};
const Alerts = ( {data, loading} ) => {

    const [searchText, setSearchText] = useState('');

    // Filter data based on search text
    const filteredData = data.filter((row) => {
        return Object.values(row).some((field) => {
            // Check if the field is not null or undefined before calling toString
            return field != null && field.toString().toLowerCase().includes(searchText.toLowerCase());
        });
    });

    const columns = [
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'message', headerName: 'Alert', width: 500 },

    ];



    return (
        <div className="alerts">

            <div className="alerts__content">

                <div>
                    <div className='alerts__header content__sub__padding'>
                        <p className='alerts__header--title title--sub'>Alerts</p>
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
                    <DataGrid rows={filteredData} columns={columns} pageSize={5}  getRowId={(row) => row.customer + row.message} />

                </div>


            </div>
        </div>
    );
};

export default Alerts;