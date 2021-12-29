import ReactGA from "react-ga4";

export default function StackingReport() {

    ReactGA.send({ hitType: "pageview", page: "/stacking" });

    return ( <h1> Stacking Report</h1> )
}