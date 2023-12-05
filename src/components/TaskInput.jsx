// TaskInput.js
import React from 'react';
import TextField from '@mui/material/TextField';

function TaskInput({ onTaskChange }) {
    const handleTaskChange = (event) => {
        const newTask = event.target.value;
        onTaskChange(newTask); // Pass the new task to the parent component
    };

    return (
        <div>
            <TextField
                label="Add Task"
                variant="outlined"
                fullWidth
                placeholder="Enter a task"
                onChange={handleTaskChange}
            />
        </div>
    );
}

export default TaskInput;
