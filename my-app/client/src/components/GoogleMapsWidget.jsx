import { useEffect, useState, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const libraries = ['marker'];

const GoogleMapsWidget = () => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const mapRef = useRef(null);
    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${API_BASE_URL}/business`)
            .then((response) => response.json())
            .then((data) => {
                if (data.coordinates) {
                    setCoordinates(data.coordinates);
                } else {
                    setError('Business address not available');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch business address');
            });
    }, [API_BASE_URL]);

    useEffect(() => {
        if (!mapRef.current || !coordinates || !isLoaded) return;
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current,
            position: coordinates,
        });
        return () => marker.map = null;
    }, [coordinates, isLoaded]);

    if (error) return <div>{error}</div>
    if (loadError) return <div>Error loading map</div>
    if (!isLoaded || !coordinates) return <div>Loading map...</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coordinates}
            zoom={15}
            onLoad={(map) => mapRef.current = map}
            options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }}
        />
    );
}

export default GoogleMapsWidget;
