import React from 'react';
import { Stack } from '@mui/material';

const FooterLinks = ({ items }) => {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            {items}
        </Stack>
    );
};

export default FooterLinks;