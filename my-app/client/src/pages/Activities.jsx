import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale('es');

// Set Puerto Rico timezone (Atlantic Standard Time - no DST)
const PR_TIMEZONE = 'America/Puerto_Rico';

// Parse time range and return start and end times
const parseTimeRange = (timeString) => {
    console.log('🕐 Parsing time range:', timeString);
    
    // Check if it's a time range (contains " - ")
    const rangeMatch = timeString.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
    
    if (rangeMatch) {
        console.log('📊 Found time range:', rangeMatch[1], 'to', rangeMatch[2]);
        return {
            startTime: rangeMatch[1].trim(),
            endTime: rangeMatch[2].trim(),
            isRange: true
        };
    }
    
    // Single time (backward compatibility)
    console.log('⏰ Single time found:', timeString);
    return {
        startTime: timeString.trim(),
        endTime: null,
        isRange: false
    };
};

// Parse a single time string into hours and minutes
const parseTime = (timeStr) => {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    
    if (!timeMatch) {
        return null;
    }
    
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3].toUpperCase();
    
    // Convert to 24-hour format
    if (ampm === 'PM' && hours !== 12) {
        hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return { hours, minutes };
};

// Robust date parsing function compatible with iOS Safari
const parseEventDateTime = (date, timeString) => {
    console.log('🔍 Parsing event:', { date, timeString });
    
    if (!date || !timeString) {
        console.warn('❌ Missing date or time:', { date, timeString });
        return null;
    }
    
    // Parse the time range
    const { startTime, endTime, isRange } = parseTimeRange(timeString);
    
    // Strategy 1: Try corrected dayjs parsing for start time (in PR timezone)
    let startDateTime = null;
    try {
        const combined = `${date} ${startTime}`;
        console.log('📅 Strategy 1: Trying dayjs with combined string:', combined);
        
        // Parse as Puerto Rico local time
        let parsed = dayjs.tz(combined, 'YYYY-MM-DD h:mm A', PR_TIMEZONE);
        if (parsed.isValid()) {
            console.log('✅ Strategy 1a (tz aware) SUCCESS:', parsed.format());
            startDateTime = parsed;
        } else {
            parsed = dayjs.tz(combined, 'YYYY-MM-DD h:mm A', true, PR_TIMEZONE);
            if (parsed.isValid()) {
                console.log('✅ Strategy 1b (tz strict) SUCCESS:', parsed.format());
                startDateTime = parsed;
            }
        }
    } catch (error) {
        console.warn('❌ Strategy 1 failed with error:', error);
    }
    
    // Strategy 2: Manual parsing for iOS Safari compatibility (PR timezone)
    if (!startDateTime) {
        try {
            console.log('🔧 Strategy 2: Trying manual parsing');
            const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
            const startTimeParsed = parseTime(startTime);
            
            if (!startTimeParsed) {
                console.warn('❌ Strategy 2: Could not parse time format:', startTime);
                return null;
            }
            
            const { hours, minutes } = startTimeParsed;
            console.log('🕐 Strategy 2: Parsed components:', { year, month, day, hours, minutes });
            
            // Create date in Puerto Rico timezone
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            const combined = `${dateStr} ${timeStr}`;
            const parsed = dayjs.tz(combined, 'YYYY-MM-DD HH:mm:ss', PR_TIMEZONE);
            
            if (parsed.isValid()) {
                console.log('✅ Strategy 2 (manual PR tz) SUCCESS:', parsed.format());
                startDateTime = parsed;
            }
        } catch (error) {
            console.warn('❌ Strategy 2 failed with error:', error);
        }
    }
    
    // Strategy 3: ISO-like string with timezone
    if (!startDateTime) {
        try {
            console.log('📝 Strategy 3: Trying timezone-aware approach');
            const [year, month, day] = date.split('-');
            const startTimeParsed = parseTime(startTime);
            
            if (startTimeParsed) {
                const { hours, minutes } = startTimeParsed;
                // Create a simple date string and let dayjs.tz handle the timezone
                const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
                console.log('📝 Strategy 3: Created string:', dateStr);
                const parsed = dayjs.tz(dateStr, PR_TIMEZONE);
                
                if (parsed.isValid()) {
                    console.log('✅ Strategy 3 (tz aware) SUCCESS:', parsed.format());
                    startDateTime = parsed;
                }
            }
        } catch (error) {
            console.warn('❌ Strategy 3 failed with error:', error);
        }
    }
    
    if (!startDateTime) {
        console.error('💥 ALL STRATEGIES FAILED for start time:', { date, startTime });
        return null;
    }
    
    // Parse end time if it's a range
    let endDateTime;
    if (isRange && endTime) {
        console.log('📊 Parsing end time:', endTime);
        
        const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
        const endTimeParsed = parseTime(endTime);
        
        if (endTimeParsed) {
            const { hours, minutes } = endTimeParsed;
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            const combined = `${dateStr} ${timeStr}`;
            endDateTime = dayjs.tz(combined, 'YYYY-MM-DD HH:mm:ss', PR_TIMEZONE);
            
            if (endDateTime.isValid()) {
                console.log('✅ End time parsed successfully:', endDateTime.format());
            } else {
                console.warn('⚠️ End time parsing failed, using +1 hour default');
                endDateTime = startDateTime.add(1, 'hour');
            }
        } else {
            console.warn('⚠️ Could not parse end time, using +1 hour default');
            endDateTime = startDateTime.add(1, 'hour');
        }
    } else {
        // No range specified, default to +1 hour
        endDateTime = startDateTime.add(1, 'hour');
        console.log('⏰ No end time specified, using +1 hour default');
    }
    
    return {
        startDateTime,
        endDateTime
    };
};

const Activities = () => {
    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseUrl}/api/events?ts=${Date.now()}`);
            const data = Array.isArray(response.data.events) ? response.data.events : [];

            // Get current time in Puerto Rico timezone
            const now = dayjs().tz(PR_TIMEZONE);
            console.log('Current PR time:', now.format('YYYY-MM-DD HH:mm:ss'));

            const upcoming = data
                .map((event) => {
                    const parsedDateTime = parseEventDateTime(event.date, event.time);
                    
                    if (!parsedDateTime) {
                        console.warn('Invalid event skipped:', event);
                        return null;
                    }
                    
                    return {
                        ...event,
                        startDateTime: parsedDateTime.startDateTime,
                        endDateTime: parsedDateTime.endDateTime,
                    };
                })
                .filter(event => event && event.startDateTime.isAfter(now))
                .sort((a, b) => a.startDateTime.unix() - b.startDateTime.unix());

            // Group by year, then by month
            const grouped = upcoming.reduce((acc, event) => {
                const year = event.startDateTime.year();
                const month = event.startDateTime.format('MMMM'); // Full month name in Spanish
                const monthNum = event.startDateTime.month(); // 0-11 for sorting
                
                acc[year] = acc[year] || {};
                acc[year][monthNum] = acc[year][monthNum] || {
                    name: month,
                    events: []
                };
                acc[year][monthNum].events.push(event);
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
            {Object.entries(groupedEvents).map(([year, months]) => (
                <Box key={year} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Year Header */}
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, px: 1 }}>
                        {year}
                    </Typography>

                    {/* Months within the year */}
                    {Object.entries(months)
                        .sort(([monthA], [monthB]) => parseInt(monthA) - parseInt(monthB))
                        .map(([monthNum, monthData]) => (
                        <Box key={monthNum} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Month Header */}
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 600, 
                                    px: 2,
                                    color: 'text.secondary'
                                }}
                            >
                                {monthData.name}
                            </Typography>

                            {/* Events in this month */}
                            {monthData.events.map((event, idx) => {
                                const startDateTime = event.startDateTime;
                                const endDateTime = event.endDateTime;

                                const formattedDate = startDateTime.format('DD MMM').toUpperCase();
                                const formattedTimeStart = startDateTime.format('h:mm A');
                                const formattedTimeEnd = endDateTime.format('h:mm A');
                                
                                // Show time range in the display
                                const displayTime = `${formattedTimeStart} - ${formattedTimeEnd}`;

                                // Format for Google Calendar - use local time without timezone conversion
                                // Format: YYYYMMDDTHHmmss (no Z at the end means local time)
                                const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                                    event.description
                                )}&dates=${startDateTime.format('YYYYMMDDTHHmmss')}/${endDateTime.format('YYYYMMDDTHHmmss')}&details=${encodeURIComponent(
                                        `Actividad programada: ${event.description}`
                                    )}&location=${encodeURIComponent(event.description)}&ctz=${PR_TIMEZONE}`;

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
                                                    <Typography variant="caption" fontSize={9} lineHeight={1} sx={{ mt: 0.5 }}>
                                                        {displayTime}
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
            ))}
        </Box>
    );
};

export default Activities;