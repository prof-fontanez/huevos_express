import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Alert
} from '@mui/material';
import { useAuth } from './AuthContext';

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
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
