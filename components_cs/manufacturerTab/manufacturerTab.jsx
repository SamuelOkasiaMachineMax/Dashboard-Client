import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function ManufacturerTab() {
    const [manufacturer, setManufacturer] = useState({
        name: '',
        location: ''
        // Add more fields as necessary
    });

    const handleInputChange = (event) => {
        setManufacturer({ ...manufacturer, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <TextField
                name="name"
                label="Manufacturer Name"
                value={manufacturer.name}
                onChange={handleInputChange}
            />
            <TextField
                name="location"
                label="Location"
                value={manufacturer.location}
                onChange={handleInputChange}
            />
            {/* Add more fields as necessary */}
        </div>
    );
}

export default ManufacturerTab;
