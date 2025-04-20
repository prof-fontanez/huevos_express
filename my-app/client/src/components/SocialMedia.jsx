import { SocialIcon } from 'react-social-icons';
import { Typography, Stack, Box } from '@mui/material';
import FooterLinks from './FooterLinks';

const socialMediaUrls = [
    { url: 'https://twitter.com/yourbusiness', label: 'Twitter de la empresa' },
    { url: 'https://facebook.com/yourbusiness', label: 'Facebook de la empresa' },
];

const friendsSocialMediaUrls = [
    { url: 'https://www.instagram.com/el_spotdelcolombiano?igsh=MTV5NXNoazg5MzNvNQ==', label: 'Instragram del Spot del Colombiano' },
    { url: 'https://facebook.com/profile.php?id=100042098476419', label: 'Facebook del Spot del Colombiano' },
];

const renderSocialIcons = (list) =>
    list.map((item, index) => (
        <SocialIcon
            key={index}
            url={item.url}
            title={item.label}
            bgColor="#A0522D"
            fgColor="#FFF8DC"
            style={{ height: 40, width: 40 }}
        />
    ));

const SocialMedia = () => {
    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row'}}
                spacing={{ xs: 3, lg: 8 }}
                alignItems="center"
                justifyContent="center"
            >
                <Stack spacing={1} alignItems="center">
                    <Typography variant="body2">Síguenos en las redes</Typography>
                    <FooterLinks items={renderSocialIcons(socialMediaUrls)} />
                </Stack>

                <Stack spacing={1} alignItems="center">
                    <Typography variant="body2">Y a mis amigos "El Spot del Colombiano"</Typography>
                    <FooterLinks items={renderSocialIcons(friendsSocialMediaUrls)} />
                </Stack>
            </Stack>

            <Typography
                variant="body2"
                sx={{ marginTop: 2, textAlign: 'center' }}
            >
                ¿Problemas? Contacta nuestro diseñador web:{' '}
                <a
                    href="mailto:hector.fontanez@sbcglobal.net"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                    hector.fontanez@sbcglobal.net
                </a>
            </Typography>
        </Box>
    );
};

export default SocialMedia;