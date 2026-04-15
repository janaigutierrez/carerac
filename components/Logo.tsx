'use client'

import Image from 'next/image'

const sizeClasses: Record<string, string> = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
  xxl: 'h-64',
}

const logoSources: Record<string, string> = {
  full: '/images/logo/logo-full-blank.png',
  'full-white': '/images/logo/logo-full-white.png',
  text: '/images/logo/logo-name-blank.png',
  icon: '/images/logo/logo-draw-blank.png',
}

const altTexts: Record<string, string> = {
  full: 'Can Carerac - Logo complet',
  'full-white': 'Can Carerac - Logo complet amb fons blanc',
  text: 'Can Carerac - Nomes nom',
  icon: 'Can Carerac - Dibuix de la masia',
}

const sizePixels: Record<string, { width: number; height: number }> = {
  sm: { width: 64, height: 32 },
  md: { width: 96, height: 48 },
  lg: { width: 128, height: 64 },
  xl: { width: 192, height: 96 },
  xxl: { width: 512, height: 256 },
}

interface LogoProps {
  variant?: 'full' | 'full-white' | 'text' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
}

export default function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const dims = sizePixels[size]

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoSources[variant]}
        alt={altTexts[variant]}
        width={dims.width}
        height={dims.height}
        className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:scale-105`}
        priority={size === 'xxl'}
      />
    </div>
  )
}
