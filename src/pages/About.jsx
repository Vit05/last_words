import { Typography } from '@mui/material';

function About() {
    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                About
            </Typography>
            <Typography variant="body1">
                This is the About page, only accessible to authenticated users.
            </Typography>
        </div>
    );
}

export default About;
