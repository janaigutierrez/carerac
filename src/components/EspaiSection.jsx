import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

const EspaiSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const spaces = [
        {
            id: 'piscina',
            title: t('espai.spaces.piscina.title'),
            description: t('espai.spaces.piscina.description'),
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: '🏊‍♀️'
        },
        {
            id: 'hort',
            title: t('espai.spaces.hort.title'),
            description: t('espai.spaces.hort.description'),
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: '🌿'
        },
        {
            id: 'cuina',
            title: t('espai.spaces.cuina.title'),
            description: t('espai.spaces.cuina.description'),
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: '👨‍🍳'
        },
        {
            id: 'terrasses',
            title: t('espai.spaces.terrasses.title'),
            description: t('espai.spaces.terrasses.description'),
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: '🏡'
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

    return (
        <section id="espai" ref={ref} className="py-20 bg-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('espai.title')}
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="relative">

                    {/* Cards Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                                width: `${(spaces.length * 100) / 3}%`
                            }}
                        >
                            {spaces.map((space, index) => (
                                <div
                                    key={space.id}
                                    className="w-1/3 px-4"
                                    style={{ width: `${100 / spaces.length}%` }}
                                >
                                    <div
                                        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${inView
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-8'
                                            }`}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={space.image}
                                                alt={space.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                            <div className="absolute top-4 right-4 text-3xl bg-primary-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                                                {space.icon}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="font-display text-xl font-semibold text-primary-dark mb-3">
                                                {space.title}
                                            </h3>
                                            <p className="text-primary-gray font-body text-sm leading-relaxed">
                                                {space.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-primary-brown text-primary-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-primary-brown text-primary-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-10"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center mt-8 space-x-2">
                    {spaces.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-primary-brown scale-125'
                                    : 'bg-primary-gray hover:bg-primary-brown/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EspaiSection;