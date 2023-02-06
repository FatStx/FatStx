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
                        <li><strong>STX: </strong>
                        <ul>
                                <li>Jan 1, 2021 to Feb 28, 2021: CoinGecko daily prices</li>
                                <li>Mar 1, 2021 to Jan 31, 2023: Binance Historical prices, Hourly median</li>
                                <li>After Jan 31, 2023: CoinGecko Daily prices  </li>
                            </ul>                 
                        </li>                                   
                        <li><strong>MIA: </strong>
                            <ul>
                                <li>8/26/21 to 11/24/21: CoinGecko daily prices</li>
                                <li>11/25/21 to 2/25/22: OkCoin Hourly prices</li>
                                <li>2/26/22 to 05/14/22: CoinGecko daily prices</li>
                                <li>5/15/22 to 06/30/22: CoinMarketCap daily prices</li>
                                <li>After  June 30, 2022: Median* Hourly Prices from a combination of ALEX MIA-STX Swaps converted to USD via STX Price and OkCoin Hourly. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>
                        <li><strong>NYC: </strong>
                            <ul>
                                <li>Nothing from before 6/10/22. It traded on Stackswap for a while but volume was very low and prices were all over the place. There was reliable trading on OkCoin starting in Feb 2022, but that data does not appear to be available any more.</li>
                                <li>After 06/10/22: Median* Hourly Prices from a combination of ALEX NYC-STX Swaps converted to USD via STX Price and OkCoin Hourly where available. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>
                        <li><strong>ALEX: </strong>
                            <ul>
                                <li>All Prices (starting Jan 28 2022): Median* Hourly Prices from ALEX ALEX-STX Swaps converted to USD via STX Price. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>
                        <li><strong>USDA: </strong> 
                            <ul>
                                <li>Oct 21 2021 to Dec 31 2022: Derived from the STX-USDA swap contract on Arkadiko, converted to USD from the STX price using the hourly Binance historical STX prices. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                                <li>After 12/31/22: Median* Hourly Prices from a combination of ALEX Swaps converted to USD via ALEX Price and Arkadiko swaps converted to USD via STX Price. Hourly where available. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>
                        <li><strong>DIKO: </strong> 2021 Prices are derived from the USDA-DIKO swap contract on Arkadiko, converting the DIKO price in USDA to the DIKO price in USDT using the USDA prices mentioned in the previous bullet.
                        2022 prices through 2/25/22 are the hourly prices from okcoin. Prices after 2/25/22 are the daily historical prices from CoinGecko</li>
                        <li><strong>BAN: </strong>
                            <ul>
                                <li>All Prices (starting Mar 28 2022): Median* Daily Prices from ALEX Swaps converted to USD via ALEX Price. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>
                        <li><strong>SLIME: </strong>
                            <ul>
                                <li>All Prices (starting Apr 18 2022): Median* Daily Prices from ALEX Swaps converted to USD via ALEX Price. When no prints for an hour, median is taken from longer periods in multiples of an hour</li>
                            </ul>
                        </li>                                             
                        <li><strong>xBTC: </strong> Since xBTC prices are driven by BTC prices - xBTC can be unwrapped and exchanged for BTC - currently BTC prices are the most accurate price to use for xBTC due to the low volume for xBTC.
                        This is certainly a matter for debate, but that is the approach this site has taken. Prices are a mix of prices from Binance, OkCoin, and CoinGecko</li>
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
