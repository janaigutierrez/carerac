// src/components/AnimatedLogoSVG.jsx
import { useState, useEffect } from 'react';

const AnimatedLogoSVG = ({ onComplete, size = "xl" }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-40 h-40'
    };

    useEffect(() => {
        // Iniciar animació després de 500ms
        const startTimer = setTimeout(() => {
            setIsAnimating(true);
        }, 500);

        // Callback quan acaba (3.5s animació + 0.5s delay)
        const completeTimer = setTimeout(() => {
            onComplete && onComplete();
        }, 4000);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`${sizeClasses[size]} flex items-center justify-center`}>
            <svg
                viewBox="0 0 1440 1440"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                }}
            >
                <defs>
                    {/* Gradient per fer-ho més elegant */}
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8B6F47', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#B85450', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#4A5D23', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                {/* AQUÍ HAS DE POSAR EL CONTINGUT DEL TEU SVG */}
                {/* Substitueix aquesta part pel codi del teu fitxer, però canvia: */}
                {/* style="fill:#000000" per style="fill:none;stroke:url(#logoGradient);stroke-width:3" */}

                <g id="g1" className={isAnimating ? 'logo-animated' : 'logo-static'}>
                    {/* EXEMPLE - substituir per el teu codi real: */}
                    <path
                        style={{
                            fill: isAnimating ? 'none' : 'url(#logoGradient)',
                            stroke: isAnimating ? 'url(#logoGradient)' : 'none',
                            strokeWidth: isAnimating ? '2' : '0',
                            transition: 'all 0.5s ease-in-out'
                        }}
                        d="m 720,200 200,300 -400,0 z"
                        className={isAnimating ? 'draw-path' : ''}
                    />
                    {/* Afegir més paths aquí del teu SVG */}
                </g>
            </svg>

            {/* CSS per l'animació */}
            <style jsx>{`
                .draw-path {
                    stroke-dasharray: 2000;
                    stroke-dashoffset: 2000;
                    animation: drawPath 3s ease-in-out forwards;
                }
                
                @keyframes drawPath {
                    0% {
                        stroke-dashoffset: 2000;
                        fill-opacity: 0;
                    }
                    70% {
                        stroke-dashoffset: 0;
                        fill-opacity: 0;
                    }
                    100% {
                        stroke-dashoffset: 0;
                        fill-opacity: 1;
                        fill: url(#logoGradient);
                        stroke: none;
                    }
                }
                
                .logo-animated path {
                    opacity: 1;
                }
                
                .logo-static path {
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 3.5s;
                }
                
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AnimatedLogoSVG;