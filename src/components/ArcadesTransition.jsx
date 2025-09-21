import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../hooks/useLanguage';

const ArcadesTransition = () => {
    const [scrollY, setScrollY] = useState(0);
    const { t } = useLanguage();

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false, // Sempre actiu per l'effecte parallax
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calcular el parallax offset basat en la posició de scroll
    const parallaxOffset = scrollY * 0.3;

    return (
        <section
            id="arcades"
            ref={ref}
            className="relative h-screen overflow-hidden bg-primary-dark"
        >

            {/* Imatge de fons amb parallax */}
            <div
                className="absolute inset-0 w-full h-[120%]"
                style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    backgroundImage: `url('https://images.unsplash.com/photo-1566479179817-5c3a8e494f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                {/* Overlay fosc per crear contrast */}
                <div className="absolute inset-0 bg-primary-dark/40"></div>
            </div>

            {/* Arcades (primer pla) */}
            <div className="absolute inset-0 z-10">
                <div className="h-full flex items-end">

                    {/* Arc esquerre */}
                    <div
                        className="flex-1 h-3/4 bg-primary-dark"
                        style={{
                            clipPath: 'ellipse(100% 100% at 100% 100%)',
                            borderTopRightRadius: '100% 50%'
                        }}
                    ></div>

                    {/* Arc central */}
                    <div
                        className="flex-1 h-4/5 bg-primary-dark relative"
                        style={{
                            clipPath: 'ellipse(100% 100% at 50% 100%)',
                            borderTopLeftRadius: '50% 100%',
                            borderTopRightRadius: '50% 100%'
                        }}
                    ></div>

                    {/* Arc dret */}
                    <div
                        className="flex-1 h-3/4 bg-primary-dark"
                        style={{
                            clipPath: 'ellipse(100% 100% at 0% 100%)',
                            borderTopLeftRadius: '100% 50%'
                        }}
                    ></div>

                </div>
            </div>

            {/* Text overlay centrat */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-primary-white px-4">
                    <div className="w-16 h-16 mx-auto mb-6 border-2 border-primary-straw rounded-lg flex items-center justify-center">
                        {/* Icona decorativa - placeholder */}
                        <div className="w-8 h-8 bg-primary-straw rounded"></div>
                    </div>
                    {/* Main title */}
                    <p className="text-sm font-body tracking-wider uppercase mb-4 text-primary-straw">
                        {t('arcades.title')}
                    </p>
                    {/* Subtitle */}
                    <h2 className="font-display text-3xl lg:text-5xl font-light leading-tight">
                        {t('arcades.subtitle')}

                    </h2>
                </div>
            </div>
        </section>
    );
};

export default ArcadesTransition;