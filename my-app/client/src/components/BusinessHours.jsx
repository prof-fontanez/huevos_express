import { Box, Typography } from '@mui/material';
import { useBusiness } from '../context/BusinessContext';

function BusinessHours() {
  const { businessHours, loading } = useBusiness();

  if (loading) return null;

  return (
    <div>
      <Typography variant="h6">Horario</Typography>

      {businessHours.map((item, index) => (
        <div key={index}>
          <Box key={index} display="flex" width="100%" gap={4}>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'left' }}>{item.days}:</Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', whiteSpace: 'nowrap' }}>{item.hours}</Typography>
          </Box>
        </div>
      ))}

      <Typography variant="body2">Cerramos días feriados</Typography>
    </div>
  );
}

export default BusinessHours;
