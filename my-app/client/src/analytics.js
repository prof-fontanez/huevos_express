import ReactGA from "react-ga4";

export const initGA = () => {
  console.log("Initializing GA with ID G-94RQYQXZ88");

  // Set default consent
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.dataLayer = window.dataLayer || [];
  window.gtag('consent', 'default', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });

  ReactGA.initialize("G-94RQYQXZ88");
  debug_mode: true,
};

export const logPageView = (path) => {
  console.log("Page view logged: ", path);
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: document.title
  });
};
