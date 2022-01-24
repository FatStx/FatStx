import ReactGA from "react-ga4";
import * as React from 'react';
import { Container } from "@mui/material";

export default function Disclaimer() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
        <Container >
            <h2>Disclaimers</h2>
            <h3>Affiliation</h3>
            <ul>
                <li>This page is not officially affiliated with CityCoins or Stacks</li>
            </ul>
            <h3>Best efforts</h3>
            <ul>
            <li>This site represents the best efforts of the developers to convert the raw data from the Stacks blockchain and API into a user-friendly transaction report.
                With a constantly changing and nearly limitless number of transaction variations, mistakes are possible and even probable. The developers will not be held responsible
                for any issues, financial or otherwise, arising from the use of this site or errors within it.</li>
            </ul>
            <h3>USA Taxation</h3>
            <ul><li>The transaction report and exported CSVs may be useful in filling out US Income tax returns. 
                Notes about the possible treatment of transactions are intended solely for discussion and do not constitute tax or legal advice.</li></ul>
            <h2>Problems/Questions</h2>
            <p>You can often find @eparrot and @foragerr in the Syvita Guild discord, or you can submit issues on gihub here: <a href="https://github.com/FatStx/FatStx.github.io/issues" target="_new">https://github.com/FatStx/FatStx.github.io/issues</a></p>
            <h2>About</h2>
            <p> Built by @eparrot and @foragerr</p>
            <h2>License</h2>
            <h3>FatStx</h3>
            <h3>Copyright 2022 under an MIT license</h3>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
        </Container>
    )
}