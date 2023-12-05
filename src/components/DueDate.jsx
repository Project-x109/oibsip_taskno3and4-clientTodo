import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function DueDate({ onDueDateChange }) {
    const [selectedDueDate, setSelectedDueDate] = useState(null);

    const handleDueDateChange = (date) => {
        setSelectedDueDate(date);
        onDueDateChange(date); // Notify the parent component about the due date change
    };

    return (
        <div>
            <TextField
                label="Due Date"
                type="date"
                style={{width:"100%"}}
                value={selectedDueDate}
                onChange={(event) => handleDueDateChange(event.target.value)}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
}

export default DueDate;
