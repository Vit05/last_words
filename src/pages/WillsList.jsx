import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert, Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import { getRecords, deleteRecord, clearRecordError } from '../store/authSlice';

function WillsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const records = useSelector((state) => state.auth.records);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        dispatch(getRecords());
    }, [dispatch]);

    const handleDelete = (recordId) => {
        dispatch(deleteRecord(recordId));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Records List
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => navigate('/wills/new')} // Navigate to /records/new to add a new record
            >
                Add New Record
            </Button>

            {error && <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records ? records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>
                                    <Button component={Link} to={`/wills/${record.id}`}> {/* Link to detail page */}
                                        {record.name}
                                    </Button>
                                </TableCell>
                                <TableCell>{record.desc}</TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={`/wills/${record.id}/edit`}> {/* Link to edit page */}
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(record.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )): <>Not Records Found</>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default WillsList;
