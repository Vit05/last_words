/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

          <div>
              <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>*/

import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {auth} from './firebase';
import {setUser, clearUser} from './store/authSlice';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import {theme} from './style/theme.js';
import {Box, Container, useScrollTrigger} from "@mui/material";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import About from "./pages/About.jsx";

// import Toolbar from "@mui/material/Toolbar";


function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return children
        ? React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        })
        : null;
}

ElevationScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function App() {
    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             dispatch(setUser(user));
    //         } else {
    //             dispatch(clearUser());
    //         }
    //     });
    //
    //     return unsubscribe;
    // }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline/>
            <Router>

                <AppHeader/>
                <Box marginTop={9}>
                    <Container maxWidth="md">
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/about-us" element={<About/>}/>
                            <Route path="/" element={<Home/>}/>
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile/>
                                    </PrivateRoute>
                                }
                            />
                        </Routes>

                    </Container>
                </Box>
            </Router>

        </ThemeProvider>
    );
}

export default App;
