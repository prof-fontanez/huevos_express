import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '50vh',
                        gap: 2,
                        p: 4,
                    }}
                >
                    <Typography variant="h5" color="error">
                        Algo salió mal
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Ocurrió un error inesperado. Por favor recargue la página.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                    >
                        Recargar página
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;