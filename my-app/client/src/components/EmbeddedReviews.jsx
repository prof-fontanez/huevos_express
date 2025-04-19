import React, { useEffect } from 'react';

const EmbeddedReviews = () => {
    useEffect(() => {
        const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://static.elfsight.com/platform/platform.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // If script already exists, manually trigger widget load
            if (window.ELFSIGHT_PLATFORM) {
                window.ELFSIGHT_PLATFORM.init();
            }
        }
    }, []);

    return (
        <div
            className="elfsight-app-95127785-224e-484b-810d-8140e7f2292f"
            data-elfsight-app-lazy
        />
    );
};

export default EmbeddedReviews;