import { Box, Link, Stack, Typography } from "@mui/material";
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useBusiness } from '../context/BusinessContext';

const BusinessAddress = () => {

    const { businessName, businessAddress, loading, error } = useBusiness();

    return (
        <Box sx={{ mb: 4 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
            >
                <Stack alignItems="center">
                    <Typography variant="body2" fontWeight={'bold'}>{businessName}</Typography>
                    {businessAddress && (() => {
                        const parts = businessAddress.split(', ');
                        if (parts.length < 4) return <Typography variant="body2">{businessAddress}</Typography>;

                        const townAndZip = parts[2]; // "Toa Baja 00949"
                        const lastPart = parts[3];   // "Puerto Rico"

                        // Use regex or split intelligently
                        const zipMatch = townAndZip.match(/(.+)\s(\d{5})/);
                        const town = zipMatch?.[1] || '';
                        const zip = zipMatch?.[2] || '';

                        return (
                            <>
                                <Typography variant="body2">
                                    {parts[0]}, {parts[1]}
                                </Typography>
                                <Typography variant="body2">
                                    {town}, {lastPart} {zip}
                                </Typography>
                            </>
                        );
                    })()}
                    <Stack
                        direction={{ xs: 'row' }}
                        spacing={{ xs: 1, sm: 3 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <PhoneOutlinedIcon fontSize={'small'} />
                        <Link href="tel:787-922-1754" variant="body2" color={"#FFF8DC"}>
                            <Typography variant="body2" >787-922-1754</Typography>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default BusinessAddress;
