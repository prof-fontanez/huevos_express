import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const sections = [
    {
        id: 1,
        imageUrl: 'https://www.dropbox.com/scl/fi/5bbtb7srptrtawc99ead5/IMG-20250414-WA0061.jpg?rlkey=pnv6hynrjglug2d0xmtnixa4x&st=futi558h&dl=0',
        text: 'Después de más de 30 años como servidor público, entrego mi uniforme de paramédico y me retiro el 31 de marzo de 2025.',
    },
    {
        id: 2,
        imageUrl: 'https://www.dropbox.com/scl/fi/mqra4mz79vzcptiexucja/IMG-20250414-WA0063.jpg?rlkey=e9l9w9z7swy88916wzyy3jfp6&st=5s2yy42k&dl=0',
        text: 'En esos 30 años serví a muchas personas. Hasta tuve la dicha de asistir un parto en la ambulancia.',
    },
    {
        id: 3,
        imageUrl: 'https://www.dropbox.com/scl/fi/s5iap4kdhe33z8efi826p/IMG-20250413-WA0050.jpg?rlkey=c6tjdlenwruu62a8xtv0x4dsn&st=sqazrxfe&dl=0',
        text: 'A par de meses me mi retiro, se me ocurre una idea para seguir sirviendo a mi gente: vender algún tipo de alimento.',
    },
    {
        id: 4,
        imageUrl: 'https://www.dropbox.com/scl/fi/vg87oup40hurk13hhkyaa/IMG-20250413-WA0055.jpg?rlkey=aza0iqtwsjm00w2sdn5mum7xb&st=9wwq68px&dl=0',
        text: 'Como el desayuno es la comida más importante del día, decidí por vender huevos frescos del país.',
    },
    {
        id: 5,
        imageUrl: 'https://www.dropbox.com/scl/fi/jiamvgw0phwxmbqs32srt/IMG-20250414-WA0066.jpg?rlkey=0j1h6wdwid02u8oinygylo0nl&st=yyk135zb&dl=0',
        text: 'Buscando lugar donde vender, traté bajo el puente de Sabana Seca primero.',
    },
    {
        id: 6,
        imageUrl: 'https://www.dropbox.com/scl/fi/8lum33dghqyr69settunu/IMG-20250414-WA0073.jpg?rlkey=jgnrmbkzp6tk03tgqmhv70wjj&st=84qqwh3u&dl=0',
        text: 'Luego traté frente a la pista de Higuillar en Dorado donde me ejercité corriendo por muchos años, pero no se me dió la suerte.',
    },
    {
        id: 7,
        imageUrl: 'https://www.dropbox.com/scl/fi/u6awt3memzhiuxq2zweva/IMG-20250414-WA0069.jpg?rlkey=ap6vsu3qbhswzarajjaxx4iz9&st=rat89wr6&dl=0',
        text: 'Compré mi primer letrero para el carro.',
    },
    {
        id: 8,
        imageUrl: 'https://www.dropbox.com/scl/fi/rxa6z0txba6hld1ez5jmn/IMG-20250414-WA0074.jpg?rlkey=erkw8zuua306bqhj596qpggju&st=sy4foiz2&dl=0',
        text: 'Hasta traté vendiendo en Facebook.',
    },
    {
        id: 9,
        imageUrl: 'https://www.dropbox.com/scl/fi/89cf1hfqrzjk6shbxavet/IMG-20250414-WA0065.jpg?rlkey=6zaavzferi7xlmvmdqfbwy1ov&st=ua06suy1&dl=0',
        text: 'Luego me moví donde estoy actualmente en la carretera 867 en el Barrio Ingenio de Toa Baja.',
    },
    {
        id: 10,
        imageUrl: 'https://www.dropbox.com/scl/fi/3iypm65tgejh102du5741/IMG-20250414-WA0081.jpg?rlkey=zgdyr0hw1bxcvtmns9c6ssxfw&st=tpxbcf1r&dl=0',
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
        </>
    );
};

export default MyHistory;