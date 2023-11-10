'use client'

import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';

const CustomerDropdown = ( { onCustomerChange } ) => {
    const [customers, setCustomers] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/customers')
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);


    const handleChange = (event) => {
        setSelected(event.target.value);
        onCustomerChange(event.target.value);
    };

    return (
        <Select value={selected} onChange={handleChange}>
            {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.name}>
                    {customer.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomerDropdown;