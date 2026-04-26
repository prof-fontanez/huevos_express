import { Box, Typography, Button } from '@mui/material';
import { PR_TIMEZONE } from '../utils/eventUtils';

const EventCard = ({ event }) => {
    const { startDateTime, endDateTime } = event;

    const formattedDate = startDateTime.format('DD MMM').toUpperCase();
    const formattedTimeStart = startDateTime.format('h:mm A');
    const formattedTimeEnd = endDateTime.format('h:mm A');
    const displayTime = `${formattedTimeStart} - ${formattedTimeEnd}`;

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        event.description
    )}&dates=${startDateTime.format('YYYYMMDDTHHmmss')}/${endDateTime.format('YYYYMMDDTHHmmss')}&details=${encodeURIComponent(
        `Actividad programada: ${event.description}`
    )}&location=${encodeURIComponent(event.description)}&ctz=${PR_TIMEZONE}`;

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
                        <Typography variant="caption" fontSize={9} lineHeight={1} sx={{ mt: 0.5 }}>
                            {displayTime}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Description + Calendar Button */}
            <Box sx={{ flex: 1, pr: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                    {event.description}
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

export default EventCard;