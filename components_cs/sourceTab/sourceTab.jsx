import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function SourceTab() {
    const [source, setSource] = useState({
        sourceName: '',
        sourceType: ''
    });

    const handleInputChange = (event) => {
        setSource({ ...source, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <TextField
                name="sourceName"
                label="Source Name"
                value={source.sourceName}
                onChange={handleInputChange}
            />
            <TextField
                name="sourceType"
                label="Source Type"
                value={source.sourceType}
                onChange={handleInputChange}
            />
            {/* Add more fields as necessary */}
        </div>
    );
}

export default SourceTab;
