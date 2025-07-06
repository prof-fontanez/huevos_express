import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.locale('es');

const getGoogleCalendarUrl = ({ title, startDateTime, endDateTime, description, location }) => {
    const start = dayjs(startDateTime).utc().format('YYYYMMDDTHHmmss') + 'Z';
    const end = dayjs(endDateTime).utc().format('YYYYMMDDTHHmmss') + 'Z';

    return (
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${start}/${end}` +
        `&details=${encodeURIComponent(description)}` +
        `&location=${encodeURIComponent(location)}`
    );
};

const ActivityItem = ({ date, time, description }) => {
    // Parse date + time with consistent format and locale
    const startDateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD h:mm A', 'es');
    const endDateTime = startDateTime.add(1, 'hour');

    const calendarUrl = getGoogleCalendarUrl({
        title: description,
        startDateTime,
        endDateTime,
        description: `Actividad programada: ${description}`,
        location: 'Huevos Express PR',
    });

    const formattedDate = startDateTime.format('DD MMM').toUpperCase();

    return (
        <Box
            sx={{
                width: 'calc(100vw - 64px)',
                maxWidth: '1200px',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 2,
                overflow: 'hidden',
                py: 2.5,
                backgroundColor: 'background.paper', // inherit page bg
            }}
        >
            {/* Fried Egg */}
            <Box
                sx={{
                    width: 130,
                    height: 130,
                    position: 'relative',
                    mx: 2,
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        bgcolor: '#ffffff',
                        borderRadius: '50%',
                        boxShadow: 'inset -4px -4px 6px rgba(0,0,0,0.05)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `1px solid ${theme.palette.divider}`,
                    })}
                >
                    <Box
                        sx={{
                            width: 75,
                            height: 75,
                            bgcolor: '#fbc02d',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            px: 1,
                            gap: 0.5,
                        }}
                    >
                        <Typography variant="caption" fontWeight={600} lineHeight={1}>
                            {formattedDate}
                        </Typography>
                        <Typography variant="caption" fontSize={11} lineHeight={1}>
                            {time}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Description + Button */}
            <Box sx={{ flex: 1, pr: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                    {description}
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Agregar a Google Calendar
                </Button>
            </Box>
        </Box>
    );
};

export default ActivityItem;
