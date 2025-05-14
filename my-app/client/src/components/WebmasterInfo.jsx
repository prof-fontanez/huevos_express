import { Link, Stack, Typography } from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

const WebmasterInfo = () => {
    return (
        <Typography
            variant="body2"
            sx={{ marginTop: 4, textAlign: 'center' }}
        >
            ¿Problemas? Contacta nuestro diseñador web:{' '}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={0.5}
                component="span"
            >
                <Link
                    href='mailto:hector.fontanez@sbcglobal.net'
                    underline='always'
                    variant='body2'
                    style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
                >
                    <MailOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                    hector.fontanez@sbcglobal.net
                </Link>
            </Stack>
        </Typography>
    );
};

export default WebmasterInfo;
