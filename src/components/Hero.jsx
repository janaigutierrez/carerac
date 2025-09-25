import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Trigger animations after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const scrollToNext = () => {
        const nextSection = document.getElementById('arcades');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">

            {/* Video Background Placeholder */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder per video - de moment imatge de fons */}
                <div
                    className="w-full h-full bg-gradient-to-br from-primary-stone via-primary-straw to-primary-forest bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), 
                      url('/images/gallery/hero.png')`,
                        filter: "brightness(1.2) blur(1px)"
                    }}
                >

                    {/* Future video element */}
                    {/* <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          >
            <source src="/videos/can-carerac-intro.mp4" type="video/mp4" />
          </video> */}
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                {/* Main Title */}
                <h1
                    className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-white mb-6 transition-all duration-1000 transform ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p
                    className={`font-body text-lg sm:text-xl text-primary-white/90 mb-8 max-w-2xl mx-auto transition-all duration-1000 transform delay-300 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    {t('hero.subtitle')}
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => scrollToNext()}
                    className={`inline-flex items-center px-8 py-4 bg-primary-brown text-primary-white font-medium rounded-full hover:bg-primary-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transition-all duration-1000 delay-500 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    {t('hero.cta')}
                </button>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-white/80 transition-all duration-1000 delay-700 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
            >
                <button
                    onClick={scrollToNext}
                    className="flex flex-col items-center space-y-2 hover:text-primary-straw transition-colors group"
                >
                    <span className="text-sm font-body">{t('hero.scroll')}</span>
                    <ChevronDown
                        size={20}
                        className="animate-bounce group-hover:animate-none"
                    />
                </button>
            </div>
        </section>
    );
};

export default Hero;