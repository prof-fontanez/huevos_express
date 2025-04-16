// components/UserRating.jsx
import React from 'react';
import { Avatar, Box, Grid, Rating, TextField, Typography } from '@mui/material';

const UserRating = ({ user, value, comment, readOnly = false }) => {
    return (
        <Box border={1} borderRadius={2} p={2} width={300}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Avatar src={user.avatar} alt={user.name} />
                <Typography variant="subtitle1">{user.name}</Typography>
            </Grid>

            <Box mt={2}>
                <Rating value={value} readOnly={readOnly} />
            </Box>

            <Box mt={2}>
                <TextField
                    multiline
                    fullWidth
                    minRows={3}
                    value={comment}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};

export default UserRating;
