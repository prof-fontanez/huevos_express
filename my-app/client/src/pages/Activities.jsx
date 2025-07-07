import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import ActivityItem from '../components/ActivityItem';

dayjs.extend(utc);
dayjs.locale('es');

const Activities = () => {
    const [groupedEvents, setGroupedEvents] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const url = `${process.env.REACT_APP_API_BASE_URL}/api/events?ts=${Date.now()}-${Math.random()}`;

                const response = await axios.get(url, {
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        Pragma: 'no-cache',
                        Expires: '0',
                    },
                    cache: 'no-store',
                });

                const data = Array.isArray(response.data.events) ? response.data.events : [];

                const now = dayjs.utc();

                const upcomingActivities = data
                    .map(event => ({
                        ...event,
                        dateTime: dayjs.utc(`${event.date} ${event.time}`, 'YYYY-MM-DD h:mm A'),
                    }))
                    .filter(event => event.dateTime.isAfter(now))
                    .sort((a, b) => a.dateTime.unix() - b.dateTime.unix());

                const grouped = upcomingActivities.reduce((acc, event) => {
                    const year = event.dateTime.year();
                    acc[year] = acc[year] || [];
                    acc[year].push(event);
                    return acc;
                }, {});

                setGroupedEvents(grouped);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, []);

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
            {Object.keys(groupedEvents).length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary">
                    No hay actividades programadas en este momento.
                </Typography>
            ) : (
                Object.entries(groupedEvents).map(([year, yearActivities]) => (
                    <Box key={year} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, px: 1 }}>
                            {year}
                        </Typography>
                        {yearActivities.map((activity, idx) => (
                            <ActivityItem
                                key={`${year}-${idx}`}
                                dateTime={activity.dateTime}
                                description={activity.description}
                            />
                        ))}
                    </Box>
                ))
            )}
        </Box>
    );
};

export default Activities;
