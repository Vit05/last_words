import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Typography,
    Button,
    Box,
    Stepper,
    Step,
    StepLabel,
    Alert,
    StepContent
} from '@mui/material';

import {addRecord, updateRecord, clearRecordError} from '../store/authSlice';
import AddresseesList from "./AddresseesList.jsx";
import TrusteesList from "./TrusteesList.jsx";
import RichTextEditor from "./RichTextEditor.jsx";
import PageHeadTitle from "./PageHeadTitle.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    const [addresseesRecords, setAddresseesRecords] = useState(existingRecord?.addresseesRecords || [{
        index: 0,
        name: "",
        email: ""
    }]);
    const [willContent, setWillContent] = useState(existingRecord?.desc || "");
    const [trusteesRecords, setTrusteesRecords] = useState(existingRecord?.trusteesRecords || [{
        index: 0,
        name: "",
        email: "",
        phone: ""
    }]);
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

    const onWillContentChanged = (willContent, isValid) => {
        setWillContent(willContent)
        setRecordData({
            ...recordData,
            desc: willContent,
        });
        setIsSectionValid(isValid)
    }

    const handleSubmit = () => {
        if (isEditing) {
            dispatch(updateRecord({id: recordId, updatedRecord: {...recordData, addresseesRecords, trusteesRecords}}))
                .then(() => {
                    navigate('/last_words/wills');
                });
        } else {
            dispatch(addRecord({...recordData, addresseesRecords, trusteesRecords}))
                .then(() => {
                    navigate('/last_words/wills');
                });
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{paddingY: 2}}>
                        <Typography variant={"h5"} mb={3}>In order to leave a will you need to:</Typography>
                        <ol>
                            <li><span>Write a will</span></li>
                            <li><span>Specify to whom it will be addressed</span></li>
                            <li><span>Specify the trustees</span>
                                <p>This is the person or persons who will be able to confirm and start the process of
                                    sending
                                    the will to the addressee.</p></li>
                        </ol>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{paddingY: 2}}>
                        <RichTextEditor handleWill={onWillContentChanged} existingWill={willContent}/>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{paddingY: 2}}>
                        {/*<Typography variant={"h5"} mb={3}>Specify the Addressee</Typography>*/}
                        <AddresseesList existingRecords={addresseesRecords}
                                        onRecordsChange={handleUpdateAddresseesRecords}
                                        onValidStep={handleStepValidation}/>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{paddingY: 2}}>
                        {/*<Typography variant={"h5"} mb={3}>Specify the Trustees</Typography>*/}
                        <TrusteesList existingRecords={trusteesRecords} onRecordsChange={handleUpdateTrusteesRecords}
                                      onValidStep={handleStepValidation}/>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (activeStep === 0) {
            setIsSectionValid(true)
        }
    }, [activeStep, handleNext])

    useEffect(() => {
        if (isEditing) {
            setActiveStep(1)
        }
    }, [isEditing])

    return (
        <Box>
            <PageHeadTitle title={isEditing ? 'Edit Will' : 'Add New Will'} navigateTo={"/last_words/wills"}/>

            <Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel><Typography variant={"h4"}>{label}</Typography></StepLabel>
                            <StepContent>
                                    {getStepContent(index)}
                                {error && <Alert severity="error"
                                                 onClose={() => dispatch(clearRecordError())}>{error}</Alert>}
                                <Box sx={{display: 'flex', justifyContent: 'space-between', paddingY: 3}}>
                                    {activeStep !== 0 ? <Button disabled={activeStep === 0}
                                                                size={'large'}
                                                                color={'dark'}
                                                                startIcon={<ArrowBackIcon fontSize={"large"}/>}
                                                                onClick={handleBack}>
                                        Back
                                    </Button> : <div></div>}
                                    {activeStep === steps.length - 1 ? (
                                        <Button disabled={!isSectionValid || isLoading} variant="contained"
                                                onClick={handleSubmit}>
                                            {isLoading ? 'Saving...' : isEditing ? 'Update Will' : 'Save'}
                                        </Button>
                                    ) : (
                                        <Button disabled={!isSectionValid} color={'dark'}
                                                size={'large'}
                                                sx={{
                                                    color: "#ffffff",
                                                    backgroundColor: "#000000",
                                                    '&:hover': {
                                                        backgroundColor: "rgba(0,0,0,0.7)",
                                                    },
                                                }}
                                                variant="contained" onClick={handleNext}>
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

            </Box>

            <Box>
                {activeStep === steps.length && (
                    <Typography>
                        {isEditing ? 'Record updated successfully!' : 'Record submitted successfully!'}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default WillForm;
