import { Tabs, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


const basePages = [
    { label: 'Mi Historia', path: '/' },
    { label: 'Producto', path: '/product' },
    { label: 'Héroes', path: '/heroes' },
    { label: 'Calendario', path: '/calendar'},
];

const adminPage = { label: 'Admin', path: '/admin/products' };

const PageTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const pages = auth.isAdmin ? [...basePages, adminPage] : basePages;

    const currentTab = pages.findIndex(page => page.path === location.pathname);

    const handleChange = (event, newValue) => {
        navigate(pages[newValue].path);
    };

    return (
        <Tabs
            value={currentTab !== -1 ? currentTab : false}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Main navigation tabs"
        >
            {pages.map((page, index) => (
                <Tab key={index} label={page.label} />
            ))}
        </Tabs>
    );
};

export default PageTabs;
