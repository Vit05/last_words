import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

import { auth } from '../firebase';
import { setUser, setLoading, setError } from '../store/authSlice';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            dispatch(setError('Please enter a valid email address'));
            return;
        }

        if (password.length < 6) {
            dispatch(setError('Password must be at least 6 characters'));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(setError('Passwords do not match'));
            return;
        }

        dispatch(setLoading());
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });
            dispatch(setUser(userCredential.user));
            navigate('/last_words');
        } catch (error) {
            dispatch(setError(error.message));
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <Box maxWidth="500px" sx={{margin: "0 auto"}}>
            <Box sx={{paddingY:4}}>
                <Typography component="h1" variant="h1">
                    Sign Up
                </Typography>
            </Box>
            <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="displayName"
                        label="Display Name"
                        name="displayName"
                        autoComplete="displayName"
                        autoFocus
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!validateEmail(email)}
                        helperText={!validateEmail(email) && 'Please enter a valid email'}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={password.length > 0 && password.length < 6}
                        helperText={password.length > 0 && password.length < 6 && 'Password must be at least 6 characters'}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirmPassword.length > 0 && confirmPassword !== password}
                        helperText={
                            confirmPassword.length > 0 && confirmPassword !== password && 'Passwords do not match'
                        }
                    />
                    <Button type="submit" size={"large"}  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default SignupForm;
