import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from '../config';

const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
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
                if (data.businessName) setBusinessName(data.businessName);
                if (data.businessAddress) setBusinessAddress(data.businessAddress);
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
            businessName,
            businessAddress,
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