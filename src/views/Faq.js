import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';


import Title from '../components/Title';

export default function Faq() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    const faq = [
        {
            "id": "faqaccordion1",
            "q": "The site is taking forever to load!",
            "a": "Stacks API calls are slow sometimes! If it takes more than 30 seconds, close and try again a minute later. Do not keep spamming the refresh button. If you have a wallet with over 1000 Transactions, you can also expect it to take longer to load."
        },
        {
            "id": "faqaccordion2",
            "q": "I put in a valid wallet address and it doesn't work",
            "a": "Currently the page only accepts the raw addresses, not .btc addresses."
        },
        {
            "id": "faqaccordion3",
            "q": "Tell me all about the Transaction dates",
            "a": "Transaction Dates are in UTC time, which is the standard time that many tax sites require. In the csv file, the dates are specifically in the ISO time format"
        },
        {
            "id": "faqaccordion4",
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
                    aria-controls={row.id}
                    id={row.id}
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
                        m:"2rem",
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
                    What do I do if I have a question or problem with the site?
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Divider />
                <Typography sx={{ 
                    m:"2rem",
                    fontWeight: "light"
                }}>
                    Please raise an issue on <Link href="https://github.com/FatStx/FatStx.github.io/issues">GitHub</Link>.
                    Also, you can often find &nbsp;
                    <Link href="https://discord.com/users/377856887787356160">@eparrot</Link> and &nbsp;
                    <Link href="https://discord.com/users/229090169238585345">@foragerr</Link> in the &nbsp;
                    <Link href="https://discord.gg/syvita">Syvita Guild discord</Link>
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
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
                    m:"2rem",
                    fontWeight: "light"
                }}
                component={'div'}>
                    The Stacks ecosystem is new enough that aside from the price of STX it can be difficult to determine accurate coin prices.
                    Sourcing of coin prices is likely something which will be changing regularly as more accurate sources become available.
                    As of February 26, 2022 coin prices were determined as follows:

                    <ul>
                        <li><strong>STX: </strong> There are no prices before 1/1/21. Prices after that and before 11/25/21 are the daily prices from CoinGecko. Prices from 11/25/21 through 05/13/22 are the hourly prices from okcoin. Prices from 5/13/22 through 10/26/22 are from hourly Binance historical prices. Prices after 12/24/22 are the daily prices from CoinGecko</li>
                        <li><strong>MIA: </strong>From 8/26/21 to 11/24/21, prices are the the daily prices from CoinGecko. Prices from 11/25/21 through 2/25/22 are the hourly prices from okcoin. Prices after 2/25/22 are the daily prices from CoinGecko</li>
                        <li><strong>USDA: </strong> 2021 Prices are derived from the STX-USDA swap contract on Arkadiko, converting the USDA price in STX to the USDA price in USDT using the hourly Binance historical STX prices.
                        2022 prices will be derived as STX-USDA swap contract info becomes available and each month ends and the Binance prices become available</li>
                        <li><strong>DIKO: </strong> 2021 Prices are derived from the USDA-DIKO swap contract on Arkadiko, converting the DIKO price in USDA to the DIKO price in USDT using the USDA prices mentioned in the previous bullet.
                        2022 prices through 2/25/22 are the hourly prices from okcoin. Prices after 2/25/22 are the daily historical prices from CoinGecko</li>
                        <li><strong>xBTC: </strong> Since xBTC prices are driven by BTC prices - xBTC can be unwrapped and exchanged for BTC - currently BTC prices are the most accurate price to use for xBTC due to the low volume for xBTC.
                        This is certainly a matter for debate, but that is the approach this site has taken. Prices through 12/24/22 are the hourly prices from okcoin, and prices after 12/24/22 are the daily historical prices from CoinGecko</li>
                    </ul>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
                <Typography sx={{ 
                    m: "1rem", 
                    fontSize: "1.5rem"
                }}>
                    Why doesn't the report have cost basis?
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Divider />
                <Typography sx={{ 
                    m:"2rem",
                    fontWeight: "light"
                }}>
Calculating cost basis is a complicated endeavor, even beyond the fact that if you purchased STX for dollars and/or via an exchange the system has no way of knowing that. The main purpose of FatStx is to provide you with information which you can supplement with basis and other info as needed and/or upload to one of the crypto tax software sites which will do a lot more robust calculations than we are able to do.<br /><br />
The information on the screen is intended primarily for visually reviewing your transactions in a user friendly manner, while the CSV export gets you a more complete set of data which you can make minor adjustments to in order to upload to tax sites. Those sites will figure out the cost basis for you if the information exists in what you upload. For situations where the cost basis comes from a transaction on an exchange, you'd upload transactions from that exchange or possibly connect directly from the crypto tax site in question.
                </Typography>
                </AccordionDetails>
            </Accordion>

        </Container>
    )
}
