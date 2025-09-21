import { useState, useEffect, createContext, useContext } from 'react';
import { content } from '../data/content.js';

// Context per compartir idioma globalment
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('ca'); // Català per defecte

    const changeLanguage = (lang) => {
        if (['ca', 'es', 'en'].includes(lang)) {
            setCurrentLanguage(lang);
            // Guardar preferència al localStorage
            localStorage.setItem('carerac-language', lang);
        }
    };

    // Carregar idioma del localStorage si existeix
    useEffect(() => {
        const savedLang = localStorage.getItem('carerac-language');
        if (savedLang && ['ca', 'es', 'en'].includes(savedLang)) {
            setCurrentLanguage(savedLang);
        }
    }, []);

    const t = (key) => {
        const keys = key.split('.');
        let result = content[currentLanguage];

        for (const k of keys) {
            if (result && typeof result === 'object') {
                result = result[k];
            } else {
                return key; // Retorna la key si no troba la traducció
            }
        }

        return result || key;
    };

    return (
        <LanguageContext.Provider value={{
            currentLanguage,
            changeLanguage,
            t,
            content: content[currentLanguage]
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};