import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button, Alert } from '@mui/material';
import { fetchRecord, deleteRecord, clearRecordError } from '../store/authSlice';

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
                navigate('/wills'); // Navigate back to the list after deletion
            });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Record Details
            </Typography>
            {record && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Title: {record.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Description: {record.desc}
                    </Typography>
                    {/* Display other record details here */}

                    <Button component={Link} to={`/wills/${record.id}/edit`} variant="contained" sx={{ mt: 2 }}>
                        Edit
                    </Button>
                    <Button onClick={handleDelete} variant="outlined" color="error" sx={{ mt: 2, ml: 2 }}>
                        Delete
                    </Button>
                </>
            )}
        </Container>
    );
}

export default WillDetails;
