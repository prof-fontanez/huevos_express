import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material';


const OrderSubmittedDialog = ({ open, onClose }) => {

    return (
        < Dialog open={open} onClose={onClose} >
            <DialogTitle>
                Muchas gracias por su encargo. Procesaremos su orden dependiendo de la prioridad seleccionada.
            </DialogTitle>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog >

    );
}

export default OrderSubmittedDialog;