import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";

export default function Faq() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
        <Container >
            <h1>StacksBoard FAQ</h1>
                <h2>The site is taking forever to load, what do I do?</h2>
                Stacks API calls are slow sometimes! If it takes more than 30 seconds, close and try again a minute later. Do not keep spamming the refresh button.
                <h2>I put in a valid wallet address and it doesn't work</h2>
                Currently the page only accepts the raw addresses, not .btc addresses.
                <h2>Tell me about the Transaction dates</h2>
                Transaction Dates are in UTC time, which is the standard time that many tax sites require. In the csv file, the dates are specifically in the ISO time format
                <h2>How about the Stacking dates and WenBlok dates?</h2>
                Stacking and WenBlok dates are in your local browser time zone. Future dates are estimates and may be off by several days
                <h2>How do you calculate the coin prices?</h2>
                The Stacks ecosystem is new enough that aside from the price of STX it can be difficult to determine accurate coin prices. Sourecing of coin prices is likely something
                which will be changing regularly as more accurate sources become available. As of January 17, 2022 coin prices were determined as follows
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

        </Container>
    )
}