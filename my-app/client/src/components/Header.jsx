import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Alert,
} from '@mui/material';
import { useAuth } from './AuthContext'; // Adjust path if needed

const LoginDialog = ({ open, onClose }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
                login(data);
                setUsername('');
                setPassword('');
                onClose();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch {
            setError('Network or server error');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};

const Header = () => {
    const { auth, logout } = useAuth();
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src="/logo3.png"
                            alt="Huevos Express Logo"
                            sx={{
                                height: 32,
                                width: 32,
                                marginRight: 1,
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: {
                                    xs: '1rem',
                                    sm: '1.25rem',
                                },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginRight: 1,
                            }}
                        >
                            Huevos Express PR
                        </Typography>
                        <Box
                            component="img"
                            src="/pr_flag.png"
                            alt="Puerto Rican flag"
                            sx={{
                                height: 32,
                                width: 32,
                            }}
                        />
                    </Box>

                    {/* Login Button or Logout + Username */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {auth.token ? (
                            <>
                                <Typography sx={{ whiteSpace: 'nowrap' }}>
                                    Hello, {auth.username}
                                </Typography>
                                <Button color="inherit" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" onClick={() => setLoginOpen(true)}>
                                Login
                            </Button>
                        )}

                    </Box>

                </Toolbar>
            </AppBar>

            {/* Login Dialog */}
            <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    );
};

export default Header;
