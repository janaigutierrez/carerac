import { useState, useCallback } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { useCalendarAvailability } from '../../hooks/useCalendarAvailability';
import { AlertCircle, UtensilsCrossed, Landmark } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';

// Booking sub-components
import {
    BookingCalendar,
    ExperienceSelector,
    GuestCounter,
    BookingForm,
    BookingConfirmation,
    ContactCards
} from '../booking';

const ReservarSection = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    // Form state
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

    // Submit state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Calendar availability hook
    const getCalendarErrorMessage = useCallback(() => t('reservar.calendar.error'), [t]);
    const {
        isLoading: calendarLoading,
        error: calendarError,
        isDateOccupied
    } = useCalendarAvailability(getCalendarErrorMessage);

    // Experience options for display
    const experiences = [
        {
            id: 'gastronomica',
            title: t('experiencies.gastronomica.title'),
            icon: UtensilsCrossed
        },
        {
            id: 'cultural',
            title: t('experiencies.cultural.title'),
            icon: Landmark
        }
    ];

    // Form validation
    const isFormValid = selectedDate && selectedExperience && formData.name && formData.email && formData.phone;

    // Handle form input changes
    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!isFormValid) {
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
            } else {
                throw new Error('Error enviant el correu');
            }
        } catch (error) {
            console.error('Error enviant sol·licitud:', error);
            setSubmitError(t('reservar.form.errorMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form for new reservation
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

    // Show confirmation screen after successful submission
    if (submitSuccess) {
        return (
            <BookingConfirmation
                selectedDate={selectedDate}
                guests={guests}
                experienceTitle={experiences.find(e => e.id === selectedExperience)?.title}
                onNewReservation={handleNewReservation}
            />
        );
    }

    // Main booking form
    return (
        <section id="reservar" ref={ref} className="py-20 bg-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${
                            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        {t('reservar.title')}
                    </h2>
                    <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">
                        {t('reservar.subtitle')}
                    </p>
                </div>

                {/* Calendar error alert */}
                {calendarError && (
                    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">{calendarError}</p>
                    </div>
                )}

                {/* Two column layout */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left column: Calendar */}
                    <div
                        className={`transition-all duration-1000 transform ${
                            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}
                    >
                        <BookingCalendar
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            isDateOccupied={isDateOccupied}
                            isLoading={calendarLoading}
                        />
                    </div>

                    {/* Right column: Form controls */}
                    <div
                        className={`space-y-6 transition-all duration-1000 transform ${
                            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <ExperienceSelector
                            selectedExperience={selectedExperience}
                            onSelectExperience={setSelectedExperience}
                        />

                        <GuestCounter
                            guests={guests}
                            onGuestsChange={setGuests}
                        />

                        <BookingForm
                            formData={formData}
                            onInputChange={handleInputChange}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            submitError={submitError}
                            isFormValid={isFormValid}
                        />
                    </div>
                </div>

                {/* Contact info cards */}
                <ContactCards
                    className={`mt-12 transition-all duration-1000 transform ${
                        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                />

            </div>
        </section>
    );
};

export default ReservarSection;
