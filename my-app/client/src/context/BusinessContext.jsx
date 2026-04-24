import { createContext, useContext, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://huevos-express.onrender.com';

const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
    const [businessHours, setBusinessHours] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [totalReviews, setTotalReviews] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/business`)
            .then((response) => response.json())
            .then((data) => {
                if (data.businessHours) setBusinessHours(data.businessHours);
                if (data.coordinates) setCoordinates(data.coordinates);
                if (data.reviews) setReviews(data.reviews);
                if (data.rating) setRating(data.rating);
                if (data.totalReviews) setTotalReviews(data.totalReviews);
            })
            .catch((error) => {
                console.error('Error fetching business data:', error);
                setError('Failed to fetch data from business route');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <BusinessContext.Provider value={{
            businessHours,
            coordinates,
            reviews,
            rating,
            totalReviews,
            error,
            loading
        }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => useContext(BusinessContext);