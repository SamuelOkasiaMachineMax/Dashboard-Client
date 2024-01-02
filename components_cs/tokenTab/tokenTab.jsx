import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function TokenTab() {
    const [tokenData, setTokenData] = useState({
        tokenName: '',
        expiresIn: ''
    });

    const handleInputChange = (event) => {
        setTokenData({ ...tokenData, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        // Handle submission logic
    };

    return (
        <div>
            <TextField
                name="tokenName"
                label="Token Name"
                value={tokenData.tokenName}
                onChange={handleInputChange}
            />
            <TextField
                name="expiresIn"
                label="Expires In"
                value={tokenData.expiresIn}
                onChange={handleInputChange}
            />
            <Button onClick={handleSubmit}>Create Token</Button>
        </div>
    );
}

export default TokenTab;
