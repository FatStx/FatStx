import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";

export default function Disclaimer() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
        <Container >
            <h1>Disclaimers</h1>
            <h2>Affiliation</h2>
            <ul>
                <li>This page is not officially affiliated with CityCoins or Stacks</li>
            </ul>
            <h2>Best efforts</h2>
            <ul>
            <li>This site represents the best efforts of the developers to convert the raw data from the Stacks blockchain and API into a user-friendly transaction report.
                With a constantly changing and nearly limitless number of transaction variations, mistakes are possible and even probable. The developers will not be held responsible
                for any issues, financial or otherwise, arising from the use of this site or errors within it.</li>
            </ul>
            <h2>USA Taxation</h2>
            <ul><li>The transaction report and exported CSVs may be useful in filling out US Income tax returns. 
                Notes about the possible treatment of transactions are intended solely for discussion and do not constitute tax or legal advice.</li></ul>
            <h2>About</h2>

            <p> Built by @eparrot and @foragerr</p>
        </Container>
    )
}