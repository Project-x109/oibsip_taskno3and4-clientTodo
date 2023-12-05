import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const labels = ['Personal', 'School', 'General'];

function LabelSelection({ selectedLabels, onLabelChange }) {
    const handleLabelChange = (event) => {
        onLabelChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Labels</InputLabel>
            <Select
                multiple
                value={selectedLabels || []} // Ensure it's an array or initialize as an empty array
                onChange={handleLabelChange}
                renderValue={(selected) => selected.join(', ')}
                variant="outlined"
                label="Labels"
            >
                {labels.map((label) => (
                    <MenuItem key={label} value={label}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default LabelSelection;
