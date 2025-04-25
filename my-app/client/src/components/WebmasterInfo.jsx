import { Link, Typography } from "@mui/material";

const WebmasterInfo = () => {

    return (
        <Typography
            variant="body2"
            sx={{ marginTop: 1, textAlign: 'center' }}
        >
            ¿Problemas? Contacta nuestro diseñador web:{' '}
            <Link
                href='mailto:hector.fontanez@sbcglobal.net'
                underline='always'
                variant='body2'
                style={{ color: 'inherit'}}
            >
                hector.fontanez@sbcglobal.net
            </Link>
        </Typography>
    );
}

export default WebmasterInfo;