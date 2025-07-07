import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import ActivityItem from '../components/ActivityItem'; // Adjust path if needed

dayjs.extend(utc);
dayjs.locale('es');

const Activities = () => {
    const now = dayjs();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/events?ts=${Date.now()}`);
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Filter out past events and parse dateTime
    const upcomingActivities = events
        .map(activity => ({
            ...activity,
            dateTime: dayjs(`${activity.date} ${activity.time}`, 'YYYY-MM-DD h:mm A', 'es'),
        }))
        .filter(activity => activity.dateTime.isAfter(now));

    // Group by year
    const groupedByYear = upcomingActivities.reduce((acc, activity) => {
        const year = activity.dateTime.year();
        acc[year] = acc[year] || [];
        acc[year].push(activity);
        return acc;
    }, {});

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
            {Object.keys(groupedByYear).length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary">
                    No hay actividades programadas en este momento.
                </Typography>
            ) : (
                Object.entries(groupedByYear).map(([year, yearActivities]) => (
                    <Box key={year} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, px: 1 }}>
                            {year}
                        </Typography>
                        {yearActivities.map((activity, idx) => (
                            <ActivityItem
                                key={`${year}-${idx}`}
                                date={activity.date}
                                time={activity.time}
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
