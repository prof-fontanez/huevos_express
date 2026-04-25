import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const sections = [
    {
        id: 1,
        imageUrl: './history/IMG-20250414-WA0061.jpg',
        text: 'Después de más de 30 años como servidor público, entrego mi uniforme de paramédico y me retiro el 31 de marzo de 2025.',
    },
    {
        id: 2,
        imageUrl: './history/IMG-20250414-WA0063.jpg',
        text: 'En esos 30 años serví a muchas personas. Hasta tuve la dicha de asistir un parto en la ambulancia.',
    },
    {
        id: 3,
        imageUrl: './history/IMG-20250413-WA0050.jpg',
        text: 'A par de meses de mi retiro, se me ocurre una idea para seguir sirviendo a mi gente: vender algún tipo de alimento.',
    },
    {
        id: 4,
        imageUrl: './history/IMG-20250413-WA0055.jpg',
        text: 'Como el desayuno es la comida más importante del día, decidí por vender huevos frescos del país.',
    },
    {
        id: 5,
        imageUrl: './history/IMG-20250414-WA0066.jpg',
        text: 'Buscando lugar donde vender, traté bajo el puente de Sabana Seca primero.',
    },
    {
        id: 6,
        imageUrl: './history/IMG-20250414-WA0073.jpg',
        text: 'Luego traté frente a la pista de Higuillar en Dorado donde me ejercité corriendo por muchos años, pero no se me dió la suerte.',
    },
    {
        id: 7,
        imageUrl: './history/IMG-20250414-WA0069.jpg',
        text: 'Compré mi primer letrero para el carro.',
    },
    {
        id: 8,
        imageUrl: './history/IMG-20250414-WA0074.jpg',
        text: 'Hasta traté vendiendo en Facebook.',
    },
    {
        id: 9,
        imageUrl: './history/IMG-20250414-WA0065.jpg',
        text: 'Luego me moví donde estoy actualmente en la carretera 867 en el Barrio Ingenio de Toa Baja.',
    },
    {
        id: 10,
        imageUrl: './history/IMG-20250414-WA0081.jpg',
        text: 'Y al parecer, aquí me quiere Papito Dios para seguir sirviendo a la comunidad. ¡Aquí los esperamos!',
    },
];

const SLIDE_DURATION = 5000;
const FADE_DURATION = 800;

const HistoryGallery = () => {
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
                setCurrentIndex((prev) => (prev + 1) % sections.length);
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
    
    const section = sections[currentIndex];

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
            <Typography variant="h4" sx={{ mb: 4 }}>Mi Historia</Typography>

            {/* Slide counter */}
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {currentIndex + 1} / {sections.length}
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
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={section.imageUrl}
                        alt={`Slide ${section.id}`}
                        loading="lazy"
                        sx={{
                            width: '100%',
                            maxHeight: 400,
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: 2,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            p: 2,
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: '#ffffff', textAlign: 'center' }}
                        >
                            {section.text}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HistoryGallery;