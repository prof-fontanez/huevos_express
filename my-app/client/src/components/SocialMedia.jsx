import { SocialIcon } from 'react-social-icons';
import { Typography, Stack, Box } from '@mui/material';
import FooterLinks from './FooterLinks';
import ReactGA from "react-ga4";

const socialMediaUrls = [
    { url: 'https://www.instagram.com/huevosexpresspr?igsh=MXdhdG9udnh3MGt0ag%3D%3D&utm_source=qr', label: 'Instragram de Huevos Express PR' },
    { url: 'https://facebook.com/profile.php?id=61575267457929', label: 'Facebook de Huevos Express PR' },
];

const friendsSocialMediaUrls = [
    { url: 'https://www.instagram.com/el_spotdelcolombiano?igsh=MTV5NXNoazg5MzNvNQ==', label: 'Instragram del Spot del Colombiano' },
    { url: 'https://facebook.com/profile.php?id=100042098476419', label: 'Facebook del Spot del Colombiano' },
];

const trackLinkClick = (label, url) => {
    ReactGA.event('click_social_link', {
        socialmedia_label: label,
        socialmedia_url: url,
    });
};

const renderSocialIcons = (list) =>
    list.map((item, index) => (
        <SocialIcon
            key={index}
            url={item.url}
            title={item.label}
            bgColor="#A0522D"
            fgColor="#FFF8DC"
            style={{ height: 40, width: 40 }}
            onClick={() => trackLinkClick(item.label, item.url)}
        />
    ));

const SocialMedia = () => {
    return (
        <Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 3, sm: 18, md: 50, lg: 100 }}
                alignItems="center"
                justifyContent="center"
            >
                <Stack spacing={1} alignItems="center">
                    <Typography variant="body2">Síguenos en las redes</Typography>
                    <FooterLinks items={renderSocialIcons(socialMediaUrls)} />
                </Stack>

                <Stack spacing={1} alignItems="center">
                    <Typography variant="body2">Y a mis amigos / clientes de "El Spot del Colombiano"</Typography>
                    <FooterLinks items={renderSocialIcons(friendsSocialMediaUrls)} />
                </Stack>
            </Stack>
        </Box>
    );
};

export default SocialMedia;