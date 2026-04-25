import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
    Box,
    Typography,
    Avatar,
    Rating,
    IconButton,
    Button,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RateReviewIcon from '@mui/icons-material/RateReview';

const LEAVE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${import.meta.env.VITE_PLACE_ID}`;
const FADE_DURATION = 300;

const EmbeddedReviews = () => {
    const { reviews, rating, totalReviews, loading } = useBusiness();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    const goTo = (index) => {
        setVisible(false);
        setTimeout(() => {
            setCurrentIndex(index);
            setVisible(true);
        }, FADE_DURATION);
    };

    const handlePrev = () => {
        goTo(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
    };

    const handleNext = () => {
        goTo(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
    };

    if (loading) return null;
    if (reviews.length === 0) return null;

    const review = reviews[currentIndex];
    const reviewText = review.text;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 2,
            }}
        >
            <Typography variant="h6">Reseñas</Typography>

            {/* Overall rating summary */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Rating value={rating} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                    {rating} de 5 — {totalReviews} reseñas en Google
                </Typography>
            </Box>

            {/* Main container */}
            <Box
                sx={{
                    width: { xs: '100%', sm: '80%', md: '60%' },
                    maxWidth: 600,
                    height: { xs: 350, sm: 400, md: 450 },
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                {/* Slide counter — fixed */}
                <Typography
                    variant="body2"
                    sx={{ color: 'primary.contrastText', textAlign: 'center', flexShrink: 0, mb: 1 }}
                >
                    {currentIndex + 1} / {reviews.length}
                </Typography>

                {/* Review card — takes all remaining space between counter and controls */}
                <Box
                    sx={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        overflow: 'hidden',
                        gap: 1,
                    }}
                >
                    {/* Reviewer info — fixed */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                        <Avatar
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            sx={{ width: 48, height: 48 }}
                        />
                        <Box>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                sx={{ color: 'primary.contrastText' }}
                            >
                                {review.author_name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: 'primary.contrastText', opacity: 0.8 }}
                            >
                                {review.relative_time_description}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Star rating — fixed */}
                    <Rating
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        sx={{ color: 'warning.main', flexShrink: 0 }}
                    />

                    {/* Review text — scrollable */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            pr: 1,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontStyle: 'italic', color: 'primary.contrastText' }}
                        >
                            "{reviewText}"
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation controls — fixed at bottom */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexShrink: 0, mt: 1 }}>
                    <IconButton aria-label="reseña anterior" onClick={handlePrev} sx={{ color: 'primary.contrastText' }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton aria-label="reseña siguiente" onClick={handleNext} sx={{ color: 'primary.contrastText' }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Leave a review button */}
            <Button
                variant="contained"
                color="secondary"
                startIcon={<RateReviewIcon />}
                href={LEAVE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                Dejar una reseña en Google
            </Button>
        </Box>
    );
};

export default EmbeddedReviews;