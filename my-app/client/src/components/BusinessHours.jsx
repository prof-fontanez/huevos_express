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
            <Box key={index} display="flex" width="100%" justifyContent="space-between">
              <Typography variant="body2">{item.days}:</Typography>
              <Typography variant="body2" style={{ textAlign: 'right' }}>{item.hours}</Typography>
            </Box>
          </div>
        ))}

      <Typography variant="body2">Cerramos días feriados</Typography>
    </div>
  );
}

export default BusinessHours;
