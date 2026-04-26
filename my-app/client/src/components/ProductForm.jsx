import { TextField } from '@mui/material';

const ProductForm = ({ form, onChange }) => {
    return (
        <>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={form.title}
                onChange={(e) => onChange('title', e.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={form.description}
                onChange={(e) => onChange('description', e.target.value)}
            />
            <TextField
                label="Price"
                fullWidth
                margin="normal"
                value={form.price}
                onChange={(e) => onChange('price', e.target.value)}
            />
            <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={form.image_url}
                onChange={(e) => onChange('image_url', e.target.value)}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <input
                    type="checkbox"
                    checked={!!form.has_tooltip}
                    onChange={(e) => onChange('has_tooltip', e.target.checked)}
                />
                Tooltip
            </label>
            {form.has_tooltip && (
                <TextField
                    label="Tooltip Message"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 100 }}
                    value={form.tooltip_msg || ''}
                    onChange={(e) => onChange('tooltip_msg', e.target.value)}
                    helperText={`${(form.tooltip_msg || '').length}/100`}
                />
            )}
        </>
    );
};

export default ProductForm;