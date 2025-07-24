import { Box, Typography } from "@mui/material";

const ThankYou = () => {

    return (
        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                p: 2,
                height: '60vh', // Full viewport height
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" textAlign={"center"}>Muchas gracias por su encargo.</Typography>
            <Typography variant="h4" textAlign={"center"}>Procesaremos su orden dependiendo de la prioridad seleccionada.</Typography>
        </Box>
    );

}

export default ThankYou