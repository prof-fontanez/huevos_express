import { Box } from "@mui/material";
import HistoryGallery from "../components/HistoryGallery"

const MyHistory = () => {
    return (
        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                p: 2,
            }}
        >
            <HistoryGallery />
        </Box>

    );
}


export default MyHistory;