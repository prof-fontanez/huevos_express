import React, { useState } from 'react';
import {
    Modal,
    Dialog,
    DialogTitle,
    DialogActions,
    Box,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    FormLabel,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import emailjs from '@emailjs/browser';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: 24,
    padding: theme.spacing(4),
}));

const OrderForm = () => {
    const [errors, setErrors] = useState({});
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        business: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        qty: '1',
        priority: 'normal',
        message: '', // optional message
    });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Requerido';
        if (!formData.business.trim()) newErrors.business = 'Requerido';
        if (!formData.address.trim()) newErrors.address = 'Requerido';
        if (!formData.city.trim()) newErrors.city = 'Requerido';
        if (!formData.zip.trim()) newErrors.zip = 'Requerido';
        if (!formData.phone.trim()) newErrors.phone = 'Requerido';
        if (!formData.qty) newErrors.qty = 'Requerido';
        if (!formData.priority) newErrors.priority = 'Requerido';

        if (formData.qty === '5+' && !formData.message.trim()) {
            newErrors.message = 'Por favor especifique la cantidad solicitada.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true if no errors
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear message error if qty is changed to less than '5+'
        const updatedErrors = { ...errors };
        if (name === 'qty' && value !== '5+') {
            delete updatedErrors.message;
        }

        if (name === 'message') {
            updatedErrors.message = ''; // Clear error when typing in the message
        }

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = () => {

        if (!validateForm()) return;

        const fullAddress = `${formData.address}, ${formData.city}, PR ${formData.zip}`;
        const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`;

        // Update formData with the Google Maps link
        const updatedFormData = { ...formData, googleMapsLink };

        emailjs.send(
            'service_ftvabkw', // your service ID
            'template_0wvhq0f', // your template ID
            updatedFormData,    // send the updated formData
            'Zvmp-FaoqlRvuxVVp' // your public key
        )
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setConfirmationOpen(true); // Show the confirmation dialog
                setOpen(false);            // Close the form modal
            })
            .catch((error) => {
                console.error('Email error:', error);
                alert('Failed to send order. Please try again.');
            });
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Forma de pedido
            </Button>
            <Modal open={open} onClose={handleCancel}>
                <StyledBox>
                    <Typography variant="h6" gutterBottom>
                        Nueva Orden
                    </Typography>
                    <TextField
                        label="Nombre"
                        name="name"
                        fullWidth
                        margin="dense"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Nombre del negocio"
                        name="business"
                        fullWidth
                        margin="dense"
                        value={formData.business}
                        onChange={handleChange}
                        error={!!errors.business}
                        helperText={errors.business}
                        required
                    />
                    <TextField
                        label="Dirección"
                        name="address"
                        fullWidth
                        margin="dense"
                        value={formData.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        required
                    />
                    <TextField
                        label="Pueblo"
                        name="city"
                        fullWidth
                        margin="dense"
                        value={formData.city}
                        onChange={handleChange}
                        error={!!errors.city}
                        helperText={errors.city}
                        required
                    />
                    <TextField
                        label="Código Postal"
                        name="zip"
                        fullWidth
                        margin="dense"
                        value={formData.zip}
                        onChange={handleChange}
                        error={!!errors.zip}
                        helperText={errors.zip}
                        required
                    />
                    <TextField
                        label="Teléfono"
                        name="phone"
                        fullWidth
                        margin="dense"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="qty-label">Cantidad</InputLabel>
                        <Select
                            labelId="qty-label"
                            name="qty"
                            value={formData.qty}
                            onChange={handleChange}
                            label="Cantidad"
                            required
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5+">5+</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal">
                        <FormLabel>Prioridad</FormLabel>
                        <RadioGroup
                            row
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <FormControlLabel value="low" control={<Radio />} label="Baja" />
                            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                            <FormControlLabel value="high" control={<Radio />} label="Alta" />
                        </RadioGroup>
                    </FormControl>

                    {/* Optional Message Field */}
                    <TextField
                        label={`Mensaje (Especifique cantidad de 5 o más)${formData.qty === '5+' ? ' *' : ''}`}
                        name="message"
                        fullWidth
                        margin="dense"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        error={!!errors.message}
                        helperText={errors.message}
                    />

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Ordenar
                        </Button>
                    </Box>
                </StyledBox>
            </Modal>
            <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                <DialogTitle>Muchas gracias por su encargo. Procesaremos su order dependiendo de la prioridad seleccionada.</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmationOpen(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default OrderForm;
