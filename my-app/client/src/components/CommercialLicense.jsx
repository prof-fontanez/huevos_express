import { useState } from 'react';
import { Typography, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CommercialLicense = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Typography
                variant="body2"
                sx={{ marginTop: 1, textAlign: 'center' }}
            >
                Commercio registrado:{' '}
                <span
                    onClick={handleOpen}
                    style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    0186581-0023
                </span>
            </Typography>

            <Dialog
                open={open}
                onClose={handleClose}
                disableEnforceFocus
                hideBackdrop
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth: '90%',
                        maxHeight: '90%',
                        p: 0,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogContent sx={{ position: 'relative', p: 0 }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 1 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src="./certificado_hacienda.jpg"
                        alt="Certificado de Hacienda"
                        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CommercialLicense;
