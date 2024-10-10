import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Divider, Drawer, List, Menu, MenuItem} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase';
import {clearUser, setUser} from '../store/authSlice';
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";


const drawerWidth = 240;

const pages = [
    {path: "/", name: 'Home'},
    {path: "/how-it-works", name: 'How It Works'},
    {path: "/faq", name: 'FAQ'},
    {path: "/about-us", name: 'About Us'},
    // {path: "/contacts", name: 'Contacts'}
];

const  NavigationLinks = () => {
    return (<>
        {pages.map((page) => (
            <MenuItem key={page.name} component={Link} to={page.path}>
                <Typography variant={"button"}>{page.name}</Typography>
            </MenuItem>
        ))}
    </>)
}

export default function AppHeader() {

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(clearUser());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 0}}>
                Leave Last Words
            </Typography>
            <Divider/>
            <List>
                <NavigationLinks/>
            </List>
        </Box>
    );

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            handleClose()
            navigate('/'); // Redirect to login after logout
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error (e.g., display an error message)
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{width: "auto", whiteSpace: "nowrap"}}>LLW</Typography>
                    <Box sx={{width: "100%", display: "flex", marginLeft: 2, justifyContent: {xs: 'flex-end', md: 'space-between'}}}>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <NavigationLinks/>
                        </Box>

                        {user
                            ? <Box>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {/*<MenuItem component={Link} to={'/profile'} onClick={handleClose}>*/}
                                    {/*    <Typography variant={"button"}>Profile</Typography>*/}
                                    {/*</MenuItem>*/}
                                    {/*<MenuItem component={Link} to={"/dashboard"} onClick={handleClose}>*/}
                                    {/*    <Typography variant={"button"}>Dashboard</Typography>*/}
                                    {/*</MenuItem>*/}
                                    <MenuItem component={Link} to={"/wills"} onClick={handleClose}>
                                        <Typography variant={"button"}>Wills</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography variant={"button"}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            : <Box display={"flex"} alignItems={"center"}>
                                <MenuItem component={Link} to={'/login'}>
                                    <Typography>Login</Typography>
                                </MenuItem>
                            </Box>}
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}>{drawer}</Drawer>
        </Box>
    );
}
