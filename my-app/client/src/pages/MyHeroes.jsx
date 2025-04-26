import { Box } from "@mui/material";
import HeroesGallery from "../components/HeroesGallery"


const MyHeroes = () => {

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
            <HeroesGallery />
        </Box>
    );
}

export default MyHeroes;