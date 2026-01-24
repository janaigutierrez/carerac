import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Phone, Mail, Clock, UtensilsCrossed, Landmark, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { format, parseISO, isSameDay } from 'date-fns';

const ReservarSection = () => {
    const { t, language } = useLanguage(); // ← Afegit language per key única
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [guests, setGuests] = useState(2);
    const [selectedExperience, setSelectedExperience] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        comments: ''
    });

    // Estats per Google Calendar
    const [occupiedDates, setOccupiedDates] = useState([]);
    const [calendarLoading, setCalendarLoading] = useState(true);
    const [calendarError, setCalendarError] = useState(null);

    // Estats per EmailJS
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Opcions d'experiència
    const experiences = [
        {
            id: 'gastronomica',
            title: t('experiencies.gastronomica.title'),
            icon: UtensilsCrossed,
            color: 'from-primary-brown to-primary-dark'
        },
        {
            id: 'cultural',
            title: t('experiencies.cultural.title'),
            icon: Landmark,
            color: 'from-primary-forest to-primary-brown'
        }
    ];

    // Calendar logic
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const months = t('reservar.calendar.months');
    const weekDays = t('reservar.calendar.weekDays');

    // ============================================
    // GOOGLE CALENDAR API - CARREGAR EVENTS
    // ============================================
    useEffect(() => {
        fetchCalendarEvents();
    }, []);

    const fetchCalendarEvents = async () => {
        try {
            setCalendarLoading(true);
            setCalendarError(null);

            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

            const timeMin = new Date().toISOString();
            const timeMax = new Date();
            timeMax.setFullYear(timeMax.getFullYear() + 1);
            const timeMaxISO = timeMax.toISOString();

            const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMaxISO}&singleEvents=true&orderBy=startTime`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // ============================================
            // 🔧 LÒGICA DE DISPONIBILITAT - MODIFICAR AQUÍ
            // ============================================
            // OPCIÓ ACTUAL: Qualsevol event = tot el dia ocupat
            // ============================================
            const occupied = data.items.map(event => {
                if (event.start.dateTime) {
                    return parseISO(event.start.dateTime);
                }
                if (event.start.date) {
                    return parseISO(event.start.date);
                }
                return null;
            }).filter(date => date !== null);

            setOccupiedDates(occupied);
            setCalendarLoading(false);
        } catch (error) {
            console.error('Error carregant calendari:', error);
            setCalendarError(t('reservar.calendar.error'));
            setCalendarLoading(false);
        }
    };

    // ============================================
    // FUNCIONS CALENDARI
    // ============================================
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const isDateOccupied = (date) => {
        return occupiedDates.some(occupiedDate =>
            isSameDay(occupiedDate, date)
        );
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        const days = [];

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

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const today = new Date();
            const isPast = date < today.setHours(0, 0, 0, 0);
            const isOccupied = isDateOccupied(date);

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

    // ============================================
    // EMAILJS - ENVIAR SOL·LICITUD
    // ============================================
    const handleSubmit = async () => {
        if (!selectedDate || !selectedExperience || !formData.name || !formData.email || !formData.phone) {
            setSubmitError(t('reservar.form.requiredFields'));
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const templateParams = {
                name: formData.name + ' ' + formData.lastname,
                email: formData.email,
                phone: formData.phone,
                checkIn: format(selectedDate, 'dd/MM/yyyy'),
                checkOut: format(selectedDate, 'dd/MM/yyyy'),
                guests: guests.toString(),
                message: `Experiència seleccionada: ${experiences.find(e => e.id === selectedExperience)?.title || selectedExperience}\n\nComentaris: ${formData.comments || 'Cap'}`
            };

            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            if (response.status === 200) {
                setSubmitSuccess(true);
                setIsSubmitting(false);
            } else {
                throw new Error('Error enviant el correu');
            }
        } catch (error) {
            console.error('Error enviant sol·licitud:', error);
            setSubmitError(t('reservar.form.errorMessage'));
            setIsSubmitting(false);
        }
    };

    const handleNewReservation = () => {
        setSubmitSuccess(false);
        setSelectedDate(null);
        setGuests(2);
        setSelectedExperience('');
        setFormData({
            name: '',
            lastname: '',
            email: '',
            phone: '',
            comments: ''
        });
        setSubmitError(null);
    };

    const calendarDays = generateCalendarDays();

    // ============================================
    // RENDER: MISSATGE D'ÈXIT
    // ============================================
    if (submitSuccess) {
        return (
            <section id="reservar" className="py-20 bg-primary-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                        <div className="mb-6">
                            <CheckCircle size={64} className="text-green-500 mx-auto" />
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            {t('reservar.confirmation.title')}
                        </h2>
                        <div className="space-y-4 text-primary-gray text-lg mb-8">
                            <p>{t('reservar.confirmation.emailSent')}</p>
                            <p className="font-semibold text-primary-brown">
                                {t('reservar.confirmation.response')}
                            </p>
                            <div className="bg-primary-straw/20 rounded-lg p-6 mt-6">
                                <p className="text-sm text-primary-dark">
                                    📅 <strong>{t('reservar.confirmation.summary.date')}</strong> {format(selectedDate, 'dd/MM/yyyy')}
                                </p>
                                <p className="text-sm text-primary-dark mt-2">
                                    👥 <strong>{t('reservar.confirmation.summary.guests')}</strong> {guests}
                                </p>
                                <p className="text-sm text-primary-dark mt-2">
                                    ✨ <strong>{t('reservar.confirmation.summary.experience')}</strong> {experiences.find(e => e.id === selectedExperience)?.title}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={handleNewReservation}
                                className="w-full bg-primary-brown text-white py-4 rounded-lg font-medium hover:bg-primary-dark transition-all shadow-lg"
                            >
                                {t('reservar.confirmation.newReservation')}
                            </button>

                            <div className="pt-6 border-t border-primary-gray/20">
                                <p className="text-sm text-primary-gray mb-4">
                                    {t('reservar.confirmation.questions')}
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-primary-stone/20 rounded-lg p-4">
                                        <Phone size={24} className="text-primary-brown mx-auto mb-2" />
                                        <p className="text-sm font-medium text-primary-dark">+34 XXX XXX XXX</p>
                                    </div>
                                    <div className="bg-primary-stone/20 rounded-lg p-4">
                                        <Mail size={24} className="text-primary-brown mx-auto mb-2" />
                                        <p className="text-sm font-medium text-primary-dark">info@cancarerac.cat</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================
    // RENDER: FORMULARI NORMAL
    // ============================================
    return (
        <section id="reservar" ref={ref} className="py-20 bg-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('reservar.title')}
                    </h2>
                    <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">
                        {t('reservar.subtitle')}
                    </p>
                </div>

                {/* Error calendari */}
                {calendarError && (
                    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">{calendarError}</p>
                    </div>
                )}

                {/* LAYOUT - 2 COLUMNES */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* COLUMNA ESQUERRA: Calendari */}
                    <div
                        className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                            }`}
                    >
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
                            {calendarLoading && (
                                <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown mx-auto mb-3"></div>
                                        <p className="text-sm text-primary-gray">{t('reservar.calendar.loading')}</p>
                                    </div>
                                </div>
                            )}

                            {/* Week days header - KEY ÚNICA PER IDIOMA */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {weekDays.map((day, index) => (
                                    <div key={`${language}-${day}-${index}`} className="text-center text-sm font-medium text-primary-gray py-2">
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
                                    📅 {t('reservar.calendar.selectedDate')} {selectedDate.toLocaleDateString(language === 'ca' ? 'ca-ES' : language === 'es' ? 'es-ES' : 'en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* COLUMNA DRETA */}
                    <div
                        className={`space-y-6 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        {/* Selector d'experiència */}
                        <div>
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                {t('reservar.experienceSelector.title')}
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {experiences.map((exp) => {
                                    const IconComponent = exp.icon;
                                    return (
                                        <button
                                            key={exp.id}
                                            onClick={() => setSelectedExperience(exp.id)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${selectedExperience === exp.id
                                                ? 'border-primary-brown bg-primary-brown/10 shadow-lg scale-105'
                                                : 'border-primary-gray/20 bg-white hover:border-primary-brown/50 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className={`p-3 rounded-lg bg-gradient-to-br ${exp.color}`}>
                                                    <IconComponent size={24} className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-display font-semibold text-primary-dark text-sm leading-tight">
                                                        {exp.title}
                                                    </p>
                                                    {selectedExperience === exp.id && (
                                                        <p className="text-xs text-primary-brown mt-1">✓</p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Guest Counter */}
                        <div>
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                {t('reservar.guests.title')}
                            </h4>
                            <div className="bg-white rounded-xl p-5 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-primary-dark">{t('reservar.guests.label')}</p>
                                        <p className="text-sm text-primary-gray">{t('reservar.guests.max')}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setGuests(Math.max(1, guests - 1))}
                                            className="w-10 h-10 bg-primary-brown text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="font-display text-2xl font-semibold text-primary-dark w-10 text-center">
                                            {guests}
                                        </span>
                                        <button
                                            onClick={() => setGuests(Math.min(14, guests + 1))}
                                            className="w-10 h-10 bg-primary-brown text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulari */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                {t('reservar.form.title')}
                            </h4>

                            {/* Error enviament */}
                            {submitError && (
                                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                    <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-800">{submitError}</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-primary-dark mb-1">
                                            {t('reservar.form.name')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={t('reservar.form.namePlaceholder')}
                                            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-primary-dark mb-1">
                                            {t('reservar.form.lastname')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            placeholder={t('reservar.form.lastnamePlaceholder')}
                                            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        {t('reservar.form.email')} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('reservar.form.emailPlaceholder')}
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        {t('reservar.form.phone')} *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={t('reservar.form.phonePlaceholder')}
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        {t('reservar.form.comments')}
                                    </label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleInputChange}
                                        placeholder={t('reservar.form.commentsPlaceholder')}
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedDate || !selectedExperience || !formData.name || !formData.email || !formData.phone || isSubmitting}
                                    className="w-full bg-primary-brown text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>{t('reservar.form.sending')}</span>
                                        </>
                                    ) : (
                                        <span>{t('reservar.form.submit')}</span>
                                    )}
                                </button>

                                <p className="text-center text-xs text-primary-gray">
                                    {t('reservar.form.required')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div
                    className={`grid md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '400ms' }}
                >
                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Phone size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">{t('reservar.contact.call')}</h5>
                        <p className="text-primary-gray">+34 XXX XXX XXX</p>
                    </div>

                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Mail size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">{t('reservar.contact.email')}</h5>
                        <p className="text-primary-gray">info@cancarerac.cat</p>
                    </div>

                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Clock size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">{t('reservar.contact.schedule')}</h5>
                        <p className="text-primary-gray">{t('reservar.contact.scheduleDays')}</p>
                        <p className="text-primary-gray text-sm">{t('reservar.contact.scheduleHours')}</p>
                    </div>
                </div>

                <p className="text-center text-primary-gray text-sm mt-6">
                    {t('reservar.contact.response')}
                </p>

            </div>
        </section>
    );
};

export default ReservarSection;