import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function ApiTab() {
    const [apiDetails, setApiDetails] = useState({
        apiKey: '',
        endpoint: ''
        // Add more fields as necessary
    });

    const handleInputChange = (event) => {
        setApiDetails({ ...apiDetails, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <TextField
                name="apiKey"
                label="API Key"
                value={apiDetails.apiKey}
                onChange={handleInputChange}
            />
            <TextField
                name="endpoint"
                label="Endpoint"
                value={apiDetails.endpoint}
                onChange={handleInputChange}
            />
            {/* Add more fields as necessary */}
        </div>
    );
}

export default ApiTab;
