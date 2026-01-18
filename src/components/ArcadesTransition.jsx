// src/components/ArcadesTransition.jsx
import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const ArcadesTransition = () => {
    const [scrollY, setScrollY] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parallax offset (la imatge es mou més lent)
    const parallaxOffset = scrollY * 0.3;

    return (
        <section
            id="arcades"
            className="relative h-screen overflow-hidden"
        >
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
                {/* Overlay subtil per contrast */}
                <div className="absolute inset-0 bg-black/10"></div>
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
                            {/* Fons blanc (visible) */}
                            <rect x="0" y="0" width="100" height="100" fill="white" />

                            {/* Arc esquerre - negre (transparent) */}
                            <ellipse
                                cx="16.66"
                                cy="100"
                                rx="14"
                                ry="25"
                                fill="black"
                            />

                            {/* Arc central - negre (transparent) */}
                            <ellipse
                                cx="50"
                                cy="100"
                                rx="14"
                                ry="25"
                                fill="black"
                            />

                            {/* Arc dret - negre (transparent) */}
                            <ellipse
                                cx="83.33"
                                cy="100"
                                rx="14"
                                ry="25"
                                fill="black"
                            />
                        </mask>
                    </defs>

                    {/* Rectangle amb la mask aplicada */}
                    <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill="#5D4E37"
                        mask="url(#arcades-mask)"
                    />
                </svg>
            </div>

            {/* Text overlay centrat (opcional - pots eliminar si no el vols) */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="text-center text-primary-white px-4">
                    <p className="text-sm font-body tracking-wider uppercase mb-4 text-primary-straw">
                        {t('arcades.title')}
                    </p>
                    <h2 className="font-display text-3xl lg:text-5xl font-light leading-tight">
                        {t('arcades.subtitle')}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default ArcadesTransition;