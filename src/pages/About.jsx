import {Box, Typography} from '@mui/material';
import PageHeadTitle from "../components/PageHeadTitle.jsx";

function About() {
    return (
        <Box>
            <PageHeadTitle title={"Our mission is to preserve your legacy"}/>
            <Box  sx={{paddingY:4}}>
                <Typography variant="h1" component="h1" gutterBottom></Typography>
            </Box>

            <Box>
                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>We are a team dedicated to creating a safe and confidential way for people to leave their last words and wishes for loved ones. Our app came about after we came across stories of people who wanted to share their last thoughts but didn't know how to go about it. We believe that everyone deserves the opportunity to leave their legacy and message to those they care about.</Typography>

                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>Our team is made up of experts in technology, psychology and law. We work to create a secure and user-friendly platform that allows you to prepare your will (WILL) with peace of mind and be confident that it will be delivered to your loved ones after you are gone.</Typography>

                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>We understand how sensitive and personal this topic can be. This is why we take special care to ensure the security and privacy of your details. Our goal is to provide you with the opportunity to leave your legacy without worrying about its safety and delivery.</Typography>

                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>We believe that your final words can be a priceless gift to your loved ones. They will help them process the grief of loss, keep your memory alive, and continue to live up to your values. Our mission is to make this process as simple, safe and meaningful as possible for you and your loved ones.</Typography>

                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>The story behind the creation of our app Our team came across touching stories of people who wanted to leave their last words for loved ones, but didn't know how to do so. We were touched by their desire to pass on their legacy and message to those they cared about. This inspired us to create a secure and confidential solution that allows everyone to leave their will.</Typography>

                <Typography variant={"body1"} sx={{marginBottom: { xs: '11px', md: '25px' }}}>We believe that your last words are a precious gift that you can leave for your loved ones. That's why we've dedicated ourselves to developing a secure and user-friendly app to help you preserve and pass on your legacy. Our mission is to make this process as simple, safe and meaningful as possible for you and your loved ones.</Typography>

            </Box>
        </Box>
    );
}

export default About;
