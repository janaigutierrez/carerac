import { useLanguage } from '../hooks/useLanguage';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const { t, changeLanguage, currentLanguage } = useLanguage();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const languages = [
        { code: 'ca', label: 'Català' },
        { code: 'es', label: 'Español' },
        { code: 'en', label: 'English' }
    ];

    return (
        <footer className="bg-primary-dark text-primary-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Can Carerac */}
                    <div className="lg:col-span-1">
                        <h3 className="font-display text-2xl font-bold mb-4">Can Carerac</h3>
                        <p className="text-primary-white/80 font-body mb-6 leading-relaxed">
                            {t('footer.description')}
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="mailto:info@cancarerac.cat"
                                className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Experiències */}
                    <div>
                        <h4 className="font-display text-lg font-semibold mb-4">Experiències</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection('experiencies')}
                                    className="text-primary-white/80 hover:text-primary-straw transition-colors font-body"
                                >
                                    Experiència Gastronòmica
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('experiencies')}
                                    className="text-primary-white/80 hover:text-primary-straw transition-colors font-body"
                                >
                                    Experiència Cultural
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('espai')}
                                    className="text-primary-white/80 hover:text-primary-straw transition-colors font-body"
                                >
                                    L'Espai
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('ubicacio')}
                                    className="text-primary-white/80 hover:text-primary-straw transition-colors font-body"
                                >
                                    Com Arribar
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Informació */}
                    <div>
                        <h4 className="font-display text-lg font-semibold mb-4">Informació</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body">
                                    Sobre Nosaltres
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body">
                                    Preguntes Freqüents
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body">
                                    Contacte
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contacte */}
                    <div>
                        <h4 className="font-display text-lg font-semibold mb-4">Contacte</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin size={16} className="text-primary-straw mt-1 flex-shrink-0" />
                                <span className="text-primary-white/80 font-body text-sm">
                                    Can Carerac<br />
                                    Catalunya Rural
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={16} className="text-primary-straw flex-shrink-0" />
                                <a href="tel:+34XXXXXXXXX" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body text-sm">
                                    +34 XXX XXX XXX
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={16} className="text-primary-straw flex-shrink-0" />
                                <a href="mailto:info@cancarerac.cat" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body text-sm">
                                    info@cancarerac.cat
                                </a>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className="mt-6">
                            <h5 className="font-medium mb-2 text-sm">Idioma</h5>
                            <div className="flex space-x-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-3 py-1 text-xs rounded-full transition-colors ${currentLanguage === lang.code
                                                ? 'bg-primary-brown text-primary-white'
                                                : 'bg-primary-white/10 text-primary-white/80 hover:bg-primary-white/20'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary-white/10 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-primary-white/60 font-body text-sm">
                                © 2025 Can Carerac. Tots els drets reservats.
                            </p>
                            <p className="text-primary-white/40 font-body text-xs mt-1">
                                {t('footer.copyright')}
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div className="flex space-x-6">
                            <a href="#" className="text-primary-white/60 hover:text-primary-straw transition-colors font-body text-sm">
                                Avís Legal
                            </a>
                            <a href="#" className="text-primary-white/60 hover:text-primary-straw transition-colors font-body text-sm">
                                Privacitat
                            </a>
                            <a href="#" className="text-primary-white/60 hover:text-primary-straw transition-colors font-body text-sm">
                                Cookies
                            </a>
                            <a href="#" className="text-primary-white/60 hover:text-primary-straw transition-colors font-body text-sm">
                                Termes
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;