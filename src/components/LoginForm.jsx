import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {TextField, Button, Container, Typography, Box, Alert} from '@mui/material';

import {auth} from '../firebase';
import {setUser, setLoading, setError} from '../store/authSlice';
import PageHeadTitle from "./PageHeadTitle.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailTouched, setEmailTouched] = useState(false); // Track if email field was interacted with

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailTouched(true); // Mark email as touched on submit

        if (!validateEmail(email)) {
            dispatch(setError('Please enter a valid email address'));
            return;
        }

        if (password.length < 6) {
            dispatch(setError('Password must be at least 6 characters'));
            return;
        }

        dispatch(setLoading());
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
            <PageHeadTitle title={"Welcome back."}/>
            <Box>
                <Typography component="p" variant="body1">
                    First time at Leve Last Words? <Typography component={Link} to={'/last_words/signup'}>Sign up</Typography>
                </Typography>
            </Box>
            <Box sx={{marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit} style={{width: "100%"}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailTouched && !validateEmail(email)}
                        helperText={emailTouched && !validateEmail(email) && 'Please enter a valid email'}
                        onBlur={() => setEmailTouched(true)}
                    />


                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={password.length > 0 && password.length < 6}
                        helperText={password.length > 0 && password.length < 6 && 'Password must be at least 6 characters'}
                    />
                    <Button type="submit" fullWidth size={"large"} variant="contained" sx={{mt: 3, mb: 2}}
                            disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default LoginForm;
