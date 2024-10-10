import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeadTitle from "../components/PageHeadTitle.jsx";

const FAQS = [
    {
        question: "How can I be sure my will will be delivered?",
        answer: [
            "We utilize advanced technology and strict security measures to ensure that your will is delivered to your loved ones. Your trustees (TRUSTEE) will be notified upon your passing and will be responsible for delivering the will to the addressees (ADDRESSEE). We also offer additional safeguards such as data backup and the ability to appoint multiple trustees to ensure reliable delivery.",
            "In addition, we can provide you with details of the delivery process and contact details of your trustees so that you can be confident that your will will will be carried out. Our team are also on hand to assist if there are any difficulties with the delivery of your will. We will do everything we can to ensure your legacy is carefully delivered to your loved ones."
        ],
    },
    {
        question: "What happens if my trustee is unable to contact the addressees?",
        answer: [
            "We recommend appointing more than one trustee (TRUSTEE) in case one of them is unavailable. This will ensure that your will (WILL) is reliably transmitted to the addressees (ADDRESSEE).",
            "We can also provide additional contact details for your addressees to facilitate the delivery process. Should any unforeseen difficulties arise, our team will be happy to help resolve the situation and ensure that your Will is delivered in accordance with your wishes.",
            "We understand that various circumstances may arise after your passing that could make it difficult to pass on your will. Therefore, we take all necessary steps to ensure that your will is carried out despite any unforeseen situations."
        ]
    },
    {
        question: "Can I change or revoke my will?",
        answer: [
            "Yes, you can change or revoke your will at any time, even after it has been published. Simply log into the application, make the necessary changes, and save the updated version. Your trustees (TRUSTEE) will be notified of the up-to-date version of your will (WILL).",
            "We understand that your wishes and circumstances may change over time. Therefore, we give you the opportunity to review and update your Will at any time to ensure that it always reflects your will. Our team will be happy to guide you through the process and answer any questions you may have.",
            "We believe that you should have full control over your inheritance. That is why we have made amending your will as simple and confidential as possible. You can rest assured that your will will be carried out in accordance with your wishes."
        ]
    }
]

function Faq() {
    return (
        <Box>
            <PageHeadTitle title={"FAQ"}/>
            <Box>
                {FAQS.map((item, index) => (<Accordion key={index} elevation={7} defaultExpanded={index === 0}>
                    <AccordionSummary
                        sx={{paddingY: 2}}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"><Typography variant={"h5"}>{item.question}</Typography> </AccordionSummary>
                    <AccordionDetails>
                        {item.answer.map((contentItem, contentItemIndex) => (<Box key={contentItemIndex}>
                            <Typography variant={"body1"}
                                        sx={{marginBottom: {xs: '11px', md: '25px'}}}>{contentItem}</Typography>
                        </Box>))}
                    </AccordionDetails>
                </Accordion>))}
            </Box>
        </Box>
    );
}

export default Faq;
