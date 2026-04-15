import { UtensilsCrossed, Landmark, type LucideIcon } from 'lucide-react'

export type ExperienceId = 'gastronomica' | 'cultural'

export interface ExperienceConfig {
  id: ExperienceId
  icon: LucideIcon
  image: string
  color: string
}

export const EXPERIENCES: ExperienceConfig[] = [
  {
    id: 'gastronomica',
    icon: UtensilsCrossed,
    image: '/images/gallery/experiencia-gastronomica.webp',
    color: 'from-primary-brown to-primary-dark',
  },
  {
    id: 'cultural',
    icon: Landmark,
    image: '/images/gallery/experiencia-cultural.webp',
    color: 'from-primary-forest to-primary-brown',
  },
]
