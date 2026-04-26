import { Box, Typography } from '@mui/material';
import MonthSection from './MonthSection';

const YearSection = ({ year, months }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, px: 1 }}>
                {year}
            </Typography>
            {Object.entries(months)
                .sort(([monthA], [monthB]) => parseInt(monthA) - parseInt(monthB))
                .map(([monthNum, monthData]) => (
                    <MonthSection key={monthNum} monthNum={monthNum} monthData={monthData} />
                ))}
        </Box>
    );
};

export default YearSection;