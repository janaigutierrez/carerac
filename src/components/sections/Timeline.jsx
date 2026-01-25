import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';

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
            "/images/gallery/timeline-fundacio.webp",
            "/images/gallery/timeline-primers-anys.webp",
            "/images/gallery/timeline-renovacio.webp",
            "/images/gallery/timeline-obertura.webp",
            "/images/gallery/timeline-expansio.webp",
            "/images/gallery/timeline-actualitat.webp"
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

            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            if (sectionBottom < 0 || sectionTop > windowHeight) {
                return;
            }

            const progress = Math.min(1, Math.max(0, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref]);

    const visibleEventsCount = timelineEvents.length;
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

                    {/* Central Vertical Line (Trunk) - MILLORADA */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-brown/30 z-0" style={{ height: '100%' }}>
                        {/* Growing Line (Progress) - MÉS VISIBLE */}
                        <div
                            className="w-full bg-gradient-to-b from-primary-brown via-primary-forest to-primary-terracotta transition-all duration-300 ease-out relative shadow-md"
                            style={{ height: `${Math.min(lineHeight, 100)}%` }}
                        >
                            {/* Animated Tip - MÉS GRAN */}
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-terracotta rounded-full animate-pulse shadow-xl border-4 border-white" />
                        </div>
                    </div>

                    {/* Timeline Events */}
                    <div className="relative z-20 space-y-32">
                        {timelineEvents.map((event, index) => {
                            const isVisible = true;
                            const isLeft = event.side === 'left';

                            return (
                                <div
                                    key={event.id}
                                    className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    {/* Branch Line */}
                                    <div
                                        className={`absolute top-1/2 w-20 h-1 z-10 transition-all duration-1000 transform origin-${isLeft ? 'right' : 'left'} ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                            }`}
                                        style={{
                                            [isLeft ? 'right' : 'left']: '50%',
                                            transitionDelay: `${index * 200}ms`,
                                            background: isLeft
                                                ? 'linear-gradient(to left, #8B6F47, rgba(139, 111, 71, 0.3))'
                                                : 'linear-gradient(to right, #8B6F47, rgba(139, 111, 71, 0.3))'
                                        }}
                                    />

                                    {/* Year Badge (Center) */}
                                    <div
                                        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 200 + 300}ms` }}
                                    >
                                        {/* Outer ring per fer-lo més visible */}
                                        <div className={`absolute inset-0 rounded-full ${event.isPresent ? 'bg-primary-terracotta' : 'bg-primary-brown'
                                            } opacity-20 scale-150`} />

                                        {/* Badge principal */}
                                        <div className={`relative px-5 py-2.5 rounded-full text-base font-bold text-primary-white shadow-2xl border-4 border-white ${event.isPresent ? 'bg-primary-terracotta animate-pulse' : 'bg-primary-brown'
                                            }`}>
                                            {event.year}
                                        </div>
                                    </div>

                                    {/* Event Card */}
                                    <div
                                        className={`max-w-md w-full z-20 ${isLeft ? 'mr-24' : 'ml-24'} transition-all duration-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                                    >
                                        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${event.isPresent ? 'ring-4 ring-primary-terracotta ring-opacity-50' : ''
                                            }`}>

                                            {/* Image */}
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />

                                                {/* Present indicator */}
                                                {event.isPresent && (
                                                    <div className="absolute top-4 right-4 bg-primary-terracotta text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                                                        AVUI
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-7">
                                                <h3 className="font-display text-2xl font-semibold text-primary-dark mb-3">
                                                    {event.title}
                                                </h3>
                                                <p className="text-primary-gray font-body text-base leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Bottom Call to Action */}
                <div className={`text-center mt-24 transition-all duration-1000 ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                        className="bg-primary-brown text-primary-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors transform hover:scale-105 shadow-lg"
                    >
                        {t('timeline.cta')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;