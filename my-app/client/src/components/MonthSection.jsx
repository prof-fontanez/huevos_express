import { Box, Typography } from '@mui/material';
import EventCard from './EventCard';

const MonthSection = ({ monthNum, monthData }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    px: 2,
                    color: 'text.secondary'
                }}
            >
                {monthData.name}
            </Typography>
            {monthData.events.map((event, idx) => (
                <EventCard key={idx} event={event} />
            ))}
        </Box>
    );
};

export default MonthSection;