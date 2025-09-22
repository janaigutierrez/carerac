// src/App.jsx - ACTUALITZAT amb SEO
import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './hooks/useLanguage.jsx';

// Components
import SEO from './components/SEO';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ArcadesTransition from './components/ArcadesTransition';
import EspaiSection from './components/EspaiSection';
import ExperiencesSection from './components/ExperiencesSection';
import UbicacioSection from './components/UbicacioSection';
import ReservarSection from './components/ReservarSection';
import Footer from './components/Footer';
import TimelineSection from './components/Timeline.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Simular càrrega inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Observer per detectar secció activa (millor SEO)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '0px 0px -40% 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id;
          setCurrentSection(sectionName || 'home');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer totes les seccions
    const sections = ['hero', 'espai', 'experiencies', 'ubicacio', 'reservar'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-primary-white">
          {/* SEO dinàmic segons secció */}
          <SEO section={currentSection} />

          <Header />
          <main>
            <Hero />
            <ArcadesTransition />
            <TimelineSection />
            <EspaiSection />
            <ExperiencesSection />
            <UbicacioSection />
            <ReservarSection />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;