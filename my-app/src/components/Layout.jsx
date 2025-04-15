import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';

const Layout = () => {
    return (
        <>
            <Header />
            <Box component="main" sx={{ minHeight: '70vh', px: 2, py: 4 }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    );
}

export default Layout;