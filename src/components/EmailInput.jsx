// EmailInput.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Chip, Grid } from '@mui/material';

function EmailInput({ onEmailAdd }) {
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');

    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleAddEmail = () => {
        if (emailInput) {
            const newEmails = [...emails, emailInput];
            setEmails(newEmails);
            setEmailInput('');
            onEmailAdd(newEmails); // Pass the updated emails array to the parent component
        }
    };

    const handleDeleteEmail = (email) => {
        const filteredEmails = emails.filter((e) => e !== email);
        setEmails(filteredEmails);
        onEmailAdd(filteredEmails); // Pass the updated emails array to the parent component
    };

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                    <TextField
                        label="Invite Users by Email"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter email address"
                        value={emailInput}
                        onChange={handleEmailChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleAddEmail();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddEmail}
                    >
                        AddEmail
                    </Button>
                </Grid>
            </Grid>
            <div>
                {emails.map((email) => (
                    <Chip
                        key={email}
                        label={email}
                        onDelete={() => handleDeleteEmail(email)}
                    />
                ))}
            </div>
        </div>
    );
}

export default EmailInput;
