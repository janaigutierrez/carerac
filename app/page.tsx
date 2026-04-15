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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
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
