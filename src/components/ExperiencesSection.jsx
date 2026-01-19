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
            image: '/images/gallery/experiencia-gastronomica.webp',
            color: 'from-primary-brown to-primary-dark'
        },
        {
            id: 'cultural',
            title: t('experiencies.cultural.title'),
            duration: t('experiencies.cultural.duration'),
            activities: t('experiencies.cultural.activities'),
            image: '/images/gallery/experiencia-cultural.webp',
            color: 'from-primary-forest to-primary-brown'
        }
    ];

    return (
        <section id="experiencies" ref={ref} className="py-20 bg-primary-stone">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('experiencies.title')}
                    </h2>
                    <p className={`text-primary-gray font-body text-lg max-w-2xl mx-auto transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`} style={{ transitionDelay: '200ms' }}>
                        {t('experiencies.subtitle')}
                    </p>
                </div>

                {/* Experience Cards - LAYOUT 2 COLUMNES */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {experiences.map((experience, index) => (
                        <div
                            key={experience.id}
                            className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform hover:shadow-3xl hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={experience.image}
                                    alt={experience.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-85`}></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col min-h-[500px] p-8 lg:p-10">

                                {/* Text Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary-white mb-4">
                                            {experience.title}
                                        </h3>

                                        {/* Duration */}
                                        <div className="flex items-center text-primary-straw mb-6">
                                            <Clock size={20} className="mr-2" />
                                            <span className="font-medium">{experience.duration}</span>
                                        </div>

                                        {/* Activities */}
                                        <div className="space-y-3 mb-8">
                                            {experience.activities.map((activity, actIndex) => (
                                                <div
                                                    key={actIndex}
                                                    className="flex items-start text-primary-white/90"
                                                >
                                                    <span className="text-primary-straw mr-3 mt-1 text-xl">•</span>
                                                    <span className="font-body text-base">{activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual Element - Ara a baix */}
                                    <div className="flex items-center justify-between border-t border-primary-white/20 pt-6">
                                        <div className="flex items-center text-primary-white">
                                            <Users size={32} className="text-primary-straw mr-3" />
                                            <div>
                                                <p className="font-medium text-sm">Experiència</p>
                                                <p className="text-primary-white/80 text-xs">Personalitzada</p>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="bg-primary-straw text-primary-dark px-6 py-3 rounded-lg font-medium hover:bg-primary-white transition-all transform hover:scale-105 shadow-lg">
                                            Més info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`} style={{ transitionDelay: '600ms' }}>
                    <p className="text-primary-dark/80 font-body text-lg mb-6">
                        Cada experiència s'adapta al vostre grup i preferències
                    </p>
                    <button
                        onClick={() => {
                            const reservarSection = document.getElementById('reservar');
                            if (reservarSection) {
                                reservarSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-primary-brown text-primary-white px-8 py-4 rounded-lg font-medium hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg"
                    >
                        Reserva la teva experiència
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExperiencesSection;