import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import Title from '../components/Title';

export default function Faq() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    const faq = [
        {
            "q": "The site is taking forever to load!",
            "a": "Stacks API calls are slow sometimes! If it takes more than 30 seconds, close and try again a minute later. Do not keep spamming the refresh button."
        },
        {
            "q": "I put in a valid wallet address and it doesn't work",
            "a": "Currently the page only accepts the raw addresses, not .btc addresses."
        },
        {
            "q": "Tell me about the Transaction dates",
            "a": "Transaction Dates are in UTC time, which is the standard time that many tax sites require. In the csv file, the dates are specifically in the ISO time format"
        },
        {
            "q": "How about the Stacking dates and WenBlok dates?",
            "a": "Stacking and WenBlok dates are in your local browser time zone. Future dates are estimates and may be off by several days"
        },
    ]

    return(
        <Container sx={{ mt:"4rem" }}>

          <Title>FAQs</Title>

            {faq.map((row) => (
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ 
                        m: "1rem", 
                        fontSize: "1.5rem"
                    }}>
                        {row.q}
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Divider />
                    <Typography sx={{ 
                        mx:"2rem", 
                        mt:"2rem",
                        fontWeight: "light"
                    }}>
                        {row.a}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ 
                        m: "1rem", 
                        fontSize: "1.5rem"
                    }}>
                        How do you calculate the coin prices?
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Divider />
                    <Typography sx={{ 
                        mx:"2rem", 
                        mt:"2rem",
                        fontWeight: "light"
                    }}>
                        The Stacks ecosystem is new enough that aside from the price of STX it can be difficult to determine accurate coin prices.
                        Sourcing of coin prices is likely something which will be changing regularly as more accurate sources become available.
                        As of January 17, 2022 coin prices were determined as follows:

                        <ul>
                            <li><strong>STX: </strong> 2021 prices are the most recent hourly price from Binance historical data. 2022 prices are the daily historical prices from CoinGecko</li>
                            <li><strong>MIA: </strong> All prices are the the daily historical prices from CoinGecko</li>
                            <li><strong>USDA: </strong> 2021 Prices are derived from the STX-USDA swap contract on Arkadiko, converting the USDA price in STX to the USDA price in USDT using the hourly Binance historical STX prices.
                            2022 prices will be derived as each month ends and the Binance prices become available</li>
                            <li><strong>DIKO: </strong> 2021 Prices are derived from the USDA-DIKO swap contract on Arkadiko, converting the DIKO price in USDA to the DIKO price in USDT using the USDA prices mentioned in the previous bullet.
                            2022 prices are the the daily historical prices from CoinGecko</li>
                            <li><strong>xBTC: </strong> Since xBTC prices are driven by BTC prices - xBTC can be unwrapped and exchanged for BTC - currently BTC prices are the most accurate price to use for xBTC due to the low volume for xBTC.
                            This is certainly a matter for debate, but that is the approach this site has taken. 2021 prices are the most recent hourly price from Binance historical data. 2022 prices are the daily historical prices from CoinGecko</li>
                        </ul>
                    </Typography>
                    </AccordionDetails>
                </Accordion>

        </Container>
    )
}