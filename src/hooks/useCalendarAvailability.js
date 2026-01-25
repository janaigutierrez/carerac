import { useState, useEffect, useCallback, useRef } from 'react';
import { parseISO, isSameDay } from 'date-fns';

/**
 * Hook for fetching and managing Google Calendar availability
 * @param {Function} getErrorMessage - Function to get translated error message
 * @returns {Object} Calendar availability state and functions
 */
export const useCalendarAvailability = (getErrorMessage) => {
    const [occupiedDates, setOccupiedDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use ref to store the error message getter to avoid re-renders
    const getErrorMessageRef = useRef(getErrorMessage);
    getErrorMessageRef.current = getErrorMessage;

    const fetchCalendarEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

            // Validate environment variables
            if (!apiKey || !calendarId) {
                console.warn('Calendar API credentials not configured. Please check your .env file.');
                console.warn('Required variables: VITE_GOOGLE_API_KEY, VITE_GOOGLE_CALENDAR_ID');
                setIsLoading(false);
                // Don't set error - just show calendar without availability data
                return;
            }

            const timeMin = new Date().toISOString();
            const timeMax = new Date();
            timeMax.setFullYear(timeMax.getFullYear() + 1);
            const timeMaxISO = timeMax.toISOString();

            const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMaxISO}&singleEvents=true&orderBy=startTime`;

            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || response.statusText;

                // Common error cases
                if (response.status === 403) {
                    console.error('Calendar API Error: API key may be invalid or Calendar API not enabled');
                    console.error('Make sure to enable Google Calendar API at https://console.cloud.google.com/');
                } else if (response.status === 404) {
                    console.error('Calendar API Error: Calendar not found. Check if VITE_GOOGLE_CALENDAR_ID is correct');
                    console.error('Also ensure the calendar is set to PUBLIC');
                }

                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            const data = await response.json();

            // Parse occupied dates from calendar events
            const occupied = (data.items || []).map(event => {
                if (event.start?.dateTime) {
                    return parseISO(event.start.dateTime);
                }
                if (event.start?.date) {
                    return parseISO(event.start.date);
                }
                return null;
            }).filter(date => date !== null);

            setOccupiedDates(occupied);
            setIsLoading(false);
        } catch (err) {
            console.error('Error loading calendar:', err);
            const errorMsg = getErrorMessageRef.current
                ? getErrorMessageRef.current()
                : 'Could not load calendar';
            setError(errorMsg);
            setIsLoading(false);
        }
    }, []); // No dependencies - uses ref for error message

    // Fetch on mount only
    useEffect(() => {
        fetchCalendarEvents();
    }, [fetchCalendarEvents]);

    const isDateOccupied = useCallback((date) => {
        return occupiedDates.some(occupiedDate => isSameDay(occupiedDate, date));
    }, [occupiedDates]);

    const refetch = useCallback(() => {
        fetchCalendarEvents();
    }, [fetchCalendarEvents]);

    return {
        occupiedDates,
        isLoading,
        error,
        isDateOccupied,
        refetch
    };
};

export default useCalendarAvailability;
