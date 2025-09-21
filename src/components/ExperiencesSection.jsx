import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { Clock, Users } from 'lucide-react';

const ExperiencesSection = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const experiences = [
        {
            id: 'gastronomica',
            title: t('experiencies.gastronomica.title'),
            duration: t('experiencies.gastronomica.duration'),
            activities: t('experiencies.gastronomica.activities'),
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            color: 'from-primary-brown to-primary-dark'
        },
        {
            id: 'cultural',
            title: t('experiencies.cultural.title'),
            duration: t('experiencies.cultural.duration'),
            activities: t('experiencies.cultural.activities'),
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            color: 'from-primary-forest to-primary-brown'
        }
    ];

    return (
        <section id="experiencies" ref={ref} className="py-20 bg-primary-stone">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('experiencies.title')}
                    </h2>
                </div>

                {/* Experience Cards */}
                <div className="space-y-12">
                    {experiences.map((experience, index) => (
                        <div
                            key={experience.id}
                            className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${inView
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 300}ms` }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={experience.image}
                                    alt={experience.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-r ${experience.color} opacity-85`}></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col lg:flex-row min-h-[400px]">

                                {/* Text Content */}
                                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary-white mb-4">
                                        {experience.title}
                                    </h3>

                                    {/* Duration */}
                                    <div className="flex items-center text-primary-straw mb-6">
                                        <Clock size={20} className="mr-2" />
                                        <span className="font-medium">{experience.duration}</span>
                                    </div>

                                    {/* Activities */}
                                    <div className="space-y-3">
                                        {experience.activities.map((activity, actIndex) => (
                                            <div
                                                key={actIndex}
                                                className="flex items-start text-primary-white/90"
                                            >
                                                <span className="text-primary-straw mr-3 mt-1">•</span>
                                                <span className="font-body">{activity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button className="mt-8 self-start bg-primary-straw text-primary-dark px-8 py-3 rounded-full font-medium hover:bg-primary-white transition-colors transform hover:scale-105">
                                        Més informació
                                    </button>
                                </div>

                                {/* Visual Element */}
                                <div className="lg:w-1/3 p-8 lg:p-12 flex items-center justify-center">
                                    <div className="bg-primary-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                                        <Users size={48} className="text-primary-straw mx-auto mb-4" />
                                        <p className="text-primary-white font-medium">
                                            Experiència
                                        </p>
                                        <p className="text-primary-white/80 text-sm">
                                            Personalitzada
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-primary-dark/80 font-body mb-6">
                        Cada experiència s'adapta al vostre grup i preferències
                    </p>
                    <button
                        onClick={() => {
                            const reservarSection = document.getElementById('reservar');
                            if (reservarSection) {
                                reservarSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-primary-brown text-primary-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-colors transform hover:scale-105 shadow-lg"
                    >
                        Reserva la teva experiència
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExperiencesSection;