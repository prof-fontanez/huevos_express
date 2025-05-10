import React from "react";
import { Box, GlobalStyles } from '@mui/material';
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Ticker from "./Ticker";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Layout = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen((prev) => !prev);
        }
    };

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
                {/* Nav only handles Drawer */}
                <Nav
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                />

                {/* The ticker display announcements */}
                <Ticker />

                {/* Header gets the hamburger click handler */}
                <Header handleDrawerToggle={handleDrawerToggle} />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 4,
                        overflowX: 'hidden',
                        transition: 'transform 0.3s ease',
                        transform: mobileOpen ? `translateX(-${drawerWidth}px)` : 'none',
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
