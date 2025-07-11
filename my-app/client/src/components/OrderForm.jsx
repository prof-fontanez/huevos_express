import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    Dialog,
    DialogTitle,
    DialogActions,
    Box,
    Stack,
    TextField,
    Typography,
    Tooltip,
    IconButton,
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import emailjs from '@emailjs/browser';

const OrderForm = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const defaultFormData = {
        name: '',
        business: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
        qty: '3',
        type: 'Platos',
        priority: 'normal',
        message: '',
    };

    const [formData, setFormData] = useState(defaultFormData);

    const qtyOptions = formData.type === 'Caja'
        ? ['1', '2', '3']
        : ['3', '4', '5', '6', '7', '8', '9', '10', '11'];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Requerido';
        if (!formData.business.trim()) newErrors.business = 'Requerido';
        if (!formData.address.trim()) newErrors.address = 'Requerido';
        if (!formData.city.trim()) newErrors.city = 'Requerido';
        if (!formData.zip.trim()) newErrors.zip = 'Requerido';
        if (!formData.phone.trim()) newErrors.phone = 'Requerido';

        // Email format check
        if (!formData.email.trim()) {
            newErrors.email = 'Requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Correo inválido';
        }

        if (!formData.qty) newErrors.qty = 'Requerido';
        if (!formData.type) newErrors.type = 'Requerido';
        if (!formData.priority) newErrors.priority = 'Requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        const newQty = newType === 'Caja' ? '1' : '3';

        setFormData((prev) => ({
            ...prev,
            type: newType,
            qty: newQty,
        }));

        setErrors((prev) => ({
            ...prev,
            qty: '',
            type: '',
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const fullAddress = `${formData.address}, ${formData.city}, PR ${formData.zip}`;
        const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`;

        const updatedFormData = { ...formData, googleMapsLink };

        emailjs.send(
            'service_ftvabkw',
            'template_0wvhq0f',
            updatedFormData,
            'Zvmp-FaoqlRvuxVVp'
        )
            .then((result) => {
                console.log('Email sent successfully:', result.text);

                const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';
                // Send SMS notification
                fetch(`${apiBaseUrl}/api/notify-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customerName: formData.name }),
                })
                    .then(res => res.json())
                    .then(data => console.log('SMS notification sent:', data))
                    .catch(err => console.error('SMS notification failed:', err));

                // setConfirmationOpen(true);
                setOpen(false);
                setFormData(defaultFormData);
                setErrors({});
                navigate('/thankyou');

            })
            .catch((error) => {
                console.error('Email error:', error);
                alert('Failed to send order. Please try again.');
            });
    };

    const handleCancel = () => {
        setOpen(false);
        setFormData(defaultFormData);
        setErrors({});
    };

    const handleOpen = () => {
        setErrors({});
        setFormData(defaultFormData);
        setOpen(true);
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Forma de pedido
            </Button>
            <Typography variant='body2'>Tres platos o más</Typography>
            <Modal open={open} onClose={handleCancel}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '95%',
                        maxWidth: 400,
                        minWidth: 280,
                        maxHeight: '95vh',
                        backgroundColor: '#FFF8DC',
                        borderRadius: 8,
                        boxShadow: 24,
                        padding: 4,
                        overflowY: 'auto',
                        '@media (max-width: 1024px)': { width: '80%' },
                        '@media (max-width: 768px)': { width: '85%' },
                        '@media (max-width: 600px)': { width: '90%' },
                        '@media (max-width: 400px)': { width: '95%' },
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Nueva Orden
                    </Typography>
                    <TextField
                        label="Nombre"
                        name="name"
                        type="text"
                        fullWidth
                        margin="dense"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre Y. Apellido"
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Nombre del negocio"
                        name="business"
                        type="text"
                        fullWidth
                        margin="dense"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="Mi Negocio"
                        error={!!errors.business}
                        helperText={errors.business}
                        required
                    />
                    <TextField
                        label="Dirección"
                        name="address"
                        type="text"
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
                        type="text"
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
                        type="number"
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
                        type="tel"
                        fullWidth
                        margin="dense"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                    />
                    <TextField
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        fullWidth
                        margin="dense"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@email.com"
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                    />
                    <Box display="flex" gap={2} marginY={1}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="qty-label">Cantidad</InputLabel>
                            <Select
                                labelId="qty-label"
                                name="qty"
                                value={formData.qty}
                                onChange={handleChange}
                                label="Cantidad"
                                required
                                error={!!errors.qty}
                            >
                                {qtyOptions.map((qty) => (
                                    <MenuItem key={qty} value={qty}>
                                        {qty}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="type-label">Tipo</InputLabel>
                            <Select
                                labelId="type-label"
                                name="type"
                                value={formData.type}
                                onChange={handleTypeChange}
                                label="Tipo"
                                required
                                error={!!errors.type}
                            >
                                <MenuItem value="Caja">Caja</MenuItem>
                                <MenuItem value="Platos">Platos</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <FormControl margin="normal">
                        <FormControl component="fieldset">
                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                <FormLabel component="legend">Prioridad</FormLabel>
                                <Tooltip
                                    title="Baja: 3-5 días hábiles, Normal: 1-2 días hábiles, Alta: Dentro de 6 horas"
                                    enterTouchDelay={0}
                                    leaveTouchDelay={3000} // Stays open briefly
                                    disableInteractive
                                >
                                    <IconButton size="small">
                                        <InfoOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <RadioGroup
                                row
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                required
                            >
                                <FormControlLabel value="baja" control={<Radio />} label="Baja" />
                                <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                                <FormControlLabel value="alta" control={<Radio />} label="Alta" />
                            </RadioGroup>
                        </FormControl>
                    </FormControl>
                    <TextField
                        label="Mensaje (opcional)"
                        name="message"
                        fullWidth
                        margin="dense"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Ordenar
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/* <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                <DialogTitle>
                    Muchas gracias por su encargo. Procesaremos su orden dependiendo de la prioridad seleccionada.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmationOpen(false)} autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
};

export default OrderForm;
