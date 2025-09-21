import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Phone, Mail, Clock } from 'lucide-react';

const ReservarSection = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [guests, setGuests] = useState(2);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: ''
    });

    // Calendar logic
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const months = [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ];

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
            const isDisabled = date < today.setHours(0, 0, 0, 0);

            days.push({
                day,
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true,
                isDisabled,
                isSelected: selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === currentMonth &&
                    selectedDate.getFullYear() === currentYear
            });
        }

        // Next month days to fill the grid
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

    const selectDate = (dayObj) => {
        if (!dayObj.isDisabled && dayObj.isCurrentMonth) {
            setSelectedDate(new Date(dayObj.year, dayObj.month, dayObj.day));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Reservation data:', {
            date: selectedDate,
            guests,
            ...formData
        });
        // TODO: Integrar amb EmailJS o Google Sheets
        alert('Sol·licitud enviada correctament!');
    };

    const calendarDays = generateCalendarDays();
    const weekDays = ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];

    return (
        <section id="reservar" ref={ref} className="py-20 bg-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('reservar.title')}
                    </h2>
                    <p className="text-primary-gray font-body max-w-2xl mx-auto">
                        Tras recibir su solicitud, nos pondremos en contacto tan pronto como sea posible para confirmar la reserva y coordinar eficazmente los detalles necesarios.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column - Calendar */}
                    <div
                        className={`transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-8'
                            }`}
                    >
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => navigateMonth('prev')}
                                className="p-2 hover:bg-primary-stone/30 rounded-full transition-colors"
                            >
                                <ChevronLeft size={20} className="text-primary-dark" />
                            </button>
                            <h3 className="font-display text-xl font-semibold text-primary-dark">
                                {months[currentMonth]} {currentYear}
                            </h3>
                            <button
                                onClick={() => navigateMonth('next')}
                                className="p-2 hover:bg-primary-stone/30 rounded-full transition-colors"
                            >
                                <ChevronRight size={20} className="text-primary-dark" />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            {/* Week days header */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {weekDays.map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-primary-gray py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar days */}
                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((dayObj, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectDate(dayObj)}
                                        disabled={dayObj.isDisabled}
                                        className={`
                      w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200
                      ${dayObj.isCurrentMonth
                                                ? dayObj.isDisabled
                                                    ? 'text-primary-gray/30 cursor-not-allowed'
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
                                    <span className="text-primary-gray">No disponible</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-primary-straw rounded"></div>
                                    <span className="text-primary-gray">Disponible</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-primary-brown rounded"></div>
                                    <span className="text-primary-gray">Seleccionat</span>
                                </div>
                            </div>
                        </div>

                        {/* Selected date info */}
                        {selectedDate && (
                            <div className="mt-6 p-4 bg-primary-straw/20 rounded-xl">
                                <p className="font-medium text-primary-dark">
                                    Data seleccionada: {selectedDate.toLocaleDateString('ca-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Guest Form */}
                    <div
                        className={`transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                            }`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        {/* Guest Counter */}
                        <div className="mb-8">
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                Nombre de persones
                            </h4>
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-primary-dark">Convidats</p>
                                        <p className="text-sm text-primary-gray">Ocupació màxima: 14</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setGuests(Math.max(1, guests - 1))}
                                            className="w-8 h-8 bg-primary-brown text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="font-display text-xl font-semibold text-primary-dark w-8 text-center">
                                            {guests}
                                        </span>
                                        <button
                                            onClick={() => setGuests(Math.min(14, guests + 1))}
                                            className="w-8 h-8 bg-primary-brown text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-6">
                                Informació de contacte
                            </h4>

                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-primary-dark mb-2">
                                            {t('reservar.form.name')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Nom"
                                            className="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary-dark mb-2">
                                            Cognoms *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            placeholder="Cognoms"
                                            className="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-dark mb-2">
                                        {t('reservar.form.email')} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="correu@exemple.com"
                                        className="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-dark mb-2">
                                        {t('reservar.form.phone')} *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+34 XXX XXX XXX"
                                        className="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-colors"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedDate || !formData.name || !formData.email || !formData.phone}
                                    className="w-full bg-primary-brown text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                >
                                    {t('reservar.form.submit')}
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-8 p-6 bg-primary-stone/20 rounded-2xl">
                            <h5 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                {t('reservar.contact.title')}
                            </h5>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Phone size={16} className="text-primary-brown" />
                                    <span className="text-primary-dark font-body">+34 XXX XXX XXX</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail size={16} className="text-primary-brown" />
                                    <span className="text-primary-dark font-body">info@cancarerac.cat</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock size={16} className="text-primary-brown" />
                                    <span className="text-primary-dark font-body">{t('reservar.contact.schedule')}</span>
                                </div>
                            </div>
                            <p className="text-primary-gray text-sm mt-4">
                                {t('reservar.contact.response')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReservarSection;