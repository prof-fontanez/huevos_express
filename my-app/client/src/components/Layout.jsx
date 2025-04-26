import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';

const Layout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // full screen height
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1, // expands to fill available space
                    px: 2,
                    py: 4,
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
