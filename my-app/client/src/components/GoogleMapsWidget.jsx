import { useEffect } from "react";

const GoogleMapsWidget = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.defer = true;
        script.setAttribute("data-use-service-core", "");
        document.body.appendChild(script);

    }, []);

    return (
        <div className="elfsight-app-8084fec8-a685-437b-8ff1-fecc6463cb18" data-elfsight-app-lazy />
    );
}

export default GoogleMapsWidget;