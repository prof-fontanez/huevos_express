import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box, GlobalStyles } from '@mui/material'; // <--- Import GlobalStyles

const Layout = () => {
    return (
        <>
            {/* Global fix for scrollbar shift */}
            <GlobalStyles styles={{
                html: { overflowY: 'scroll' },
                body: { overflowX: 'hidden' }
            }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh', // full screen height
                    overflowX: 'hidden',
                    bgcolor: 'background.default'
                }}
            >
                <Header />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1, // expands to fill available space
                        px: 2,
                        py: 4,
                        overflowX: 'hidden', // optional double protection
                        bgcolor: 'background.default'
                    }}
                >
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;