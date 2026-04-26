import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../config';
import { PR_TIMEZONE, parseEventDateTime } from '../utils/eventUtils';
import YearSection from '../components/YearSection';

const Activities = () => {
    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/events?ts=${Date.now()}`);
            const data = Array.isArray(response.data.events) ? response.data.events : [];

            const now = dayjs().tz(PR_TIMEZONE);
            const upcoming = data
                .map((event) => {
                    const parsedDateTime = parseEventDateTime(event.date, event.time);
                    if (!parsedDateTime) return null;
                    return {
                        ...event,
                        startDateTime: parsedDateTime.startDateTime,
                        endDateTime: parsedDateTime.endDateTime,
                    };
                })
                .filter(event => event && event.startDateTime.isAfter(now))
                .sort((a, b) => a.startDateTime.unix() - b.startDateTime.unix());

            const grouped = upcoming.reduce((acc, event) => {
                const year = event.startDateTime.year();
                const month = event.startDateTime.format('MMMM');
                const monthNum = event.startDateTime.month();

                acc[year] = acc[year] || {};
                acc[year][monthNum] = acc[year][monthNum] || {
                    name: month,
                    events: []
                };
                acc[year][monthNum].events.push(event);
                return acc;
            }, {});

            setGroupedEvents(grouped);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setGroupedEvents({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    const hasEvents = Object.keys(groupedEvents).length > 0;

    if (!hasEvents) {
        return (
            <Box py={4} textAlign="center">
                <Typography variant="h6" color="text.secondary">
                    No hay actividades programadas en este momento.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(78vh - 126px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                px: { xs: 1, sm: 2, md: 4 },
                py: 4,
                gap: 6,
            }}
        >
            {Object.entries(groupedEvents).map(([year, months]) => (
                <YearSection key={year} year={year} months={months} />
            ))}
        </Box>
    );
};

export default Activities;