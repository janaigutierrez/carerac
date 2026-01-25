import { Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const ContactCards = ({ className = '' }) => {
    const { t } = useLanguage();

    const cards = [
        {
            icon: Phone,
            title: t('reservar.contact.call'),
            content: '+34 XXX XXX XXX'
        },
        {
            icon: Mail,
            title: t('reservar.contact.email'),
            content: 'info@cancarerac.cat'
        },
        {
            icon: Clock,
            title: t('reservar.contact.schedule'),
            content: t('reservar.contact.scheduleDays'),
            subContent: t('reservar.contact.scheduleHours')
        }
    ];

    return (
        <div className={className}>
            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card, index) => {
                    const IconComponent = card.icon;
                    return (
                        <div key={index} className="bg-primary-stone/20 rounded-xl p-6 text-center">
                            <IconComponent size={32} className="text-primary-brown mx-auto mb-3" />
                            <h5 className="font-display font-semibold text-primary-dark mb-2">
                                {card.title}
                            </h5>
                            <p className="text-primary-gray">{card.content}</p>
                            {card.subContent && (
                                <p className="text-primary-gray text-sm">{card.subContent}</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-center text-primary-gray text-sm mt-6">
                {t('reservar.contact.response')}
            </p>
        </div>
    );
};

export default ContactCards;
