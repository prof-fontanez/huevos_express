import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function BusinessHours() {
  const [businessHours, setBusinessHours] = useState([]);
  const [error, setError] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  console.log('API_BASE_URL:', API_BASE_URL);

  useEffect(() => {
    fetch(`${API_BASE_URL}/business`)
      .then((response) => response.json())
      .then((data) => {
        if (data.businessHours) {
          setBusinessHours(data.businessHours);
        } else {
          setError('Business hours not available');
        }
      })
      .catch((error) => {
        console.error('Error fetching business hours:', error);
        setError('Failed to fetch business hours');
      });
  }, [API_BASE_URL]);

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