import {Box, Typography} from '@mui/material';

function Profile() {
    return (
        <Box>
            <Typography variant="h1" component="h1" gutterBottom>
                Profile
            </Typography>
            <Typography variant="body1">
                This is the profile page, only accessible to authenticated users.
            </Typography>
        </Box>
    );
}

export default Profile;
