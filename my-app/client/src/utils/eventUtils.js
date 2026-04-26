import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale('es');

export const PR_TIMEZONE = 'America/Puerto_Rico';

export const parseTimeRange = (timeString) => {
    const rangeMatch = timeString.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
    if (rangeMatch) {
        return {
            startTime: rangeMatch[1].trim(),
            endTime: rangeMatch[2].trim(),
            isRange: true
        };
    }
    return {
        startTime: timeString.trim(),
        endTime: null,
        isRange: false
    };
};

export const parseTime = (timeStr) => {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeMatch) return null;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3].toUpperCase();

    if (ampm === 'PM' && hours !== 12) {
        hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
    }

    return { hours, minutes };
};

export const parseEventDateTime = (date, timeString) => {
    if (!date || !timeString) return null;

    const { startTime, endTime, isRange } = parseTimeRange(timeString);

    let startDateTime = null;

    try {
        const combined = `${date} ${startTime}`;
        let parsed = dayjs.tz(combined, 'YYYY-MM-DD h:mm A', PR_TIMEZONE);
        if (parsed.isValid()) {
            startDateTime = parsed;
        } else {
            parsed = dayjs.tz(combined, 'YYYY-MM-DD h:mm A', true, PR_TIMEZONE);
            if (parsed.isValid()) startDateTime = parsed;
        }
    } catch (error) {
        console.warn('Strategy 1 failed:', error);
    }

    if (!startDateTime) {
        try {
            const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
            const startTimeParsed = parseTime(startTime);
            if (!startTimeParsed) return null;

            const { hours, minutes } = startTimeParsed;
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            const parsed = dayjs.tz(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm:ss', PR_TIMEZONE);
            if (parsed.isValid()) startDateTime = parsed;
        } catch (error) {
            console.warn('Strategy 2 failed:', error);
        }
    }

    if (!startDateTime) {
        try {
            const [year, month, day] = date.split('-');
            const startTimeParsed = parseTime(startTime);
            if (startTimeParsed) {
                const { hours, minutes } = startTimeParsed;
                const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
                const parsed = dayjs.tz(dateStr, PR_TIMEZONE);
                if (parsed.isValid()) startDateTime = parsed;
            }
        } catch (error) {
            console.warn('Strategy 3 failed:', error);
        }
    }

    if (!startDateTime) return null;

    let endDateTime;
    if (isRange && endTime) {
        const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
        const endTimeParsed = parseTime(endTime);
        if (endTimeParsed) {
            const { hours, minutes } = endTimeParsed;
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            endDateTime = dayjs.tz(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm:ss', PR_TIMEZONE);
            if (!endDateTime.isValid()) endDateTime = startDateTime.add(1, 'hour');
        } else {
            endDateTime = startDateTime.add(1, 'hour');
        }
    } else {
        endDateTime = startDateTime.add(1, 'hour');
    }

    return { startDateTime, endDateTime };
};