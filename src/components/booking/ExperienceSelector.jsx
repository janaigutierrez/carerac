import { UtensilsCrossed, Landmark } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const ExperienceSelector = ({ selectedExperience, onSelectExperience }) => {
    const { t } = useLanguage();

    const experiences = [
        {
            id: 'gastronomica',
            title: t('experiencies.gastronomica.title'),
            icon: UtensilsCrossed,
            color: 'from-primary-brown to-primary-dark'
        },
        {
            id: 'cultural',
            title: t('experiencies.cultural.title'),
            icon: Landmark,
            color: 'from-primary-forest to-primary-brown'
        }
    ];

    return (
        <div>
            <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
                {t('reservar.experienceSelector.title')}
            </h4>
            <div className="grid grid-cols-2 gap-3">
                {experiences.map((exp) => {
                    const IconComponent = exp.icon;
                    return (
                        <button
                            key={exp.id}
                            onClick={() => onSelectExperience(exp.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                                selectedExperience === exp.id
                                    ? 'border-primary-brown bg-primary-brown/10 shadow-lg scale-105'
                                    : 'border-primary-gray/20 bg-white hover:border-primary-brown/50 hover:shadow-md'
                            }`}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${exp.color}`}>
                                    <IconComponent size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-display font-semibold text-primary-dark text-sm leading-tight">
                                        {exp.title}
                                    </p>
                                    {selectedExperience === exp.id && (
                                        <p className="text-xs text-primary-brown mt-1">✓</p>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperienceSelector;
