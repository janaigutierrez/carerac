import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Phone, Mail, Clock, UtensilsCrossed, Landmark } from 'lucide-react';

const ReservarSection = () => {
    const { t } = useLanguage();
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

    // Fallback per si no existeixen les traduccions encara
    const months = t('reservar.calendar.months') || [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ];
    const weekDays = t('reservar.calendar.weekDays') || ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];

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
        const reservationData = {
            date: selectedDate?.toLocaleDateString('ca-ES'),
            guests,
            experience: selectedExperience,
            ...formData
        };

        console.log('Reservation data:', reservationData);
        alert('Sol·licitud enviada correctament!');
    };

    const calendarDays = generateCalendarDays();

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

                {/* LAYOUT SIMPLE - 2 COLUMNES */}
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
                        <div className="bg-white rounded-xl p-6 shadow-xl mb-6">
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
                                            w-full aspect-square text-sm font-medium rounded-lg transition-all duration-200
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
                                    <div className="w-3 h-3 bg-primary-brown rounded"></div>
                                    <span className="text-primary-gray">Seleccionat</span>
                                </div>
                            </div>
                        </div>

                        {/* Selected date info */}
                        {selectedDate && (
                            <div className="p-4 bg-primary-straw/20 rounded-xl">
                                <p className="font-medium text-primary-dark">
                                    📅 Data seleccionada: {selectedDate.toLocaleDateString('ca-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* COLUMNA DRETA: Experiència + Guests + Form */}
                    <div
                        className={`space-y-6 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        {/* Selector d'experiència - HORITZONTAL */}
                        <div>
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                Tria la teva experiència
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
                                Nombre de persones
                            </h4>
                            <div className="bg-white rounded-xl p-5 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-primary-dark">Convidats</p>
                                        <p className="text-sm text-primary-gray">Màxim: 14</p>
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

                        {/* Formulari compacte */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                                Informació de contacte
                            </h4>

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-primary-dark mb-1">
                                            Nom *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="El teu nom"
                                            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-primary-dark mb-1">
                                            Cognoms *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            placeholder="Els teus cognoms"
                                            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="correu@exemple.com"
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        Telèfon *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+34 XXX XXX XXX"
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-primary-dark mb-1">
                                        Comentaris
                                    </label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleInputChange}
                                        placeholder="Preferències alimentàries, necessitats especials..."
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedDate || !selectedExperience || !formData.name || !formData.email || !formData.phone}
                                    className="w-full bg-primary-brown text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    Enviar sol·licitud
                                </button>

                                <p className="text-center text-xs text-primary-gray">
                                    * Camps obligatoris
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info - Baix de tot */}
                <div
                    className={`grid md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '400ms' }}
                >
                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Phone size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">Truca'ns</h5>
                        <p className="text-primary-gray">+34 XXX XXX XXX</p>
                    </div>

                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Mail size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">Escriu-nos</h5>
                        <p className="text-primary-gray">info@cancarerac.cat</p>
                    </div>

                    <div className="bg-primary-stone/20 rounded-xl p-6 text-center">
                        <Clock size={32} className="text-primary-brown mx-auto mb-3" />
                        <h5 className="font-display font-semibold text-primary-dark mb-2">Horari</h5>
                        <p className="text-primary-gray">Dilluns a Diumenge</p>
                        <p className="text-primary-gray text-sm">10:00 - 20:00</p>
                    </div>
                </div>

                <p className="text-center text-primary-gray text-sm mt-6">
                    Respondrem la teva sol·licitud en menys de 24 hores
                </p>

            </div>
        </section>
    );
};

export default ReservarSection;