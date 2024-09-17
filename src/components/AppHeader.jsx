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

import {auth} from '../firebase';
import {clearUser} from '../store/authSlice';
import {AccountCircle} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";


const drawerWidth = 240;

const pages = [{path: "/", name: 'Home'}, {path: "/faq", name: 'FAQ'}, {
    path: "/About-us",
    name: 'About Us'
}, {path: "/contacts", name: 'Contacts'}];

const NavigationLinks = () => {
    return (<>
        {pages.map((page) => (
            <MenuItem key={page.name} component={Link} to={page.path}>
                <Typography>{page.name}</Typography>
            </MenuItem>
        ))}
    </>)
}

export default function AppHeader() {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                MUI
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
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                    >LLWs</Typography>
                    <Box sx={{width: "100%", display: "flex", justifyContent: {xs: 'flex-end', sm: 'space-between'}}}>
                        <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
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
                                    <MenuItem component={Link} to={'/profile'} onClick={handleClose}>
                                        <Typography>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem component={Link} to={"/dashboard"} onClick={handleClose}>
                                        <Typography>Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            : <Box display={"flex"} alignItems={"center"}>
                                <MenuItem component={Link} to={'/login'}>
                                    <Typography>Login</Typography>
                                </MenuItem>
                                <Typography>&nbsp;/&nbsp;</Typography>
                                <MenuItem component={Link} to={'/signup'}>
                                    <Typography>Signup</Typography>
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
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}>{drawer}</Drawer>
        </Box>
    );
}
