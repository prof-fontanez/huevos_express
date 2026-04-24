import { Box, Typography } from '@mui/material';
import { useBusiness } from '../context/BusinessContext';

function BusinessHours() {
  const { businessHours, loading, error } = useBusiness();

  if (loading) return null;

  return (
    <div>
      <Typography variant="h6">Horario</Typography>

      {error && <Typography color="error">{error}</Typography>}

      {businessHours.length > 0 ? (
        businessHours.map((item, index) => (
          <div key={index}>
            <Box key={index} display="flex" width="100%" justifyContent="space-between">
              <Typography variant="body2">{item.days}:</Typography>
              <Typography variant="body2" style={{ textAlign: 'right' }}>{item.hours}</Typography>
            </Box>
          </div>
        ))
      ) : (
        !error && <Typography variant="body2">No business hours available.</Typography>
      )}

      <Typography variant="body2">Cerramos días feriados</Typography>
    </div>
  );
}

export default BusinessHours;
