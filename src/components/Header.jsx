import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentLanguage, changeLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const languages = [
        { code: 'ca', label: 'CAT' },
        { code: 'es', label: 'ES' },
        { code: 'en', label: 'EN' }
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all-smooth ${isScrolled
                ? 'bg-primary-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="font-display text-xl lg:text-2xl font-bold text-primary-dark hover:text-primary-brown transition-colors"
                        >
                            Can Carerac
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-8">
                        <button
                            onClick={() => scrollToSection('espai')}
                            className="text-primary-dark hover:text-primary-brown transition-colors font-medium"
                        >
                            {t('nav.espai')}
                        </button>
                        <button
                            onClick={() => scrollToSection('experiencies')}
                            className="text-primary-dark hover:text-primary-brown transition-colors font-medium"
                        >
                            {t('nav.experiencies')}
                        </button>
                        <button
                            onClick={() => scrollToSection('ubicacio')}
                            className="text-primary-dark hover:text-primary-brown transition-colors font-medium"
                        >
                            {t('nav.ubicacio')}
                        </button>
                        <button
                            onClick={() => scrollToSection('reservar')}
                            className="bg-primary-brown text-primary-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium"
                        >
                            {t('nav.reservar')}
                        </button>
                    </nav>

                    {/* Language Switcher & Mobile Menu */}
                    <div className="flex items-center space-x-4">

                        {/* Language Buttons */}
                        <div className="hidden sm:flex space-x-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${currentLanguage === lang.code
                                        ? 'bg-primary-brown text-primary-white'
                                        : 'text-primary-gray hover:text-primary-dark'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-primary-dark hover:text-primary-brown transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-primary-white/95 backdrop-blur-md border-t border-primary-stone">
                        <div className="px-4 py-6 space-y-4">

                            {/* Mobile Navigation */}
                            <button
                                onClick={() => scrollToSection('espai')}
                                className="block w-full text-left text-primary-dark hover:text-primary-brown transition-colors font-medium py-2"
                            >
                                {t('nav.espai')}
                            </button>
                            <button
                                onClick={() => scrollToSection('experiencies')}
                                className="block w-full text-left text-primary-dark hover:text-primary-brown transition-colors font-medium py-2"
                            >
                                {t('nav.experiencies')}
                            </button>
                            <button
                                onClick={() => scrollToSection('ubicacio')}
                                className="block w-full text-left text-primary-dark hover:text-primary-brown transition-colors font-medium py-2"
                            >
                                {t('nav.ubicacio')}
                            </button>
                            <button
                                onClick={() => scrollToSection('reservar')}
                                className="block w-full text-left bg-primary-brown text-primary-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium mt-4"
                            >
                                {t('nav.reservar')}
                            </button>

                            {/* Mobile Language Switcher */}
                            <div className="flex space-x-2 pt-4 border-t border-primary-stone">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${currentLanguage === lang.code
                                            ? 'bg-primary-brown text-primary-white'
                                            : 'text-primary-gray hover:text-primary-dark'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;