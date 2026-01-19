import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { Car, Bus, MapPin, Clock, Navigation } from 'lucide-react';

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
                        className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {t('ubicacio.title')}
                    </h2>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid lg:grid-cols-3 lg:grid-rows-3 gap-6 h-auto lg:h-[600px]">

                    {/* MAPA - Ocupa 2 files a l'esquerra */}
                    <div
                        className={`lg:col-span-2 lg:row-span-3 rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.814534535869!2d2.1678571202916674!3d41.646830840736236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4c192355ca465%3A0x85bd218eede89ae!2sTorre%20de%20Carerac!5e0!3m2!1ses!2ses!4v1768860090487!5m2!1ses!2ses"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Can Carerac"
                        ></iframe>
                    </div>

                    {/* MÈTODES DE TRANSPORT - Cards a la dreta */}
                    {methods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                            <div
                                key={method.id}
                                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                                    }`}
                                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`${method.color} p-3 rounded-lg flex-shrink-0`}>
                                        <IconComponent size={24} className="text-primary-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display text-lg font-semibold text-primary-dark mb-2">
                                            {method.title}
                                        </h3>
                                        <p className="text-primary-gray font-body text-sm leading-relaxed">
                                            {method.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* INFORMACIÓ EXTRA - Fora del grid per no allargar */}
                <div className="grid lg:grid-cols-3 gap-6 mt-6">

                    {/* Temps de viatge */}
                    <div
                        className={`bg-gradient-to-br from-primary-straw/20 to-primary-straw/10 rounded-xl p-6 text-center transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <Clock size={32} className="text-primary-brown mx-auto mb-3" />
                        <p className="font-display text-2xl font-semibold text-primary-dark">45 min</p>
                        <p className="text-primary-gray text-sm">des de Barcelona</p>
                    </div>

                    <div
                        className={`bg-gradient-to-br from-primary-forest/20 to-primary-forest/10 rounded-xl p-6 text-center transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        <Navigation size={32} className="text-primary-forest mx-auto mb-3" />
                        <p className="font-display text-2xl font-semibold text-primary-dark">15 min</p>
                        <p className="text-primary-gray text-sm">des del poble</p>
                    </div>

                    {/* Contact Info */}
                    <div
                        className={`bg-primary-stone/30 rounded-xl p-6 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: '900ms' }}
                    >
                        <h4 className="font-display text-lg font-semibold text-primary-dark mb-3">
                            Informació adicional
                        </h4>
                        <div className="space-y-2 text-primary-gray font-body text-sm">
                            <p>📍 Torre de Carerac</p>
                            <p>📞 +34 XXX XXX XXX</p>
                            <p>✉️ info@cancarerac.cat</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default UbicacioSection;