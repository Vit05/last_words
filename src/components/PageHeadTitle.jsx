import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const PageHeadTitle = ({title, navigateTo = -1}) => {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{paddingTop: 2}}>
                <Button variant="text"
                        color={"dark"}
                        onClick={() => navigate(`/last_words${navigateTo}`)}
                        startIcon={<ArrowBackIcon fontSize={"large"}/>}>
                    BACK</Button>
            </Box>

            <Box sx={{paddingTop: 2, paddingBottom:2, display: "flex", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <Typography variant="h1" component="h1">
                    {title}
                </Typography>
            </Box>
        </>
    );
}

export default PageHeadTitle;