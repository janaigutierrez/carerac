import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

const TimelineSection = () => {
    const { t } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Timeline events - ara venen de content.js
    const timelineData = t('timeline.events');
    const timelineEvents = timelineData.map((event, index) => ({
        id: index + 1,
        year: event.year,
        title: event.title,
        description: event.description,
        image: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566479179817-5c3a8e494f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ][index],
        side: index % 2 === 0 ? 'left' : 'right',
        isPresent: index === timelineData.length - 1
    }));

    // Calcular scroll progress dins de la secció
    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const sectionRect = ref.current.getBoundingClientRect();
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Calcular quin percentatge de la secció està visible
            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            if (sectionBottom < 0 || sectionTop > windowHeight) {
                // Secció no visible
                return;
            }

            // Calcular progress (0 a 1)
            const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
            const progress = Math.min(1, Math.max(0, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Inicial

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref]);

    // Per debugging, fem tots els events visibles inicialment
    const visibleEventsCount = timelineEvents.length; // Mostra tots els events sempre

    // DEBUG - pots veure els valors aquí
    console.log('Scroll Progress:', scrollProgress, 'Visible Events:', visibleEventsCount);
    const lineHeight = scrollProgress * 100;

    return (
        <section id="timeline" ref={ref} className="relative py-20 bg-gradient-to-b from-primary-white to-primary-stone/30 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-20">
                    <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
                        {t('timeline.title')}
                    </h2>
                    <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">
                        {t('timeline.subtitle')}
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Vertical Line (Trunk) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-gray/20 z-0" style={{ height: '100%' }}>
                        {/* Growing Line (Progress) */}
                        <div
                            className="w-full bg-gradient-to-b from-primary-brown to-primary-forest transition-all duration-300 ease-out relative"
                            style={{ height: `${Math.min(lineHeight, 100)}%` }}
                        >
                            {/* Animated Tip */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-forest rounded-full animate-pulse shadow-lg" />
                        </div>
                    </div>

                    {/* Timeline Events */}
                    <div className="relative z-20 space-y-24">
                        {timelineEvents.map((event, index) => {
                            const isVisible = true; // FORÇEM que sigui visible per testing
                            const isLeft = event.side === 'left';

                            return (
                                <div
                                    key={event.id}
                                    className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    {/* Branch Line */}
                                    <div
                                        className={`absolute top-1/2 w-16 h-0.5 z-10 bg-gradient-to-${isLeft ? 'l' : 'r'} from-primary-brown to-transparent transition-all duration-1000 transform origin-${isLeft ? 'right' : 'left'} ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                            }`}
                                        style={{
                                            [isLeft ? 'right' : 'left']: '50%',
                                            transitionDelay: `${index * 200}ms`
                                        }}
                                    />

                                    {/* Year Badge (Center) */}
                                    <div
                                        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 200 + 300}ms` }}
                                    >
                                        <div className={`px-4 py-2 rounded-full text-sm font-bold text-primary-white shadow-lg ${event.isPresent ? 'bg-primary-terracotta animate-pulse' : 'bg-primary-brown'
                                            }`}>
                                            {event.year}
                                        </div>
                                    </div>

                                    {/* Event Card */}
                                    <div
                                        className={`w-80 z-20 ${isLeft ? 'mr-20' : 'ml-20'} transition-all duration-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                                    >
                                        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${event.isPresent ? 'ring-2 ring-primary-terracotta ring-opacity-50' : ''
                                            }`}>

                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />

                                                {/* Present indicator */}
                                                {event.isPresent && (
                                                    <div className="absolute top-4 right-4 bg-primary-terracotta text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                                        AVUI
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="font-display text-xl font-semibold text-primary-dark mb-3">
                                                    {event.title}
                                                </h3>
                                                <p className="text-primary-gray font-body text-sm leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
                        {/* Eliminat les fulles per ara */}
                    </div>

                </div>

                {/* Bottom Call to Action */}
                <div className={`text-center mt-20 transition-all duration-1000 ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <p className="text-primary-dark font-body text-lg mb-6">
                        {t('timeline.finalText')}
                    </p>
                    <button
                        onClick={() => {
                            const experiencesSection = document.getElementById('experiencies');
                            if (experiencesSection) {
                                experiencesSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-primary-brown text-primary-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors transform hover:scale-105"
                    >
                        {t('timeline.cta')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;