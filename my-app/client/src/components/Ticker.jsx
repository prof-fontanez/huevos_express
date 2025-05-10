import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const Ticker = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch announcements from the API
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('/api/announcements');
            const data = await response.json();
            setAnnouncements(data.announcements || []);
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
            setAnnouncements([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchAnnouncements();

        // Set up polling (e.g., fetch every 10 seconds)
        const intervalId = setInterval(fetchAnnouncements, 10000); // 10 seconds

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={2}>
                <CircularProgress size={20} />
            </Box>
        );
    }

    if (announcements.length === 0) return null;

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                py: 1,
                px: 2,
            }}
        >
            <Typography
                component="div"
                sx={{
                    display: 'inline-block',
                    animation: 'scroll-left 20s linear infinite',
                    '@keyframes scroll-left': {
                        '0%': { transform: 'translateX(100vw)' },
                        '100%': { transform: 'translateX(-100%)' },
                    },
                }}
            >
                {announcements.map((msg, index) => (
                    <span key={index} style={{ marginRight: '2rem' }}>
                        📢 {msg}
                    </span>
                ))}
            </Typography>
        </Box>
    );
};

export default Ticker;
