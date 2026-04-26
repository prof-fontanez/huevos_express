import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ProductSelector = ({ products, selectedId, onChange }) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel id="product-select-label">Select Product</InputLabel>
            <Select
                labelId="product-select-label"
                value={selectedId}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="new">
                    <em>-- New Product --</em>
                </MenuItem>
                {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                        {`ID ${product.id} - ${product.title}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProductSelector;