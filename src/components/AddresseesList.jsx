import React, {useEffect, useState} from 'react';
import {TextField, Button, Box, IconButton, Stack, Divider} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddresseesList = ({existingRecords, onRecordsChange, onValidStep}) => {
    const [records, setRecords] = useState(existingRecords || [{index: 0, name: '', email: ''}]);
    const [errors, setErrors] = useState({});

    // Validate input for a single record
    const validate = (record, index) => {
        let isValid = true;
        let error = {};

        // Name validation
        if(record.name && record.name.trim().length > 0){
            if (!record.name.trim()) {
                error.name = 'Name is required';
                isValid = false;
            }
        }else{
            isValid = false;
        }



        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(record.email && record.email.trim().length > 0){
            if (!record.email.trim()) {
                error.email = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(record.email)) {
                error.email = 'Invalid email format';
                isValid = false;
            }
        }else{
            isValid = false;
        }


        // Update error state for the specific record
        setErrors((prevErrors) => ({
            ...prevErrors,
            [index]: error,
        }));

        return isValid;
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRecords = [...records];
        updatedRecords[index] = { ...updatedRecords[index], [name]: value };
        setRecords(updatedRecords);
        onRecordsChange(updatedRecords); // Notify parent of the change
    };

    const handleBlur = (index) => {
        validate(records[index], index); // Trigger validation onBlur
    };

    const handleAddRecord = () => {
        const newRecords = [...records, { index: records.length, name: '', email: '' }];
        setRecords(newRecords);
        onRecordsChange(newRecords); // Notify parent of the change
        setErrors({});
    };

    const handleDeleteRecord = (index) => {
        if (index !== 0) {
            const newRecords = records.filter((_, i) => i !== index);
            setRecords(newRecords);
            onRecordsChange(newRecords); // Notify parent of the change
        }
    };

    useEffect(() => {
        const lastIndex = records.length - 1;
        const lastRecord = records[lastIndex];
        const validation = validate(lastRecord, lastIndex);
        onValidStep(validation);
    }, [records, onValidStep]); // Watch for changes in records
 return (
        <Box>
            {records.map((record, index) => (
                <Stack key={index}
                       sx={{paddingBottom: 1, borderBottom:"2px solid #cdcdcd", marginBottom: 3, alignItems: 'center'}}
                       direction="row"
                       spacing={2}>

                    <Box sx={{width: '45%'}}>
                        <TextField
                            label="Full Name"
                            name="name"
                            fullWidth
                            value={record.name}
                            onChange={(e) => handleChange(e, index)}
                            onBlur={() => handleBlur(index)} // Trigger validation on blur
                            error={!!errors[index]?.name} // Only show error if validation fails
                            helperText={errors[index]?.name} // Show error message after blur
                        />
                    </Box>
                    <Box sx={{width: "45%"}}>
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            value={record.email}
                            onChange={(e) => handleChange(e, index)}
                            onBlur={() => handleBlur(index)} // Trigger validation on blur
                            error={!!errors[index]?.email} // Only show error if validation fails
                            helperText={errors[index]?.email} // Show error message after blur
                        />
                    </Box>
                    <Box sx={{width:'5%'}}>
                        {index !== 0 && (
                            <IconButton
                                onClick={() => handleDeleteRecord(index)}
                                aria-label="delete"
                                color="secondary">
                                <DeleteIcon/>
                            </IconButton>
                        )}
                    </Box>
                    <Divider sx={{paddingY:1, backgroundColor: "#000000"}}/>
                </Stack>
            ))}

            <Button variant="contained" color="primary" onClick={handleAddRecord} sx={{mt: 2}}>
                Add New Addressee
            </Button>

            {/*<Box mt={4}>*/}
            {/*    <Typography variant="h6">Records Array (for debugging)</Typography>*/}
            {/*    <pre>{JSON.stringify(records, null, 2)}</pre>*/}
            {/*</Box>*/}
            {/*<Box mt={4}>*/}
            {/*    <Typography variant="h6">Errors:</Typography>*/}
            {/*    <pre>{JSON.stringify(errors, null, 2)}</pre>*/}
            {/*</Box>*/}
        </Box>
    );
};

export default AddresseesList;
