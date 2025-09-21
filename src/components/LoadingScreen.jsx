import { useEffect, useState } from 'react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-primary-white z-50 flex flex-col items-center justify-center">
            {/* Logo Container */}
            <div className="relative mb-8">
                {/* Logo Principal - placeholder mentre no tenim el logo real */}
                <div className="w-24 h-24 bg-primary-brown rounded-full flex items-center justify-center logo-spin">
                    <span className="text-primary-white font-display text-2xl font-bold">CC</span>
                </div>

                {/* Efecte de circumferència */}
                <div className="absolute inset-0 border-2 border-primary-straw rounded-full animate-ping opacity-30"></div>
            </div>

            {/* Nom de la marca */}
            <h1 className="font-display text-3xl text-primary-dark mb-4 animate-fade-in">
                Can Carerac
            </h1>

            {/* Subtitle */}
            <p className="text-primary-gray font-body text-sm mb-8 animate-fade-in animate-stagger-2">
                Experiències autèntiques
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-primary-stone rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary-brown transition-all duration-100 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Percentage */}
            <span className="text-primary-gray font-body text-xs mt-2">
                {progress}%
            </span>
        </div>
    );
};

export default LoadingScreen;