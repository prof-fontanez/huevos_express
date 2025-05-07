import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';

const ProductQrPayment = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{
                        p: 0,
                        minWidth: 'unset',
                        width: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: '#8B4513',
                        },
                        borderRadius: 1,
                    }}
                >
                    <Box
                        component="img"
                        src="/ath_movil.png"
                        alt="Pagar con ATH Móvil"
                        sx={{ width: 160, height: 'auto', display: 'block' }}
                    />
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Pague aquí con ATH Móvil</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 4,
                            flexWrap: 'wrap',
                            p: 2,
                        }}
                    >
                        <Box
                            component="img"
                            src="/qr2.png"
                            alt="Código QR de Luis"
                            sx={{ width: 160, height: 160 }}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductQrPayment;