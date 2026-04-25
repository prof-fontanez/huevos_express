import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const itemData = [
    {
        img: './hero/IMG-20250421-WA0010.jpg',
        name: 'Aida, Javier, y Joel',
        description: 'Esposa y cuñados siempre ayudando en todo.',
    },
    {
        img: './hero/20250419_123150.jpg',
        name: 'Brent',
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
        name: 'Solmary Rodríguez',
        description: 'Tribunal de Bayamón',
    },
];

const SLIDE_DURATION = 3000;
const FADE_DURATION = 800;

const HeroesGallery = () => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [hovered, setHovered] = useState(false);

    const intervalRef = React.useRef(null);
    const remainingRef = React.useRef(SLIDE_DURATION);
    const lastTickRef = React.useRef(null);

    useEffect(() => {
        if (hovered) {
            // Pause — save remaining time
            clearInterval(intervalRef.current);
            if (lastTickRef.current) {
                remainingRef.current -= Date.now() - lastTickRef.current;
            }
            return;
        }

        // Resume — start with remaining time then use full duration
        const startSlide = () => {
            setVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % itemData.length);
                setVisible(true);
            }, FADE_DURATION);
        };

        lastTickRef.current = Date.now();
        const timeout = setTimeout(() => {
            startSlide();
            lastTickRef.current = Date.now();
            remainingRef.current = SLIDE_DURATION;
            intervalRef.current = setInterval(() => {
                startSlide();
                lastTickRef.current = Date.now();
            }, SLIDE_DURATION);
        }, remainingRef.current);

        return () => {
            clearTimeout(timeout);
            clearInterval(intervalRef.current);
        };
    }, [hovered]);

    const item = itemData[currentIndex];

    return (
        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                paddingLeft: 2,
                paddingRight: 2,
                paddingBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>Mis Héroes</Typography>
            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Que sirva esta página como tributo a aquellos que me dieron la mano y
                siguen ayudándome a realizar ese sueño. Con ustedes, mis héroes.
            </Typography>

            {/* Slide counter */}
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {currentIndex + 1} / {itemData.length}
            </Typography>

            {/* Slide container */}
            <Box
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onTouchStart={() => setHovered(true)}
                onTouchEnd={() => setHovered(false)}

                sx={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {/* Image + overlay container */}
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '100%', md: '60%' },
                        height: { xs: 300, sm: 400, md: 500 },
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            p: { xs: 1.5, sm: 2, md: 3 },
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ffffff',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#eeeeee',
                                textAlign: 'center',
                                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                            }}
                        >
                            {item.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroesGallery;