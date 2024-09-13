import { Typography } from '@mui/material';

function Profile() {
    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Profile
            </Typography>
            <Typography variant="body1">
                This is the profile page, only accessible to authenticated users.
            </Typography>
        </div>
    );
}

export default Profile;
