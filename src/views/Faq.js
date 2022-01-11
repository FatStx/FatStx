import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";

export default function Faq() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
        <Container >
            <h1>StacksBoard FAQ</h1>
            <ul>
                <li>The site is taking forever to load, what do I do?</li>
                Stacks API calls are slow sometimes! If it takes more than 30 seconds, close and try again a minute later. Do not keep spamming the refresh button.
                <li>Currently the page only accepts the raw addresses, not .btc addresses.</li>
                <li>Tell me about the Transaction dates</li>
                    Transaction Dates are in UTC time, which is the standard time that many tax sites require. In the csv file, the dates are specifically in the ISO time format
                <li>How about the Stacking dates and WenBlok dates?</li>
                    Stacking and WenBlok dates are in your local browser time zone. Future dates are estimates and may be off by several days
                <li>How do you calculate the coin prices?</li>
            </ul>

            <h2>About</h2>

            <p> Built by @eparrot and @foragerr</p>
        </Container>
    )
}