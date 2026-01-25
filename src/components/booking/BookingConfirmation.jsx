import { CheckCircle, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../../hooks/useLanguage';

const BookingConfirmation = ({
    selectedDate,
    guests,
    experienceTitle,
    onNewReservation
}) => {
    const { t } = useLanguage();

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
                                ✨ <strong>{t('reservar.confirmation.summary.experience')}</strong> {experienceTitle}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={onNewReservation}
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
};

export default BookingConfirmation;
