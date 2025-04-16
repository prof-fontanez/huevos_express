import React, { useEffect } from 'react';

const EmbeddedReviews = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="elfsight-app-95127785-224e-484b-810d-8140e7f2292f"
            data-elfsight-app-lazy
        />
    );
};

export default EmbeddedReviews;