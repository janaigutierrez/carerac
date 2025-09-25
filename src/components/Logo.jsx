// src/components/Logo.jsx
const Logo = ({
    variant = 'full', // 'full', 'full-white', 'text', 'icon'
    size = 'md', // 'sm', 'md', 'lg', 'xl'
    className = ''
}) => {

    // Configuració de mides
    const sizeClasses = {
        sm: 'h-8', // 32px
        md: 'h-12', // 48px  
        lg: 'h-16', // 64px
        xl: 'h-24',  // 96px
        xxl: 'h-64'
    };

    // Rutes dels logos amb els teus noms d'arxius
    const logoSources = {
        'full': '/images/logo/logo-full-blank.png', // Logo complet sense fons
        'full-white': '/images/logo/logo-full-white.png', // Logo complet amb fons blanc
        'text': '/images/logo/logo-name-blank.png', // Només nom sense fons
        'icon': '/images/logo/logo-draw-blank.png' // Només dibuix sense fons
    };

    // Textos alternatius
    const altTexts = {
        'full': 'Can Carerac - Logo complet',
        'full-white': 'Can Carerac - Logo complet amb fons blanc',
        'text': 'Can Carerac - Només nom',
        'icon': 'Can Carerac - Dibuix de la masia'
    };

    // Fallback per si no carrega la imatge
    const handleImageError = (e) => {
        console.warn('Error carregant logo:', logoSources[variant]);
        // Fallback a text si falla la imatge
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<span class="font-display font-bold text-primary-dark">Can Carerac</span>';
    };

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src={logoSources[variant]}
                alt={altTexts[variant]}
                className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:scale-105`}
                onError={handleImageError}
                loading="lazy"
            />
        </div>
    );
};

export default Logo;