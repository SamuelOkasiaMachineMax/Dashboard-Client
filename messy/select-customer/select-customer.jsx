'use client'

import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SelectCustomer = ({onCustomerSelect} ) => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/customers')
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleChange = (event) => {
        const name = event.target.value;
        setSelectedCustomer(name);
        onCustomerSelect(name);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Select a Customer</InputLabel>
            <Select value={selectedCustomer} onChange={handleChange}>
                {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.name}>
                        {customer.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCustomer;