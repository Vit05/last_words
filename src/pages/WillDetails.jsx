import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Typography, Container, Button, Alert, Box} from '@mui/material';
import { fetchRecord, deleteRecord, clearRecordError } from '../store/authSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import PageHeadTitle from "../components/PageHeadTitle.jsx";

function WillDetails() {
    const { recordId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const record = useSelector((state) => state.auth.selectedRecord);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        dispatch(fetchRecord(recordId));
    }, [dispatch, recordId]);

    const handleDelete = () => {
        dispatch(deleteRecord(recordId))
            .then(() => {
                navigate('/last_words/wills'); // Navigate back to the list after deletion
            });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>;
    }

    return (
        <Box>
            <PageHeadTitle title={"Record Details"} navigateTo={"/wills"}/>

            {record && (
                <>

                    <Box>
                        <Typography variant="body1" sx={{color: 'text.secondary'}}>
                            <div
                                dangerouslySetInnerHTML={{__html: record.desc}}
                            />
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to={`/last_words/wills/${record.id}/edit`} variant="contained" sx={{ mt: 2 }}>
                            Edit
                        </Button>
                        <Button onClick={handleDelete} variant="outlined" color="error" sx={{ mt: 2, ml: 2 }}>
                            Delete
                        </Button>
                    </Box>

                </>
            )}
        </Box>
    );
}

export default WillDetails;
