import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Typography, Button, Container, Box } from '@mui/material';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase';
import { clearUser } from '../store/authSlice';

function Home() {
    // const user = useSelector((state) => state.auth.user);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await signOut(auth);
    //         dispatch(clearUser());
    //         // navigate('/login'); // Redirect to login after logout
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //         // Handle logout error (e.g., display an error message)
    //     }
    // };
    return (
        <Box>
            <Box  sx={{paddingY:4}}>
               <Typography variant={"h1"} component={"h1"}>Leave your legacy for loved ones</Typography>
            </Box>


           <Box sx={{marginBottom:4}}>
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Our app provides a secure and confidential space where you can create a personal will (WILL) for your loved ones. Upon your passing, your final thoughts, wishes and instructions will be carefully delivered to those you care about.</Typography>
           {/*</Box>*/}
           {/* <Box>*/}
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>We understand how important it is to leave your legacy and a piece of yourself for those close to you. Your words can be a source of comfort, inspiration and wisdom, helping them through the grief of loss and move forward. It gives you the opportunity to express your love and care for them, even after you are gone.</Typography>
            {/*</Box>*/}
            {/*<Box>*/}
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Creating a will is an act of deep love and responsibility. It allows you to prepare your final wishes and instructions to be preserved and passed on to your loved ones. Your words can be a priceless gift to help them find the strength to overcome grief and continue to live their lives in accordance with your values.</Typography>
            </Box>
            <Box>
               <Typography variant={"h2"}>Why it matters.</Typography>
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Your words will be a source of comfort and inspiration to your loved ones during difficult times. They will be able to relate to them, feeling your support and wisdom.</Typography>
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>This allows you to express your love, gratitude and admonitions to those you care about. Your wishes will be an invaluable legacy to them.</Typography>
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Your stories, values and life lessons will be passed on to the next generation, keeping you connected to your family.</Typography>
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Creating a will is an act of responsibility that demonstrates your care for your loved ones even after you are gone.</Typography>
            {/*</Box>*/}
            {/*<Box>*/}
               <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}} gutterBottom>Don't procrastinate - start creating your will now. It will only take a few minutes, but will give your loved ones a priceless gift for a lifetime. Our team will help you through the process easily and confidentially.</Typography>
            </Box>
        </Box>
    );
}

export default Home;
