import { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/useLanguage.jsx';

// Components
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ArcadesTransition from './components/ArcadesTransition';
import EspaiSection from './components/EspaiSection';
import ExperiencesSection from './components/ExperiencesSection';
import UbicacioSection from './components/UbicacioSection';
import ReservarSection from './components/ReservarSection';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular càrrega inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-primary-white">
        <Header />
        <main>
          <Hero />
          <ArcadesTransition />
          <EspaiSection />
          <ExperiencesSection />
          <UbicacioSection />
          <ReservarSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;