import * as React from 'react';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

const itemData = [
    {
        img: './hero/20250419_113516.jpg',
        name: 'Héctor Fontánez',
        description: 'Desarollador de la página',
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
        name: '',
        description: 'El Spot del Colombiano',
    },
    {
        img: './hero/IMG-20250419-WA0037.jpg',
        name: '',
        description: '',
    },
    {
        img: './hero/IMG-20250423-WA0016.jpg',
        name: 'Nicauris Cristian',
        description: '',
    },
    {
        img: './hero/IMG-20250423-WA0021.jpg',
        name: '',
        description: '',
    },
    {
        img: './hero/IMG-20250423-WA0022.jpg',
        name: 'Ismael Colón',
        description: 'Perito Electricista',
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
        </>
    );
};

export default HeroesGallery;
