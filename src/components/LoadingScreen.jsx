import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1.5; // MÉS LENT - durarà ~6.6 segons
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Fade out només al final (últims 10%)
    const opacity = progress > 90 ? (100 - progress) / 10 : 1;

    return (
        <div
            className="fixed inset-0 bg-primary-white z-50 flex flex-col items-center justify-center transition-opacity duration-500"
            style={{ opacity }}
        >

            {/* Logo Container */}
            <div className="relative mb-8">

                {/* Cercle de fons subtil */}
                <div
                    className="absolute inset-0 bg-primary-straw/10 rounded-full blur-xl scale-150 animate-pulse"
                    style={{ animationDuration: '3s' }}
                />

                {/* Logo principal amb fade-in suau */}
                <div
                    className="relative opacity-0"
                    style={{
                        animation: 'fadeIn 0.8s ease-out 0.5s forwards'
                    }}
                >
                    <Logo
                        variant="icon"
                        size="xxl"
                        className="drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Text amb typing animation - Playfair Display */}
            <div
                className="mb-4 opacity-0"
                style={{
                    animation: 'fadeIn 0.8s ease-out 1.2s forwards'
                }}
            >
                <h1
                    className="font-display text-3xl lg:text-4xl font-bold text-primary-dark text-center"
                    style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        width: '0',
                        borderRight: '3px solid #8B6F47',
                        animation: 'typing 2.5s steps(12, end) 1.5s forwards, blink 1s step-end infinite 1.5s'
                    }}
                >
                    Can Carerac
                </h1>
            </div>

            {/* Subtítol amb delay */}
            <p
                className="text-primary-gray font-body text-sm mb-8 opacity-0"
                style={{
                    animation: 'fadeIn 0.8s ease-out 4.5s forwards'
                }}
            >
                Experiències autèntiques
            </p>

            {/* Progress Bar simple però elegant */}
            <div className="w-64 h-1 bg-primary-stone/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary-brown to-primary-terracotta transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Percentage */}
            <span className="text-primary-gray font-body text-xs mt-3 tabular-nums">
                {Math.round(progress)}%
            </span>

            <style>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes typing {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                
                @keyframes blink {
                    0%, 50% { border-color: #8B6F47; }
                    51%, 100% { border-color: transparent; }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;