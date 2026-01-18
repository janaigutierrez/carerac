import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

const EspaiSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    // Parallax per la imatge de fons
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxOffset = scrollY * 0.3;

    const spaces = [
        {
            id: 'hort',
            title: t('espai.spaces.hort.title'),
            description: t('espai.spaces.hort.description'),
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 'piscina',
            title: t('espai.spaces.piscina.title'),
            description: t('espai.spaces.piscina.description'),
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 'cuina',
            title: t('espai.spaces.cuina.title'),
            description: t('espai.spaces.cuina.description'),
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 'figuera',
            title: t('espai.spaces.figuera.title'),
            description: t('espai.spaces.figuera.description'),
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % spaces.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + spaces.length) % spaces.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const getVisibleCards = () => {
        const totalCards = spaces.length;
        const cards = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentSlide + i + totalCards) % totalCards;
            cards.push({
                ...spaces[index],
                position: i,
                index
            });
        }
        return cards;
    };

    const visibleCards = getVisibleCards();

    return (
        <section
            id="espai"
            ref={ref}
            className="relative overflow-hidden"
            style={{
                background: `linear-gradient(rgba(250, 250, 247, 0.85), rgba(250, 250, 247, 0.95)), url('/images/gallery/espais.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed' // Opcional: efecte parallax subtil
            }}
        >
            {/* ========================================
                ARCADES TRANSITION - HEADER DECORATIU
            ======================================== */}
            <div className="relative h-screen overflow-hidden">
                {/* Imatge de fons amb parallax */}
                <div
                    className="absolute inset-0 w-full h-[120%]"
                    style={{
                        transform: `translateY(${parallaxOffset}px)`,
                        backgroundImage: `url('https://images.unsplash.com/photo-1566479179817-5c3a8e494f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0"></div>
                </div>

                {/* Arcades estàtiques amb SVG mask */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <mask id="arcades-mask">
                                <rect x="0" y="0" width="100" height="100" fill="white" />
                                <ellipse cx="16.66" cy="100" rx="14" ry="25" fill="black" />
                                <ellipse cx="50" cy="100" rx="14" ry="25" fill="black" />
                                <ellipse cx="83.33" cy="100" rx="14" ry="25" fill="black" />
                            </mask>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="#FAFAF7" mask="url(#arcades-mask)" />
                    </svg>
                </div>

                {/* Text overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-primary-dark px-4">
                        <p className="text-sm font-body tracking-wider uppercase mb-4 text-primary-brown">
                            {t('arcades.title')}
                        </p>
                        <h2 className="font-display text-3xl lg:text-5xl font-light leading-tight">
                            {t('arcades.subtitle')}
                        </h2>
                    </div>
                </div>
            </div>

            {/* ========================================
                CONTINGUT D'ESPAI (CAROUSEL)
            ======================================== */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <div className="text-center mb-16">
                        <h2
                            className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            {t('espai.title')}
                        </h2>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative">
                        {/* Cards Container */}
                        <div className="flex items-center justify-center min-h-[500px] relative">
                            {visibleCards.map((space, index) => {
                                const { position } = space;
                                const isCenter = position === 0;
                                const isLeft = position === -1;
                                const isRight = position === 1;

                                let transform = 'translateX(0px) scale(1)';
                                let opacity = 1;
                                let zIndex = 10;

                                if (isLeft) {
                                    transform = 'translateX(-120px) scale(0.8)';
                                    opacity = 0.4;
                                    zIndex = 5;
                                } else if (isRight) {
                                    transform = 'translateX(120px) scale(0.8)';
                                    opacity = 0.4;
                                    zIndex = 5;
                                } else {
                                    zIndex = 20;
                                }

                                return (
                                    <div
                                        key={`${space.id}-${index}`}
                                        className={`absolute w-80 transition-all duration-500 ease-out cursor-pointer ${!isCenter ? 'pointer-events-none' : ''
                                            }`}
                                        style={{ transform, opacity, zIndex }}
                                    >
                                        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={space.image}
                                                    alt={space.title}
                                                    className={`w-full h-full object-cover transition-all duration-500 ${isCenter ? 'scale-100' : 'scale-110 blur-sm'
                                                        }`}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="font-display text-xl font-semibold text-primary-dark mb-3">
                                                    {space.title}
                                                </h3>
                                                <p className={`text-primary-gray font-body text-sm leading-relaxed transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-60'
                                                    }`}>
                                                    {space.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-white/80 backdrop-blur-sm text-primary-dark p-3 rounded-full shadow-lg hover:bg-primary-white hover:scale-105 transition-all duration-300 z-30"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-white/80 backdrop-blur-sm text-primary-dark p-3 rounded-full shadow-lg hover:bg-primary-white hover:scale-105 transition-all duration-300 z-30"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center mt-12 space-x-3">
                        {spaces.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 ${currentSlide === index
                                    ? 'w-8 h-3 bg-primary-brown rounded-full'
                                    : 'w-3 h-3 bg-primary-gray/40 rounded-full hover:bg-primary-brown/50'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Bottom Info */}
                    <div
                        className={`text-center mt-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <p className="text-primary-gray font-body max-w-2xl mx-auto">
                            {t('espai.subtitle')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EspaiSection;