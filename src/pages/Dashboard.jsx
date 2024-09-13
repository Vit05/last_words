import { Typography } from '@mui/material';

function Dashboard() {
    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1">
                This is the dashboard page, only accessible to authenticated users.
            </Typography>
        </div>
    );
}

export default Dashboard;
