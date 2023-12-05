import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Priority = ['High', 'Medium', 'Low'];

function PrioritySelection({ selectedPriority, onPriorityChange }) {
    const handlePriorityChange = (event) => {
        onPriorityChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
                value={selectedPriority || []} // Ensure it's an array or initialize as an empty array
                onChange={handlePriorityChange}
                variant="outlined"
                label="Priority"
            >
                {Priority.map((label) => (
                    <MenuItem key={label} value={label}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default PrioritySelection;
