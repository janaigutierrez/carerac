/**
 * Reusable section header component with title and subtitle
 * Used across multiple sections for consistent styling
 */
const SectionHeader = ({
    title,
    subtitle,
    inView = true,
    className = '',
    titleClassName = '',
    subtitleClassName = ''
}) => {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <h2
                className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${titleClassName}`}
            >
                {title}
            </h2>
            {subtitle && (
                <p className={`text-primary-gray font-body text-lg max-w-2xl mx-auto ${subtitleClassName}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
