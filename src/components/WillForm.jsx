import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Typography,
    Button,
    Container,
    Box,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Alert
} from '@mui/material';

import {addRecord, updateRecord, clearRecordError} from '../store/authSlice';
import AddresseesList from "./AddresseesList.jsx";
import TrusteesList from "./TrusteesList.jsx";

const steps = ['How to create Will', 'Write the will.', 'Specify the Addressees', 'Specify the trustees'];

function WillForm() {
    const {recordId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);
    const isEditing = !!recordId;

    const existingRecord = useSelector((state) =>
        isEditing ? state.auth.records.find(record => record.id === recordId) : null
    );

    const [addresseesRecords, setAddresseesRecords] = useState(existingRecord?.addresseesRecords || [{name: "", email: ""}]);
    const [trusteesRecords, setTrusteesRecords] = useState(existingRecord?.trusteesRecords || [{name: "", email: "", phone:""}]);
    const [recordData, setRecordData] = useState(
        isEditing ?
            existingRecord
            : {name: '', desc: '', addresseesRecords: addresseesRecords, trusteesRecords: trusteesRecords}
    );

    const handleUpdateAddresseesRecords = (newRecords) => {
        setAddresseesRecords(newRecords);
    };
    const handleUpdateTrusteesRecords = (newRecords) => {
        setTrusteesRecords(newRecords);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleInputChange = (e) => {
        setRecordData({
            ...recordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            console.log(recordData);
            dispatch(updateRecord({id: recordId, updatedRecord: {...recordData, addresseesRecords, trusteesRecords}}))
                .then(() => {
                    navigate('/wills');
                });
        } else {
            dispatch(addRecord({...recordData, addresseesRecords, trusteesRecords}))
                .then(() => {
                    navigate('/wills');
                });
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{mb: 2}}>

                        <h3> In order to leave a will you need to:</h3>
                        <ol>
                            <li><span>Write a will</span></li>
                            <li><span>Specify to whom it will be addressed</span></li>
                            <li><span>Specify the trustees</span>
                            <p>This is the person or persons who will be able to confirm and start the process of sending
                                the will to the addressee.</p></li>
                        </ol>

                    </Box>
                );
            case 1:
                return (
                    <Box sx={{mb: 2}}>
                        <Typography variant={"h3"}>Write the will</Typography>

                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={recordData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Description"
                            name="desc"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={recordData.desc}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{mb: 2}}>
                        <Typography variant={"h3"}>Specify the Addressee</Typography>
                        <AddresseesList existingRecords={addresseesRecords} onRecordsChange={handleUpdateAddresseesRecords}/>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{mb: 2}}>
                        <Typography variant={"h3"}>Specify the Trustees</Typography>
                        <TrusteesList existingRecords={trusteesRecords} onRecordsChange={handleUpdateTrusteesRecords}/>
                        {/* ... display recordData for confirmation ... */}
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    const [activeStep, setActiveStep] = useState(0);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditing ? 'Edit Record' : 'Add New Record'}
            </Typography>

            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{mt: 4}}>
                {activeStep === steps.length ? (
                    <Typography>
                        {isEditing ? 'Record updated successfully!' : 'Record submitted successfully!'}
                    </Typography>
                ) : (
                    <>
                        {getStepContent(activeStep)}
                        {error && <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>}
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : isEditing ? 'Update Record' : 'Submit'}
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default WillForm;
