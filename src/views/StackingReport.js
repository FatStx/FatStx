import ReactGA from "react-ga4";

export default function StackingReport() {

    ReactGA.send("stacking");

    return ( <h1> Stacking Report</h1> )
}