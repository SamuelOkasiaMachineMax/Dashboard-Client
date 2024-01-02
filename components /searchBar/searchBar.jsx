import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './searchBar.css'
const SearchBar = ({ onSearch }) => {
    return (
        <input

            className="searchBar"
            id="search-bar"
            placeholder="Enter customer name"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchBar