import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Typography, Button, Container, Box } from '@mui/material';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase';
import { clearUser } from '../store/authSlice';

function Home() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            // navigate('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error (e.g., display an error message)
        }
    };
    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Our App
                </Typography>

                <Typography variant="body1" paragraph>
                    Some static content goes here. This page is visible to everyone.
                </Typography>

                {user ? (
                    <>
                        <Typography variant="body1">
                            You are logged in as: {user.email}
                        </Typography>
                        <Button component={Link} to="/dashboard" variant="contained" sx={{ mt: 2 }}>
                            Go to Dashboard
                        </Button>
                        <Button component={Link} to="/profile" variant="outlined" sx={{ mt: 2 }}>
                            Edit Profile
                        </Button>
                        <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
                        Login</Button>
                        or
                        <Button component={Link} to="/signup" variant="contained" sx={{ mt: 2 }}>Sign Up</Button>


                    </>

                )}
            </Box>
        </Container>
    );
}

export default Home;
