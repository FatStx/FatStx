import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";

export default function Disclaimer() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
        <Container>
            <h1>Disclaimers</h1>

            <ul>
                <li>Exported CSVs could purportedly be used for tax filing, but not intended to be tax advice</li>
                <li>This page is not officially affiliated with CityCoins or Stacks</li>
                <li>Stacks API calls are slow sometimes! If it takes more than 30 seconds, close and try again a minute later. Do not keep spamming the refresh button.</li>
                <li>Currently the page only accepts the raw addresses, not .btc addresses.</li>
                <li>Dates are in the browser time zone. Future dates are estimates and may be off by several days</li>
            </ul>
        </Container>
    )
}