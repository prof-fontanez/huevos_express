import { Button } from '@mui/material';

const ProductFormActions = ({ selectedId, saving, onSave, onDelete }) => {
    return (
        <>
            <Button
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={saving}
                sx={{ mt: 2 }}
            >
                {saving ? 'Saving...' : selectedId === 'new' ? 'Create Product' : 'Save Changes'}
            </Button>

            {selectedId !== 'new' && (
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={onDelete}
                    sx={{ mt: 1 }}
                >
                    Delete Product
                </Button>
            )}
        </>
    );
};

export default ProductFormActions;