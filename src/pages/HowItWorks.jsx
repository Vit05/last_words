import {Box, Typography} from '@mui/material';
import PageHeadTitle from "../components/PageHeadTitle.jsx";

function HowItWorks() {
    return (
        <Box>
            <PageHeadTitle title={"A simple and secure process for creating your will"}/>

            <Box>
                <dl>
                    <dt><Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>Our app offers an easy and convenient process for creating, storing and
                        transferring your personal will (WILL). Here's how it works:</Typography></dt>
                    <dt><Typography variant={"h5"} sx={{marginBottom:2}}>1. Authorize in the app and create your will</Typography></dt>
                    <dd><Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>You can write your final words, wishes and instructions for your loved
                        ones (ADDRESSEE). This can be your family, friends or other people who are significant to
                        you.</Typography>
                        <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>You can address them personally, expressing your love, gratitude and
                            hopes. This will make your will more personal and emotionally meaningful to them.</Typography></dd>
                    <dt><Typography variant={"h5"} sx={{marginBottom:2}}>2. Choose your trustees (TRUSTEE)</Typography></dt>
                    <dd><Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>Designate one or more trustees who will receive notice of your will after
                        you pass away.</Typography>
                        <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>Your trustees will be responsible for delivering the will to the
                            addressees (ADDRESSEE). These can be your loved ones, solicitors or other trusted persons whom you
                            have confidence in.</Typography>
                        <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>We recommend appointing more than one trustee in case one is unavailable.
                            This will ensure reliability of delivery.</Typography></dd>
                    <dt><Typography variant={"h5"} sx={{marginBottom:2}}>3. Publish your will</Typography></dt>
                    <dd><Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>When you are ready, you can publish your will on our app.</Typography>
                        <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>It will be stored in our secure and confidential vault until your trustees
                            are notified of your passing.</Typography></dd>
                    <dt><Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>All the data you provide is protected by our strict security measures. You
                        can rest assured that your will will be delivered to your loved ones upon your passing. We also
                        offer additional safeguards, if necessary, to ensure that your will is passed on
                        securely.</Typography></dt>
                </dl>
            </Box>
        </Box>
    );
}

export default HowItWorks;
