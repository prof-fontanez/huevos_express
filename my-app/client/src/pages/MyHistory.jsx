import React from 'react';
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

const MyHistory = () => {
    const theme = useTheme();

    const getDirectDropboxUrl = (url) => {
        if (!url.includes("dropbox.com")) return url; // don't touch non-Dropbox URLs
        return url
            .replace("www.dropbox.com/scl/fi/", "dl.dropboxusercontent.com/s/");
    };

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
            <Typography variant="h4">Mi Historia</Typography>
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
                                sx={{
                                    width: { xs: '100%', md: '50%' },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={getDirectDropboxUrl(section.imageUrl)}
                                    alt={`Section ${section.id}`}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: 400,
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        borderRadius: 2,
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: { xs: '100%', md: '50%' },
                                    p: 3,
                                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="body1">{section.text}</Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default MyHistory;