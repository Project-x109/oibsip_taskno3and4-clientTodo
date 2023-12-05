import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Chip, Grid } from '@mui/material';

function TagInput({ selectedTags, onTagChange }) {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const handleTagChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagInput) {
            const newTags = [...tags, tagInput];
            setTags(newTags);
            setTagInput('');
            onTagChange(newTags); // Notify the parent component about the tag change
        }
    };

    const handleDeleteTag = (tag) => {
        const filteredTags = tags.filter((t) => t !== tag);
        setTags(filteredTags);
        onTagChange(filteredTags); // Notify the parent component about the tag change
    };

    return (
        <div>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                    <TextField
                        label="Add a Tag"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter a tag"
                        value={tagInput}
                        onChange={handleTagChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleAddTag();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleAddTag}>
                        Add Tag
                    </Button>
                </Grid>
            </Grid>
            <div>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                    />
                ))}
            </div>
        </div>
    );
}

export default TagInput;
