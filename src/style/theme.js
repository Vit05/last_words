import {createTheme} from '@mui/material/styles';
import {red} from "@mui/material/colors";
import {responsiveFontSizes} from "@mui/material";

let creteNewTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        dark:{
            main: '#000000'
        },
        light:{
            main: '#ffffff'
        },
        primary: {
            main: '#3ea1b3',
        },
        secondary: {
            main: '#316c08',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        h1: {
            fontSize: "3.5rem",
            marginBottom: 0,
            lineHeight: 1.1,
            fontWeight: '500',
            '@media (max-width:768px)': {
                fontSize: '2.5rem',
            },
        },
        h2:{
            fontSize: '3rem',
            marginBottom: 0,
            fontWeight: '500',
            lineHeight: 1.1,
            '@media (max-width:768px)': {
                fontSize: '2.5rem',
            },
        },
        h3:{
            fontSize: '2.7rem',
            marginBottom: 0,
            fontWeight: '500',
            lineHeight: 1.1,
            '@media (max-width:768px)': {
                fontSize: '2.2rem',
            },
        },
        h4:{
            fontSize: '2.3rem',
            marginBottom: 0,
            fontWeight: '500',
            lineHeight: 1.1,
            '@media (max-width:768px)': {
                fontSize: '1.8rem',
            },
        },
        h5:{
            fontSize: '1.9rem',
            marginBottom: 0,
            fontWeight: '500',
            lineHeight: 1.1,
            '@media (max-width:768px)': {
                fontSize: '1.4rem',
            }
        },
        h6:{
            fontSize: '1.6rem',
            marginBottom: 0,
            fontWeight: '500',
            lineHeight: 1.1,
            '@media (max-width:768px)': {
                fontSize: '1.1rem'
            }
        },
        body1:{
            fontSize: '1.3rem',
            // marginBottom: "1rem",
            '@media (max-width:768px)': {
                fontSize: '0.8rem'
            }
        }
        // h2: {
        //     fontSize: '2rem',
        //     '@media (max-width:768px)': {
        //         fontSize: '1.25rem',
        //     },
        // },
        // body1:{
        //     fontSize: '18px',
        //     marginBottom: 5,
        // }
        // Add more styles as needed
    },
    // typography: {
    //     text1: {
    //         fontWeight: 400,
    //         fontSize: '18px',
    //         lineHeight: 1.2,
    //         color: red[500],
    //         marginBottom: "200px",
    //         display: "block"
    //
    //     },
    // },

    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: {variant: 'h1'},
                            style: {
                                fontSize: "2rem",
                                marginBottom: 0,
                                lineHeight: 1.1,
                                fontWeight: '500',
                                '@media (max-width:768px)': {
                                    fontSize: '2.5rem',
                                },
                            },
                        },
                        {
                            props: {variant: 'h2'},
                            style: {
                                fontSize: '3rem',
                                marginBottom: 0,
                                fontWeight: '500',
                                lineHeight: 1.1
                            },
                        },
                        {
                            props: {variant: 'h3'},
                            style: {
                                fontSize: '2.7rem',
                                marginBottom: 0,
                                fontWeight: '500',
                                lineHeight: 1.1
                            },
                        },
                        {
                            props: {variant: 'h4'},
                            style: {
                                // display: 'block',
                                fontSize: '2.3rem',
                                marginBottom: 0,
                                fontWeight: '500',
                                lineHeight: 1.1,
                                // textAlign: 'left',
                                // width: "100%"
                            },
                        },
                        {
                            props: {variant: 'h5'},
                            style: {
                                // display: 'block',
                                fontSize: '1.9rem',
                                marginBottom: 0,
                                fontWeight: '500',
                                lineHeight: 1.1,
                                // textAlign: 'left',
                                // width: "100%"
                            },
                        },
                        {
                            props: {variant: 'h6'},
                            style: {
                                // display: 'block',
                                fontSize: '1.6rem',
                                marginBottom: 0,
                                fontWeight: '500',
                                lineHeight: 1.1,
                                // textAlign: 'left',
                                // width: "100%"
                            },
                        },
                        {
                            props: {variant: 'body1'},
                            style: {
                                // display: 'block',
                                // fontSize: '1.2rem',
                                // marginBottom: "70px",
                            },
                        },
                    ],
                },
            },
        },
    },
});

export const theme = responsiveFontSizes(creteNewTheme);

