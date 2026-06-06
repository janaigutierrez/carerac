export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface Space {
  title: string
  description: string
}

export interface Experience {
  title: string
  duration: string
  activities: string[]
}

export interface TransportMethod {
  title: string
  description: string
}

export interface Locale {
  nav: {
    espai: string
    timeline: string
    experiencies: string
    ubicacio: string
    reservar: string
    galeria: string
  }
  history: {
    label: string
    subtitle: string
    passat: { tag: string; title: string; paragraph: string; image: string }
    present: { tag: string; title: string; paragraph: string; image: string }
    moreCta: string
  }
  experienceDetails: {
    close: string
    bookNow: string
    gastronomica: { description: string }
    cultural: { description: string }
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    scroll: string
  }
  arcades: {
    title: string
    subtitle: string
  }
  loading: {
    subtitle: string
  }
  timeline: {
    title: string
    subtitle: string
    cta: string
    finalText: string
    today: string
    events: TimelineEvent[]
  }
  espai: {
    title: string
    subtitle: string
    spaces: {
      piscina: Space
      hort: Space
      cuina: Space
      figuera: Space
    }
  }
  experiencies: {
    title: string
    subtitle: string
    moreInfo: string
    adaptedText: string
    bookCta: string
    experience: string
    personalized: string
    gastronomica: Experience
    cultural: Experience
  }
  ubicacio: {
    title: string
    additionalInfo: string
    fromBarcelona: string
    fromTown: string
    methods: {
      cotxe: TransportMethod
      public: TransportMethod
      peu: TransportMethod
    }
  }
  reservar: {
    title: string
    subtitle: string
    experienceSelector: { title: string; selected: string }
    guests: { title: string; label: string; max: string }
    calendar: {
      months: string[]
      weekDays: string[]
      legend: { unavailable: string; past: string; selected: string }
      selectedDate: string
      loading: string
      error: string
    }
    form: {
      title: string
      name: string; namePlaceholder: string
      lastname: string; lastnamePlaceholder: string
      email: string; emailPlaceholder: string
      phone: string; phonePlaceholder: string
      comments: string; commentsPlaceholder: string
      required: string
      sending: string
      errorMessage: string
      requiredFields: string
      invalidEmail: string
      invalidPhone: string
      submit: string
    }
    contact: {
      title: string
      call: string; email: string
      schedule: string; scheduleDays: string; scheduleHours: string
      response: string
    }
    confirmation: {
      title: string
      emailSent: string
      response: string
      summary: { date: string; guests: string; experience: string }
      newReservation: string
      questions: string
    }
  }
  footer: {
    description: string
    copyright: string
    sections: {
      experiences: {
        title: string
        links: { gastronomic: string; cultural: string; space: string; location: string }
      }
      information: {
        title: string
        links: { about: string; faq: string; blog: string; contact: string }
      }
      contact: {
        title: string
        address: string
        phone: string
        email: string
      }
      legal: { privacy: string; terms: string; cookies: string; legal: string }
    }
  }
}

export type LanguageCode = 'ca' | 'es' | 'en'
