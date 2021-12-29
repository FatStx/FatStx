import ReactGA from "react-ga4";

export default function WenBlok() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return ( <h1> WenBlok</h1> )
}