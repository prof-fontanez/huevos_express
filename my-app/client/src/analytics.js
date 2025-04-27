import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-94RQYQXZ88"); // Make sure this ID matches your GA4 property
};

export const logPageView = (path) => {
  ReactGA.event('page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title
  });
};
