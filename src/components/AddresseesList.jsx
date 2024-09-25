import React, {useState} from 'react';
import {TextField, Button, Box, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddresseesList = ({existingRecords, onRecordsChange, isTrustees}) => {
    const [records, setRecords] = useState(existingRecords || [{index: 0, name: '', email: ''}]);
    const [errors, setErrors] = useState({});

    // Validate input for a single record
    const validate = (record) => {
        let isValid = true;
        let error = {};

        // Name validation
        if (!record.name.trim()) {
            error.name = 'Name is required';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!record.email.trim()) {
            error.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(record.email)) {
            error.email = 'Invalid email format';
            isValid = false;
        }

        return {isValid, error};
    };

    // Handle input change for each record
    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const updatedRecords = [...records];
        updatedRecords[index] = {...updatedRecords[index], [name]: value};
        setRecords(updatedRecords);
        onRecordsChange(updatedRecords); // Notify parent of the change

    };

    // Add a new record
    const handleAddRecord = () => {
        const lastRecord = records[records.length - 1];
        const validation = validate(lastRecord);

        if (validation.isValid) {
            const newRecords = [...records, { index: records.length, name: '', email: '' }];
            setRecords(newRecords);
            onRecordsChange(newRecords); // Notify parent of the change
            setErrors({});
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [lastRecord.index]: validation.error }));
        }
    };

    // Delete a record except for the first one
    const handleDeleteRecord = (index) => {
        if (index !== 0) {
            const newRecords = records.filter((_, i) => i !== index);
            setRecords(newRecords);
            onRecordsChange(newRecords); // Notify parent of the change
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Dynamic Records
            </Typography>

            {records.map((record, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                    <TextField
                        label="Name"
                        name="name"
                        value={record.name}
                        onChange={(e) => handleChange(e, index)}
                        error={!!(errors[index] && errors[index].name)}
                        helperText={errors[index]?.name}
                        sx={{mr: 2}}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={record.email}
                        onChange={(e) => handleChange(e, index)}
                        error={!!(errors[index] && errors[index].email)}
                        helperText={errors[index]?.email}
                        sx={{mr: 2}}
                    />
                    {index !== 0 && (
                        <IconButton
                            onClick={() => handleDeleteRecord(index)}
                            aria-label="delete"
                            color="secondary"
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                </Box>
            ))}

            <Button variant="contained" color="primary" onClick={handleAddRecord} sx={{mt: 2}}>
                Add New Record
            </Button>

            <Box mt={4}>
                <Typography variant="h6">Records Array (for debugging)</Typography>
                <pre>{JSON.stringify(records, null, 2)}</pre>
            </Box>
        </Box>
    );
};

export default AddresseesList;
