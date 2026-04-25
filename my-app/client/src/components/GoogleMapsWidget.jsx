import { useEffect, useState } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { useBusiness } from '../context/BusinessContext';

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

    const { coordinates, loading } = useBusiness();
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        if (!mapInstance || !coordinates || !isLoaded) return;
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapInstance,
            position: coordinates,
        });
        return () => marker.map = null;
    }, [coordinates, isLoaded, mapInstance]);

    if (loading) return null;
    if (loadError) return null;
    if (!isLoaded || !coordinates) return null;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coordinates}
            zoom={15}
            onLoad={(map) => setMapInstance(map)}
            options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }}
        />
    );
}

export default GoogleMapsWidget;
