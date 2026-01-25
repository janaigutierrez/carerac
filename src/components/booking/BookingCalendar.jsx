import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const BookingCalendar = ({
    selectedDate,
    onSelectDate,
    isDateOccupied,
    isLoading
}) => {
    const { t, currentLanguage } = useLanguage();

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const months = t('reservar.calendar.months');
    const weekDays = t('reservar.calendar.weekDays');

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        const days = [];

        // Previous month days
        for (let i = startDay - 1; i >= 0; i--) {
            const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            const day = getDaysInMonth(prevMonth, prevYear) - i;
            days.push({
                day,
                month: prevMonth,
                year: prevYear,
                isCurrentMonth: false,
                isDisabled: true
            });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const today = new Date();
            const isPast = date < today.setHours(0, 0, 0, 0);
            const isOccupied = isDateOccupied ? isDateOccupied(date) : false;

            days.push({
                day,
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true,
                isDisabled: isPast || isOccupied,
                isOccupied,
                isSelected: selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === currentMonth &&
                    selectedDate.getFullYear() === currentYear
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
            days.push({
                day,
                month: nextMonth,
                year: nextYear,
                isCurrentMonth: false,
                isDisabled: true
            });
        }

        return days;
    };

    const navigateMonth = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };

    const handleSelectDate = (dayObj) => {
        if (!dayObj.isDisabled && dayObj.isCurrentMonth) {
            onSelectDate(new Date(dayObj.year, dayObj.month, dayObj.day));
        }
    };

    const calendarDays = generateCalendarDays();

    return (
        <div>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-primary-stone/30 rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} className="text-primary-dark" />
                </button>
                <h3 className="font-display text-xl font-semibold text-primary-dark">
                    {months[currentMonth]} {currentYear}
                </h3>
                <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-primary-stone/30 rounded-lg transition-colors"
                >
                    <ChevronRight size={20} className="text-primary-dark" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-xl p-6 shadow-xl mb-6 relative">
                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown mx-auto mb-3"></div>
                            <p className="text-sm text-primary-gray">{t('reservar.calendar.loading')}</p>
                        </div>
                    </div>
                )}

                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekDays.map((day, index) => (
                        <div key={`${currentLanguage}-${day}-${index}`} className="text-center text-sm font-medium text-primary-gray py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((dayObj, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectDate(dayObj)}
                            disabled={dayObj.isDisabled}
                            className={`
                                w-full aspect-square text-sm font-medium rounded-lg transition-all duration-200
                                ${dayObj.isCurrentMonth
                                    ? dayObj.isDisabled
                                        ? dayObj.isOccupied
                                            ? 'bg-red-100 text-red-400 cursor-not-allowed line-through'
                                            : 'text-primary-gray/30 cursor-not-allowed'
                                        : dayObj.isSelected
                                            ? 'bg-primary-brown text-white shadow-md'
                                            : 'text-primary-dark hover:bg-primary-straw/30'
                                    : 'text-primary-gray/20 cursor-not-allowed'
                                }
                            `}
                        >
                            {dayObj.day}
                        </button>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mt-6 text-xs">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary-gray/30 rounded"></div>
                        <span className="text-primary-gray">{t('reservar.calendar.legend.past')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-100 rounded"></div>
                        <span className="text-primary-gray">{t('reservar.calendar.legend.unavailable')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary-brown rounded"></div>
                        <span className="text-primary-gray">{t('reservar.calendar.legend.selected')}</span>
                    </div>
                </div>
            </div>

            {/* Selected date info */}
            {selectedDate && (
                <div className="p-4 bg-primary-straw/20 rounded-xl">
                    <p className="font-medium text-primary-dark">
                        📅 {t('reservar.calendar.selectedDate')} {selectedDate.toLocaleDateString(
                            currentLanguage === 'ca' ? 'ca-ES' : currentLanguage === 'es' ? 'es-ES' : 'en-US',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BookingCalendar;
