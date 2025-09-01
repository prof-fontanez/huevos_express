import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.locale('es');

// Robust date parsing function compatible with iOS Safari
const parseEventDateTime = (date, time) => {
    console.log('🔍 Parsing event:', { date, time });
    
    if (!date || !time) {
        console.warn('❌ Missing date or time:', { date, time });
        return null;
    }
    
    // Strategy 1: Try corrected dayjs parsing
    try {
        const combined = `${date} ${time}`;
        console.log('📅 Strategy 1: Trying dayjs with combined string:', combined);
        
        // Fix: Remove the incorrect locale parameter position
        let parsed = dayjs.utc(combined, 'YYYY-MM-DD h:mm A', true);
        if (parsed.isValid()) {
            console.log('✅ Strategy 1a (strict mode) SUCCESS:', parsed.format());
            return parsed;
        }
        
        // Try without strict mode
        parsed = dayjs.utc(combined, 'YYYY-MM-DD h:mm A');
        if (parsed.isValid()) {
            console.log('✅ Strategy 1b (non-strict) SUCCESS:', parsed.format());
            return parsed;
        }
        
        console.log('❌ Strategy 1 failed - parsed date invalid');
    } catch (error) {
        console.warn('❌ Strategy 1 failed with error:', error);
    }
    
    // Strategy 2: Manual parsing for iOS Safari compatibility
    try {
        console.log('🔧 Strategy 2: Trying manual parsing');
        const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
        const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        
        if (!timeMatch) {
            console.warn('❌ Strategy 2: Could not parse time format:', time);
            return null;
        }
        
        let hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const ampm = timeMatch[3].toUpperCase();
        
        console.log('🕐 Strategy 2: Parsed components:', { year, month, day, hours, minutes, ampm });
        
        // Convert to 24-hour format
        if (ampm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (ampm === 'AM' && hours === 12) {
            hours = 0;
        }
        
        console.log('🕐 Strategy 2: Converted to 24h format:', hours);
        
        // Create a Date object that iOS Safari can handle
        const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
        console.log('📅 Strategy 2: Created UTC Date:', utcDate.toISOString());
        const parsed = dayjs.utc(utcDate);
        
        if (parsed.isValid()) {
            console.log('✅ Strategy 2 (manual) SUCCESS:', parsed.format());
            return parsed;
        }
        
        console.log('❌ Strategy 2: dayjs.utc(utcDate) invalid');
    } catch (error) {
        console.warn('❌ Strategy 2 failed with error:', error);
    }
    
    // Strategy 3: ISO string approach
    try {
        console.log('📝 Strategy 3: Trying ISO string approach');
        const [year, month, day] = date.split('-');
        const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        
        if (timeMatch) {
            let hours = parseInt(timeMatch[1], 10);
            const minutes = parseInt(timeMatch[2], 10);
            const ampm = timeMatch[3].toUpperCase();
            
            if (ampm === 'PM' && hours !== 12) {
                hours += 12;
            } else if (ampm === 'AM' && hours === 12) {
                hours = 0;
            }
            
            const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;
            console.log('📝 Strategy 3: Created ISO string:', isoString);
            const parsed = dayjs.utc(isoString);
            
            if (parsed.isValid()) {
                console.log('✅ Strategy 3 (ISO) SUCCESS:', parsed.format());
                return parsed;
            }
            
            console.log('❌ Strategy 3: dayjs.utc(isoString) invalid');
        }
    } catch (error) {
        console.warn('❌ Strategy 3 failed with error:', error);
    }
    
    console.error('💥 ALL STRATEGIES FAILED for:', { date, time });
    return null;
};

const Activities = () => {
    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseUrl}/api/events?ts=${Date.now()}`);
            const data = Array.isArray(response.data.events) ? response.data.events : [];

            const now = dayjs.utc();

            const upcoming = data
                .map((event) => {
                    const rawDateTime = parseEventDateTime(event.date, event.time);
                    
                    if (!rawDateTime) {
                        console.warn('Invalid event skipped:', event);
                        return null;
                    }
                    
                    return {
                        ...event,
                        dateTime: rawDateTime,
                    };
                })
                .filter(event => event && event.dateTime.isAfter(now))
                .sort((a, b) => a.dateTime.unix() - b.dateTime.unix());

            // Group by year
            const grouped = upcoming.reduce((acc, event) => {
                const year = event.dateTime.year();
                acc[year] = acc[year] || [];
                acc[year].push(event);
                return acc;
            }, {});

            console.log('Successfully processed events:', Object.keys(grouped).length, 'years with events');
            setGroupedEvents(grouped);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setGroupedEvents({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    const hasEvents = Object.keys(groupedEvents).length > 0;

    if (!hasEvents) {
        return (
            <Box py={4} textAlign="center">
                <Typography variant="h6" color="text.secondary">
                    No hay actividades programadas en este momento.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(78vh - 126px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                px: { xs: 1, sm: 2, md: 4 },
                py: 4,
                gap: 6,
            }}
        >
            {Object.entries(groupedEvents).map(([year, events]) => (
                <Box key={year} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, px: 1 }}>
                        {year}
                    </Typography>

                    {events.map((event, idx) => {
                        const startDateTime = dayjs(event.dateTime);
                        const endDateTime = startDateTime.add(1, 'hour');

                        const formattedDate = startDateTime.format('DD MMM').toUpperCase();
                        const formattedTime = startDateTime.format('h:mm A');

                        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                            event.description
                        )}&dates=${startDateTime.utc().format('YYYYMMDDTHHmmss')}Z/${endDateTime
                            .utc()
                            .format('YYYYMMDDTHHmmss')}Z&details=${encodeURIComponent(
                                `Actividad programada: ${event.description}`
                            )}&location=Huevos%20Express%20PR`;

                        return (
                            <Box
                                key={idx}
                                sx={{
                                    width: 'calc(100vw - 64px)',
                                    maxWidth: '1200px',
                                    mx: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    overflow: 'hidden',
                                    py: 2.5,
                                    backgroundColor: 'background.paper',
                                }}
                            >
                                {/* Fried Egg */}
                                <Box
                                    sx={{
                                        width: 130,
                                        height: 130,
                                        position: 'relative',
                                        mx: 2,
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        sx={(theme) => ({
                                            width: '100%',
                                            height: '100%',
                                            bgcolor: '#ffffff',
                                            borderRadius: '50%',
                                            boxShadow: 'inset -4px -4px 6px rgba(0,0,0,0.05)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: `1px solid ${theme.palette.divider}`,
                                        })}
                                    >
                                        <Box
                                            sx={{
                                                width: 75,
                                                height: 75,
                                                bgcolor: '#fbc02d',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
                                                textAlign: 'center',
                                                px: 1,
                                                gap: 0.5,
                                            }}
                                        >
                                            <Typography variant="caption" fontWeight={600} lineHeight={1}>
                                                {formattedDate}
                                            </Typography>
                                            <Typography variant="caption" fontSize={11} lineHeight={1}>
                                                {formattedTime}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Description + Calendar Button */}
                                <Box sx={{ flex: 1, pr: 3 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                        {event.description}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        href={calendarUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Agregar a Google Calendar
                                    </Button>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
};

export default Activities;