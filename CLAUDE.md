# CLAUDE.md - Can Carerac Project Guide

This document provides comprehensive guidance for AI assistants working on the Can Carerac codebase.

## Project Overview

**Can Carerac** is a single-page tourism/experience booking website for a historic Catalan farmhouse (masia) located in Caldes de Montbui, Catalonia, Spain. The site showcases the property's history, facilities, experiences, and provides a booking system.

- **Primary Audience**: Tourists seeking authentic rural Catalan experiences
- **Languages**: Catalan (default), Spanish, English
- **Main Purpose**: Marketing and booking for gastronomic and cultural experiences

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.1.1 |
| Build Tool | Vite | 7.1.6 |
| Styling | Tailwind CSS | 3.4.17 |
| Icons | Lucide React | 0.544.0 |
| Animations | Framer Motion | 12.23.16 |
| SEO | @dr.pogodin/react-helmet | 3.0.4 |
| Date Utilities | date-fns | 4.1.0 |
| Email Service | @emailjs/browser | 4.4.1 |
| Scroll Detection | react-intersection-observer | 9.16.0 |

## Project Structure

```
/home/user/carerac/
├── src/
│   ├── components/
│   │   ├── booking/              # Booking form sub-components
│   │   │   ├── BookingCalendar.jsx
│   │   │   ├── BookingConfirmation.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── ContactCards.jsx
│   │   │   ├── ExperienceSelector.jsx
│   │   │   ├── GuestCounter.jsx
│   │   │   └── index.js
│   │   ├── common/               # Reusable UI components
│   │   │   ├── SectionHeader.jsx
│   │   │   └── index.js
│   │   ├── layout/               # Page layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.js
│   │   ├── sections/             # Main page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── EspaiSection.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── ExperiencesSection.jsx
│   │   │   ├── UbicacioSection.jsx
│   │   │   ├── ReservarSection.jsx
│   │   │   └── index.js
│   │   ├── SEO.jsx               # Dynamic SEO metadata
│   │   ├── LoadingScreen.jsx     # 6-second intro animation
│   │   ├── Logo.jsx              # Logo component variants
│   │   ├── AnimatedLogo.jsx      # Animated logo version
│   │   └── ArcadesTransition.jsx # Prologue transition section
│   ├── data/
│   │   └── locales/              # Translations split by language
│   │       ├── ca.js             # Catalan (~250 lines)
│   │       ├── es.js             # Spanish (~250 lines)
│   │       ├── en.js             # English (~250 lines)
│   │       └── index.js          # Aggregates all languages
│   ├── hooks/
│   │   ├── useLanguage.jsx       # i18n context and translation hook
│   │   ├── useScrollAnimation.js # Scroll-based animation utilities
│   │   └── useCalendarAvailability.js # Google Calendar API hook
│   ├── utils/
│   │   ├── formValidation.js     # Form validation helpers
│   │   └── animations.js         # Animation utilities
│   ├── App.jsx                   # Main app with section observer
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles and Tailwind imports
├── public/
│   └── images/
│       ├── gallery/              # WebP images for experiences/spaces
│       └── logo/                 # Logo variants (PNG, SVG)
├── .env.example                  # Environment variables template
├── index.html                    # HTML entry with Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## Key Components

### App.jsx (Main Entry)
- Wraps app with `HelmetProvider` and `LanguageProvider`
- Manages loading screen (6 seconds)
- Uses IntersectionObserver for active section detection (SEO)
- Renders sections in order: Hero → Espai → Timeline → Experiences → Ubicacio → Reservar

### Component Organization

| Directory | Purpose | Contents |
|-----------|---------|----------|
| `components/layout/` | Page structure | Header, Footer |
| `components/sections/` | Main page sections | Hero, Espai, Timeline, Experiences, Ubicacio, Reservar |
| `components/booking/` | Booking form parts | Calendar, Form, Confirmation, etc. |
| `components/common/` | Reusable UI | SectionHeader, etc. |

### Section Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Hero.jsx` | Landing section | Full-screen, gradient background, CTA button |
| `EspaiSection.jsx` | Facilities | 4-space carousel (pool, garden, kitchen, fig tree) |
| `Timeline.jsx` | History | 6 events, scroll-progress animation |
| `ExperiencesSection.jsx` | Offerings | 2 cards (gastronomic 4h, cultural 8h) |
| `UbicacioSection.jsx` | Location | Google Maps embed, transport methods |
| `ReservarSection.jsx` | Booking | Orchestrates booking sub-components |

### Booking Sub-Components

| Component | Purpose |
|-----------|---------|
| `BookingCalendar.jsx` | Calendar with month navigation and availability |
| `ExperienceSelector.jsx` | Experience type selection cards |
| `GuestCounter.jsx` | Guest count +/- selector |
| `BookingForm.jsx` | Contact information form |
| `BookingConfirmation.jsx` | Success message after booking |
| `ContactCards.jsx` | Phone, email, schedule cards |

## Styling Conventions

### Tailwind Configuration

Custom color palette (earthy, rustic theme):
```javascript
colors: {
  primary: {
    stone: '#E6D7C3',      // Light background, accents
    brown: '#8B6F47',      // Primary brown
    straw: '#F4E4A6',      // Warm yellow accents
    forest: '#4A5D23',     // Green for nature elements
    white: '#FAFAF7',      // Off-white background
    gray: '#A69B8C',       // Muted text, borders
    dark: '#5D4E37',       // Dark text, headers
    terracotta: '#B85450'  // Accent color
  }
}
```

Custom fonts:
- **Display**: `Playfair Display` (serif) - Headings and titles
- **Body**: `Inter` (sans-serif) - Body text and UI

Custom animations:
- `animate-fade-in` - Opacity fade (0.8s)
- `animate-slide-up` - Slide from bottom (0.8s)
- `animate-slide-down` - Slide from top (0.8s)
- `animate-spin-slow` - Slow rotation (3s)

### CSS Conventions
- Use Tailwind utility classes primarily
- Custom CSS only in `index.css` for global styles
- Use CSS variables for complex animations
- Responsive design with mobile-first approach
- Standard breakpoints: `sm`, `md`, `lg`, `xl`

## Internationalization (i18n)

### Implementation
Language system uses React Context via `useLanguage` hook.

```jsx
// Usage in components
import { useLanguage } from '../../hooks/useLanguage';

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <h1>{t('nav.espai')}</h1>  // Dot notation for nested keys
  );
}
```

### Translation Structure
Translations are split into separate files in `src/data/locales/`:
```
src/data/locales/
├── ca.js      # Catalan translations
├── es.js      # Spanish translations
├── en.js      # English translations
└── index.js   # Aggregates: export const content = { ca, es, en }
```

Key sections: `nav`, `hero`, `arcades`, `timeline`, `espai`, `experiencies`, `ubicacio`, `reservar`, `footer`

### Adding New Translations
1. Add the key to all three language files (`ca.js`, `es.js`, `en.js`)
2. Use `t('section.key')` syntax in components
3. Test all three languages after changes

## Third-Party Integrations

### EmailJS (Booking Emails)
```javascript
import emailjs from '@emailjs/browser';

// Send booking request
emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

### Google Calendar API (Availability)
Uses the `useCalendarAvailability` hook:
```javascript
import { useCalendarAvailability } from '../../hooks/useCalendarAvailability';

const { isLoading, error, isDateOccupied, refetch } = useCalendarAvailability(getErrorMessage);
```

Requirements:
- Calendar must be set to PUBLIC
- API key must have Calendar API enabled
- See `.env.example` for setup instructions

### Google Maps (Location)
Embedded via iframe in `UbicacioSection.jsx`:
- Location: Torre de Carerac, Caldes de Montbui
- Coordinates: 41.6468°N, 2.1679°E

## Environment Variables

Required environment variables (see `.env.example` for details):
```env
# Google Calendar API
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CALENDAR_ID=your_calendar_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

All environment variables must be prefixed with `VITE_` to be accessible in the browser.

## Development Workflow

### Commands
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production (output: /dist)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Development Server
- Default URL: `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Fast Refresh for React components

### Build Process
1. Vite bundles all assets
2. Tailwind purges unused CSS
3. Output to `/dist` directory
4. Optimized for production (minified, tree-shaken)

## Code Conventions

### File Naming
- Components: PascalCase (`Header.jsx`, `EspaiSection.jsx`)
- Hooks: camelCase with `use` prefix (`useLanguage.jsx`)
- Utils: camelCase (`formValidation.js`)
- Data: camelCase (`ca.js`, `es.js`, `en.js`)

### Import Patterns
```jsx
// Layout components
import { Header, Footer } from './components/layout';

// Section components
import { Hero, EspaiSection, ReservarSection } from './components/sections';

// Booking components
import { BookingCalendar, BookingForm } from './components/booking';

// Common components
import { SectionHeader } from './components/common';

// Hooks (adjust path based on file location)
import { useLanguage } from '../../hooks/useLanguage';
```

### Component Structure
```jsx
import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
// Other imports...

const ComponentName = () => {
  const { t } = useLanguage();
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <section id="section-id" className="...">
      {/* Content */}
    </section>
  );
};

export default ComponentName;
```

### Comments
- Code comments are primarily in Catalan
- Use `// Catalan comment` for inline comments
- JSDoc style for complex functions when needed

### Section IDs
Main sections have IDs for navigation: `hero`, `espai`, `experiencies`, `ubicacio`, `reservar`

## Important Patterns

### Scroll Navigation
```javascript
// Smooth scroll to section
document.getElementById('section-id').scrollIntoView({ behavior: 'smooth' });
```

### IntersectionObserver Pattern
Used extensively for:
- Lazy loading content
- Scroll-triggered animations
- Active section detection
- Timeline progress animation

### Form Handling
The booking form in `ReservarSection.jsx`:
1. Validates inputs locally
2. Checks calendar availability via `useCalendarAvailability` hook
3. Sends email via EmailJS
4. Shows success/error states

## Performance Considerations

- Images are in WebP format (optimized for web)
- Lazy loading via `react-intersection-observer`
- CSS purged by Tailwind in production
- 6-second loading screen (intentional for branding)
- Fonts loaded via Google Fonts CDN

## Common Tasks

### Adding a New Section
1. Create component in `src/components/sections/`
2. Add translations to all three files in `src/data/locales/`
3. Export from `src/components/sections/index.js`
4. Import and add to `App.jsx` in correct order
5. Add section ID for navigation
6. Update `Header.jsx` navigation if needed

### Modifying Translations
1. Edit the appropriate file(s) in `src/data/locales/`
2. Find the key in all three language files (`ca.js`, `es.js`, `en.js`)
3. Update text while maintaining key structure
4. Test all three languages

### Adding New Images
1. Place images in `public/images/gallery/` or appropriate subfolder
2. Use WebP format for optimal performance
3. Reference as `/images/gallery/filename.webp` in components

### Styling Changes
1. Prefer Tailwind utilities over custom CSS
2. Use existing color palette from `tailwind.config.js`
3. For custom animations, add to `tailwind.config.js` or `index.css`
4. Test responsive behavior at all breakpoints

## Testing

Currently no automated tests. Manual testing recommended:
1. Test all three languages
2. Test responsive design (mobile, tablet, desktop)
3. Test booking form submission
4. Test calendar availability display
5. Verify all navigation links work

## Git Workflow

Recent commit message style:
- Descriptive, concise messages
- Examples: "emailjs setup and calendar connect to google", "booking translated data"
- No conventional commit prefixes currently used

## Troubleshooting

### Common Issues
- **Translations not showing**: Check key exists in all languages in `src/data/locales/`
- **Styles not applying**: Ensure Tailwind classes are in safelist if dynamically generated
- **Calendar not loading**:
  - Check environment variables are set correctly
  - Verify calendar is set to PUBLIC
  - Check browser console for specific API errors (403 = invalid key, 404 = calendar not found)
- **Email not sending**: Check EmailJS credentials and template configuration

### Development Tips
- Check browser console for errors
- Use React DevTools for component inspection
- Network tab for API issues (Calendar, EmailJS)
- Lighthouse for performance audits
