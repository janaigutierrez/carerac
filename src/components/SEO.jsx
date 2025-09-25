// src/components/SEO.jsx
import { Helmet } from "@dr.pogodin/react-helmet";
import { useLanguage } from '../hooks/useLanguage';

const SEO = ({
    title,
    description,
    image,
    url,
    type = "website",
    section = "home"
}) => {
    const { currentLanguage } = useLanguage();

    // SEO data per cada secció
    const seoData = {
        ca: {
            home: {
                title: "Can Carerac - Experiències Autèntiques a Catalunya Rural",
                description: "Descobreix Can Carerac, una masia històrica catalana on viure experiències gastronòmiques i culturals úniques. Forn de llenya, hort ecològic i tradicions autèntiques.",
                keywords: "masia catalunya, experiències gastronòmiques, turisme rural catalunya, forn llenya, hort ecològic, tradicions catalanes"
            },
            espai: {
                title: "L'Espai - Can Carerac | Masia Històrica Catalana",
                description: "Explora els espais únics de Can Carerac: piscina natural, hort ecològic, cuina tradicional amb forn de llenya i terrasses amb vistes panoràmiques.",
                keywords: "masia restaurada, piscina natural, hort ecològic, forn llenya tradicional, terrasses panoràmiques"
            },
            experiencies: {
                title: "Experiències Gastronòmiques - Can Carerac | Tradició Catalana",
                description: "Experiències gastronòmiques autèntiques: elaboració de pa tradicional, forn de llenya, productes locals i tallers culturals personalitzats.",
                keywords: "experiències gastronòmiques, pa tradicional, forn llenya, productes locals, tallers culturals"
            }
        },
        es: {
            home: {
                title: "Can Carerac - Experiencias Auténticas en Cataluña Rural",
                description: "Descubre Can Carerac, una masía histórica catalana donde vivir experiencias gastronómicas y culturales únicas. Horno de leña, huerto ecológico y tradiciones auténticas.",
                keywords: "masía cataluña, experiencias gastronómicas, turismo rural cataluña, horno leña, huerto ecológico, tradiciones catalanas"
            },
            espai: {
                title: "El Espacio - Can Carerac | Masía Histórica Catalana",
                description: "Explora los espacios únicos de Can Carerac: piscina natural, huerto ecológico, cocina tradicional con horno de leña y terrazas panorámicas.",
                keywords: "masía restaurada, piscina natural, huerto ecológico, horno leña tradicional, terrazas panorámicas"
            },
            experiencies: {
                title: "Experiencias Gastronómicas - Can Carerac | Tradición Catalana",
                description: "Experiencias gastronómicas auténticas: elaboración de pan tradicional, horno de leña, productos locales y talleres culturales personalizados.",
                keywords: "experiencias gastronómicas, pan tradicional, horno leña, productos locales, talleres culturales"
            }
        },
        en: {
            home: {
                title: "Can Carerac - Authentic Experiences in Rural Catalonia",
                description: "Discover Can Carerac, a historic Catalan farmhouse offering unique gastronomic and cultural experiences. Wood-fired oven, organic garden, and authentic traditions.",
                keywords: "catalan farmhouse, gastronomic experiences, rural tourism catalonia, wood fired oven, organic garden, catalan traditions"
            },
            espai: {
                title: "The Space - Can Carerac | Historic Catalan Farmhouse",
                description: "Explore the unique spaces of Can Carerac: natural swimming pool, organic garden, traditional kitchen with wood-fired oven and panoramic terraces.",
                keywords: "restored farmhouse, natural pool, organic garden, traditional wood oven, panoramic terraces"
            },
            experiencies: {
                title: "Gastronomic Experiences - Can Carerac | Catalan Tradition",
                description: "Authentic gastronomic experiences: traditional bread making, wood-fired oven, local products and personalized cultural workshops.",
                keywords: "gastronomic experiences, traditional bread, wood oven, local products, cultural workshops"
            }
        }
    };

    const currentSEO = seoData[currentLanguage][section] || seoData[currentLanguage].home;
    const finalTitle = title || currentSEO.title;
    const finalDescription = description || currentSEO.description;
    const finalImage = image || "https://images.unsplash.com/photo-1566479179817-5c3a8e494f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    const finalUrl = url || `https://cancarerac.cat/${currentLanguage}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={currentSEO.keywords} />
            <meta name="author" content="Can Carerac" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content={currentLanguage} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="Can Carerac" />
            <meta property="og:locale" content={currentLanguage === 'ca' ? 'ca_ES' : currentLanguage === 'es' ? 'es_ES' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Additional SEO */}
            <meta name="theme-color" content="#8B6F47" />
            <link rel="canonical" href={finalUrl} />

            {/* Structured Data - JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TouristAttraction",
                    "name": "Can Carerac",
                    "description": finalDescription,
                    "url": finalUrl,
                    "image": finalImage,
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "ES",
                        "addressRegion": "Catalonia"
                    },
                    "offers": {
                        "@type": "Offer",
                        "description": "Experiències gastronòmiques i culturals"
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Can Carerac",
                        "url": "https://cancarerac.cat"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;