import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function BusinessHours() {
  const [businessHours, setBusinessHours] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    fetch(`${API_BASE_URL}/business`)
      .then((response) => response.json())
      .then((data) => setBusinessHours(data))
      .catch((error) => console.error('Error fetching business hours:', error));
  }, []);

  return (
    <div>
      <Typography variant='h6'>Horario</Typography>
        {businessHours.map((item, index) => (
          <div key={index}>
            {item.days}: {item.hours}
          </div>
        ))}
        <Typography variant='body2'>Cerramos días feriados</Typography>
    </div>
  );
}

export default BusinessHours;
