import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
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
    Alert, Container, Box, CardContent, CardActions, Card
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import {Link} from 'react-router-dom';

import {getRecords, deleteRecord, clearRecordError} from '../store/authSlice';
import PageHeadTitle from "../components/PageHeadTitle.jsx";

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

    const handlePublish = (recordId) => {
        console.log("PUBLISH will when it completed edited. It means that we will send email to trusties who will aware that they are trigger sending WILL to addressee (it can be directly or electronic mailing. Or notifying by lawyer)", recordId);
    };

    return (
        <Box>
            <PageHeadTitle title={"Your Wills"}/>

            <Box sx={{paddingBottom: 2}}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/wills/new')} // Navigate to /records/new to add a new record
                >Start Adding New Will</Button>
            </Box>


            {error && <Alert severity="error" onClose={() => dispatch(clearRecordError())}>{error}</Alert>}

            <Box sx={{display: 'grid', gridTemplateColumns: {sx: "1fr", sm:"1fr 1fr"}, gap: 5}}>
                {records.length > 0
                    && (records.map((record, index) => (<Card key={index}
                                                              sx={{
                                                                  width: "100%",
                                                                  minHeight: {sx: "auto", sm: "300px"},
                                                                  display: "flex",
                                                                  flexDirection: "column",
                                                                  alignItems: "stretch",
                                                                  justifyContent: "space-between",
                                                              }}>
                        <CardContent>
                            <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                <div
                                    dangerouslySetInnerHTML={{__html: record.desc}}
                                />
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box>
                                <Button size="large" component={Link} to={`/wills/${record.id}`}>Read more</Button>
                            </Box>
                            <Box>
                                <IconButton component={Link} to={`/wills/${record.id}/edit`}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => handleDelete(record.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={() => handlePublish(record.id)}>
                                    <PublishIcon/>
                                </IconButton>
                            </Box>



                        </CardActions>
                    </Card>)))}

            </Box>
            {/*<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records ? records.map((record, index) => (
                            <TableRow key={record.id}>
                                <TableCell width={"10%"}>
                                    <Button component={Link} to={`/wills/${record.id}`}>  Link to detail page
                                        {index + 1}
                                    </Button>
                                </TableCell>
                                <TableCell width={"70%"}>{record.desc}</TableCell>
                                <TableCell width={"20%"}>
                                    <IconButton component={Link} to={`/wills/${record.id}/edit`}>  Link to edit page
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(record.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handlePublish(record.id)}>
                                        <PublishIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )): <>Not Records Found</>}
                    </TableBody>
                </Table>
            </TableContainer>*/}
        </Box>
    );
}

export default WillsList;
