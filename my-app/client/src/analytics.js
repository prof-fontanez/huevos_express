import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-94RQYQXZ88");
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};