import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const sections = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e17b',
        text: 'Después de más de 30 años como servidor público, entrego mi uniforme de paramédico y me retiro el 31 de marzo de 2025.',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1604908177522-402f0b5d1e2c',
        text: 'En esos 30 años serví a muchas personas. Hasta tuve la dicha de asistir un parto en la ambulancia.',
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1574226516831-e1dff420e12e',
        text: 'A par de meses me mi retiro, se me ocurre una idea para seguir sirviendo a mi gente: vender algún tipo de alimento.',
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443',
        text: 'Como el desayuno es la comida más importante del día, decidí por vender huevos frescos del país.',
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484b3',
        text: 'Buscando lugar donde vender, traté bajo el puente de Sabana Seca primero.',
    },
    {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1589927986089-35812388d1d1',
        text: 'Luego traté frente a la pista de Higuillar en Dorado donde me ejercité corriendo por muchos años, pero no se me dió la suerte.',
    },
    {
        id: 7,
        imageUrl: 'https://images.unsplash.com/photo-1590080878065-3b1e169ecdf5',
        text: 'Compré mi primer letrero para el carro.',
    },
    {
        id: 8,
        imageUrl: 'https://images.unsplash.com/photo-1604908554169-8a83113958e2',
        text: 'Hasta traté vendiendo en Facebook.',
    },
    {
        id: 9,
        imageUrl: 'https://images.unsplash.com/photo-1604908037154-2e4968dc6eb4',
        text: 'Luego me moví donde estoy actualmente en la carretera 867 en el Barrio Ingenio de Toa Baja.',
    },
    {
        id: 10,
        imageUrl: 'https://images.unsplash.com/photo-1624378443846-f7f293bb1e16',
        text: 'Y al parecer, aquí me quiere Papito Dios para seguir sirviendo a la comunidad. ¡Aquí los esperamos!',
    },
];

const Home = () => {
    const theme = useTheme();

    return (
        <>
        <Typography variant="h2">Mi Historia</Typography>
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
            {/* Scrollable Content Container */}
            <Box
                sx={{
                    overflowY: 'auto', // Makes the content scrollable
                    flex: 1, // Allows this area to grow and fill the available space
                    paddingBottom: '50px', // To ensure there's no overlap with footer
                }}
            >
                {sections.map((section, index) => {
                    const isEven = index % 2 === 1;

                    return (
                        <Box
                            key={section.id}
                            sx={{
                                display: 'flex',
                                flexDirection: {
                                    xs: 'column',
                                    md: isEven ? 'row-reverse' : 'row',
                                },
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 4,
                                gap: 2,
                            }}
                        >
                            <Box
                                component="img"
                                src={`${section.imageUrl}?auto=format&fit=crop&w=800&q=80`}
                                alt={`Section ${section.id}`}
                                sx={{
                                    width: { xs: '100%', md: '50%' },
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                            />
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '50%' },
                                    p: 3,
                                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                {/* <Typography variant="h6" sx={{ mb: 1 }}>
                                    Section {section.id}
                                </Typography> */}
                                <Typography variant="body1">{section.text}</Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
        </>
    );
};

export default Home;