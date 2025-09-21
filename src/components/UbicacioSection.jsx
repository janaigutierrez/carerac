import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { Car, Bus, MapPin } from 'lucide-react';

const UbicacioSection = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const methods = [
        {
            id: 'cotxe',
            title: t('ubicacio.methods.cotxe.title'),
            description: t('ubicacio.methods.cotxe.description'),
            icon: Car,
            color: 'bg-primary-brown'
        },
        {
            id: 'public',
            title: t('ubicacio.methods.public.title'),
            description: t('ubicacio.methods.public.description'),
            icon: Bus,
            color: 'bg-primary-forest'
        },
        {
            id: 'peu',
            title: t('ubicacio.methods.peu.title'),
            description: t('ubicacio.methods.peu.description'),
            icon: MapPin,
            color: 'bg-primary-terracotta'
        }
    ];

    return (
        <section id="ubicacio" ref={ref} className="py-20 bg-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-16">
                    <h2
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('ubicacio.title')}
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Methods Column */}
                    <div className="space-y-8">
                        {methods.map((method, index) => {
                            const IconComponent = method.icon;
                            return (
                                <div
                                    key={method.id}
                                    className={`flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${inView
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className={`${method.color} p-3 rounded-xl`}>
                                        <IconComponent size={24} className="text-primary-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-xl font-semibold text-primary-dark mb-2">
                                            {method.title}
                                        </h3>
                                        <p className="text-primary-gray font-body leading-relaxed">
                                            {method.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Contact Info */}
                        <div
                            className={`bg-primary-stone/30 rounded-2xl p-6 transition-all duration-1000 transform ${inView
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-8'
                                }`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <h4 className="font-display text-lg font-semibold text-primary-dark mb-3">
                                Informació adicional
                            </h4>
                            <div className="space-y-2 text-primary-gray font-body text-sm">
                                <p>📍 Can Carerac, Catalunya Rural</p>
                                <p>📞 +34 XXX XXX XXX</p>
                                <p>✉️ info@cancarerac.cat</p>
                            </div>
                            <p className="text-primary-dark font-medium mt-4 text-sm">
                                Us ajudem a planificar el vostre viatge
                            </p>
                        </div>
                    </div>

                    {/* Map Column */}
                    <div
                        className={`transition-all duration-1000 transform ${inView
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                            }`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        {/* Google Maps Embed Placeholder */}
                        <div className="bg-primary-stone rounded-2xl overflow-hidden shadow-lg h-96 relative">

                            {/* Placeholder Map */}
                            <div
                                className="w-full h-full bg-cover bg-center relative"
                                style={{
                                    backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
                                }}
                            >
                                <div className="absolute inset-0 bg-primary-dark/40"></div>

                                {/* Map Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-primary-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
                                        <MapPin size={32} className="text-primary-brown mx-auto mb-2" />
                                        <p className="font-display text-lg font-semibold text-primary-dark mb-1">
                                            Can Carerac
                                        </p>
                                        <p className="text-primary-gray text-sm mb-3">
                                            Catalunya Rural
                                        </p>
                                        <button className="bg-primary-brown text-primary-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors">
                                            Obre Google Maps
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Real Google Maps would go here */}
                            {/* 
              <iframe 
                src="https://www.google.com/maps/embed?pb=..."
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> 
              */}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-primary-straw/20 rounded-xl p-4 text-center">
                                <p className="font-display font-semibold text-primary-dark">45 min</p>
                                <p className="text-primary-gray text-sm">des de Barcelona</p>
                            </div>
                            <div className="bg-primary-forest/20 rounded-xl p-4 text-center">
                                <p className="font-display font-semibold text-primary-dark">15 min</p>
                                <p className="text-primary-gray text-sm">des del poble</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UbicacioSection;