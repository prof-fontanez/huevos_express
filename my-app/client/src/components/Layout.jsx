import { Box, GlobalStyles } from '@mui/material';
import Header from "./Header";
import Footer from "./Footer";
// import Ticker from "./Ticker";
import { Outlet } from "react-router-dom";
import PageTabs from "./PageTabs";

const Layout = () => {

    return (
        <>
            <GlobalStyles styles={{
                html: { overflowY: 'scroll' },
                body: { overflowX: 'hidden' }
            }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    bgcolor: 'background.default'
                }}
            >
                {/* The ticker display announcements */}
                {/* <Ticker /> */}

                {/* Header gets the hamburger click handler */}
                <Header />

                <Box sx={{
                    px: 2,
                    boxShadow: 1,
                    zIndex: 1,
                }}>
                    <PageTabs />
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 4,
                        overflowX: 'hidden',
                        transition: 'transform 0.3s ease',
                        bgcolor: 'background.default',
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
