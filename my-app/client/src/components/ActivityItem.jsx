import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
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

const ActivityItem = ({ dateTime, description }) => {
    // Defensive check - ensure dateTime is valid
    if (!dateTime) {
        console.error('ActivityItem: No dateTime provided');
        return null;
    }

    let startDateTime;

    // Handle if dateTime is already a dayjs object
    if (dayjs.isDayjs(dateTime)) {
        startDateTime = dateTime;
    } else {
        // Try to parse the dateTime
        startDateTime = dayjs(dateTime);
        if (!startDateTime.isValid()) {
            console.error('ActivityItem: Invalid dateTime provided:', dateTime);
            return null;
        }
    }

    const endDateTime = startDateTime.add(1, 'hour');

    const formattedDate = startDateTime.format('DD MMM').toUpperCase();
    const formattedTime = startDateTime.format('h:mm A');

    const calendarUrl = getGoogleCalendarUrl({
        title: description,
        startDateTime,
        endDateTime,
        description: `Actividad programada: ${description}`,
        location: 'Huevos Express PR',
    });

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
                backgroundColor: 'background.paper',
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
                            {formattedTime}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Description + Calendar Button */}
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