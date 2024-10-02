import {useEffect, useState} from 'react';
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
    Alert, Paper
} from '@mui/material';

import {addRecord, updateRecord, clearRecordError} from '../store/authSlice';
import AddresseesList from "./AddresseesList.jsx";
import TrusteesList from "./TrusteesList.jsx";
import RichTextEditor from "./RichTextEditor.jsx";

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

    const [isSectionValid, setIsSectionValid] = useState(true);
    const [addresseesRecords, setAddresseesRecords] = useState(existingRecord?.addresseesRecords || [{index:0, name: "", email: ""}]);
    const [willContent, setWillContent] = useState(existingRecord?.desc || "");
    const [trusteesRecords, setTrusteesRecords] = useState(existingRecord?.trusteesRecords || [{index:0, name: "", email: "", phone:""}]);
    const [recordData, setRecordData] = useState(
        isEditing ?
            existingRecord
            : {name: '', desc: '', addresseesRecords: addresseesRecords, trusteesRecords: trusteesRecords}
    );


    const handleStepValidation = (newValue) => {
        setIsSectionValid(newValue);
    };
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

    const onWillContentChanged = (willContent, isValid)=>{
        setWillContent(willContent)
        setRecordData({
            ...recordData,
            desc: willContent,
        });
        setIsSectionValid(isValid)
    }

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
                        <Typography variant={"h5"} mb={3}>In order to leave a will you need to:</Typography>
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
                        <Typography variant={"h5"} mb={3}>Write the will</Typography>

                       <Box>
                           <RichTextEditor handleWill={onWillContentChanged}
                                           existingWill={willContent}/>
                       </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{mb: 2}}>
                        <Typography variant={"h5"} mb={3}>Specify the Addressee</Typography>
                        <AddresseesList existingRecords={addresseesRecords}
                                        onRecordsChange={handleUpdateAddresseesRecords}
                                        onValidStep={handleStepValidation}/>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{mb: 2}}>
                        <Typography variant={"h5"} mb={3}>Specify the Trustees</Typography>
                        <TrusteesList existingRecords={trusteesRecords}
                                      onRecordsChange={handleUpdateTrusteesRecords}
                                      onValidStep={handleStepValidation}/>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {
        if(activeStep === 0) {
            setIsSectionValid(true)
        }

    },[activeStep, handleNext])
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
                        <Paper square={false} sx={{padding: 4}}>
                            {getStepContent(activeStep)}
                        </Paper>
                        {error && <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>}
                        <Box sx={{display: 'flex', justifyContent: 'space-between', paddingY: 3}}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button disabled={!isSectionValid || isLoading} variant="contained" onClick={handleSubmit}>
                                    {isLoading ? 'Submitting...' : isEditing ? 'Update Record' : 'Submit'}
                                </Button>
                            ) : (
                                <Button disabled={!isSectionValid} variant="contained" onClick={handleNext}>
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
