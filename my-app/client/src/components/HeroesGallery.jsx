import * as React from 'react';
import {
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

const itemData = [
    {
        img: './hero/IMG-20250421-WA0010.jpg',
        name: 'Aida, Javier, y Joel',
        description: 'Esposa y cuñados siempre ayudando en todo.',
    },
    {
        img: './hero/20250419_123150.jpg',
        name: 'Mr. Brent Rhea',
        description: 'Amigo y cliente de Cataño',
    },
    {
        img: './hero/IMG-20250415-WA0080.jpg',
        name: 'Jannette Crespo',
        description: 'Enfermera Escolar JSA',
    },
    {
        img: './hero/IMG-20250415-WA0081.jpg',
        name: 'José Colón',
        description: 'Paramédico Estatal, Manatí',
    },
    {
        img: './hero/IMG-20250416-WA0018.jpg',
        name: 'Moraima',
        description: 'Mother and Son Food Truck',
    },
    {
        img: './hero/IMG-20250419-WA0018.jpg',
        name: 'Mayté y César',
        description: 'El Spot del Colombiano',
    },
    {
        img: './hero/IMG-20250423-WA0016.jpg',
        name: 'Nicauris Cristian',
        description: 'Amigo comerciante',
    },
    {
        img: './hero/IMG-20250423-WA0021.jpg',
        name: 'Blás Canino',
        description: 'Edificios Públicos, Toa Baja',
    },
    {
        img: './hero/IMG-20250423-WA0022.jpg',
        name: 'Ismael Colón',
        description: 'Perito Electricista',
    },
    {
        img: './hero/IMG-20250425-WA0011.jpg',
        name: 'Sol Mary Rodríguez',
        description: 'Tribunal de Bayamón',
    },

];

const HeroesGallery = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm')); // <600px
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px

    // Dynamically set number of columns
    const cols = isXs ? 2 : isSm ? 3 : 4;

    return (
        <>
            <Typography variant="h2">Mis Héroes</Typography>
            <Typography variant="body2">
                Que sirva esta página como tributo a aquellos que me dieron la mano y
                siguen ayudándome a realizar ese sueño. Con ustedes, mis héroes.
            </Typography>
            <Box
                sx={{
                    overflowY: 'auto', // Makes the content scrollable
                    flex: 1, // Allows this area to grow and fill the available space
                    paddingBottom: '50px', // To ensure there's no overlap with footer
                }}
            >
                <ImageList
                    sx={{
                        width: '100%',
                    }}
                    cols={cols}
                    rowHeight="auto"
                >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                srcSet={`${item.img}`}
                                src={`${item.img}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    objectFit: 'cover'
                                }}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.name}
                                subtitle={item.description}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    );
};

export default HeroesGallery;
