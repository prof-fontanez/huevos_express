import express from 'express';
import { getSheetsClient } from '../utils/googleSheetsClient.js';
import dayjs from 'dayjs';

const router = express.Router();

const expandRecurringEvents = (event) => {
    const { date, time, description, recurring, recurring_count, interval } = event;

    // Not recurring or invalid — return as single event
    if (recurring !== 'Y' || !recurring_count || recurring_count <= 0 || !interval) {
        return [{ date, time, description }];
    }

    const events = [];
    let currentDate = dayjs(date);

    for (let i = 0; i < recurring_count; i++) {
        events.push({
            date: currentDate.format('YYYY-MM-DD'),
            time,
            description,
        });

        // Advance to next occurrence
        switch (interval.toUpperCase()) {
            case 'DAILY':
                currentDate = currentDate.add(1, 'day');
                break;
            case 'WEEKLY':
                currentDate = currentDate.add(1, 'week');
                break;
            case 'MONTHLY':
                currentDate = currentDate.add(1, 'month');
                break;
            default:
                // Unknown interval — stop expanding
                i = recurring_count;
        }
    }

    return events;
};

router.get('/', async (req, res) => {
    try {
        const sheets = await getSheetsClient();

        const spreadsheetId = '1_mHzDxZghiIUDjPw1MIBu9VbZE0qj9nPm7aiUMjCagg';
        const range = 'eventos!A2:F'; // Extended to column F to include new columns

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];

        const events = rows
            .filter(row => row.length >= 3)
            .flatMap(([date, time, description, recurring = 'N', recurring_count = '0', interval = '']) => {
                return expandRecurringEvents({
                    date,
                    time,
                    description,
                    recurring: recurring.trim().toUpperCase(),
                    recurring_count: parseInt(recurring_count, 10) || 0,
                    interval: interval.trim().toUpperCase(),
                });
            });

        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('Surrogate-Control', 'no-store');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Platform-Fix', 'ios');

        return res.json({ events });

    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ events: [] });
    }
});

export default router;