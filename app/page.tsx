'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import EspaiSection from '@/components/sections/EspaiSection'
import TimelineSection from '@/components/sections/Timeline'
import ExperiencesSection from '@/components/sections/ExperiencesSection'
import UbicacioSection from '@/components/sections/UbicacioSection'
import ReservarSection from '@/components/sections/ReservarSection'

const LOADED_FLAG = 'carerac-loaded'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (sessionStorage.getItem(LOADED_FLAG)) {
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem(LOADED_FLAG, '1')
    setIsLoading(false)
  }

  if (!mounted) return null

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-primary-white">
      <Header />
      <main>
        <Hero />
        <EspaiSection />
        <TimelineSection />
        <ExperiencesSection />
        <UbicacioSection />
        <ReservarSection />
      </main>
      <Footer />
    </div>
  )
}
