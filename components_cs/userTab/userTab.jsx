import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function UserTab() {
    const initialUser = { email: '', name: '', lastname: '', role: '', organisation: '' };
    const [users, setUsers] = useState([initialUser]);

    const handleInputChange = (index, event) => {
        const updatedUsers = users.map((user, userIndex) => {
            if (index === userIndex) {
                return { ...user, [event.target.name]: event.target.value };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const addUser = () => {
        setUsers([...users, { ...initialUser }]);
    };

    return (
        <div>
            {users.map((user, index) => (
                <div key={index}>
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={user.email}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={user.name}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    {/* Additional input fields for lastname, role, organisation */}
                </div>
            ))}
            <Button onClick={addUser} variant="contained">
                Add Another User
            </Button>
        </div>
    );
}

export default UserTab;
