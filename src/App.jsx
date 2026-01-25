import { useState, useEffect } from 'react';
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { LanguageProvider } from './hooks/useLanguage.jsx';

// Components
import SEO from './components/SEO';
import LoadingScreen from './components/LoadingScreen';
import { Header, Footer } from './components/layout';
import {
  Hero,
  EspaiSection,
  TimelineSection,
  ExperiencesSection,
  UbicacioSection,
  ReservarSection
} from './components/sections';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Simular càrrega inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

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
          <SEO section={currentSection} />

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
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;