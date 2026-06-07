import type { Locale } from './types'

export const en: Locale = {
  nav: {
    espai: "The Space",
    timeline: "Story",
    experiencies: "Experiences",
    ubicacio: "Location",
    reservar: "Book Now",
    galeria: "Gallery",
  },
  hero: {
    title: "Carerac",
    subtitle: "A family farmhouse to live gastronomic and creative experiences connected with nature.",
    cta: "Discover the experiences",
    scroll: "Book yours",
  },
  arcades: {
    title: 'Prologue',
    subtitle: "A house with history. A shared table. A day to learn and be creative. At Carerac we open the doors of our home to share a way of living: cooking with what the garden gives, eating without rush, bathing under the sun, creating with our hands and enjoying nature calmly.",
  },
  history: {
    label: "History",
    subtitle: "A journey through time, from the origins to today.",
    passat: {
      tag: "Past",
      title: "Origins and tradition",
      paragraph: "Built in the 16th century following traditional Catalan architecture, the Carerac farmhouse was for generations the heart of a farming estate. Grains, livestock and family life unfolded within its walls for decades. By the late 20th century the farmhouse stood empty, yet its sturdy structure survived the passing of time, waiting for a new beginning.",
      image: "/images/gallery/timeline-fundacio.webp",
    },
    present: {
      tag: "Present",
      title: "Rebirth and experiences",
      paragraph: "In 2009 a respectful restoration began, preserving the historic essence while introducing the modern comforts needed for hospitality. Today Carerac opens its doors to anyone who wants to discover its history, enjoy its calm and share its traditions through unique gastronomic and cultural experiences.",
      image: "/images/gallery/timeline-actualitat.webp",
    },
    moreCta: "Read our full story",
  },
  experienceDetails: {
    close: "Close",
    bookNow: "Book this experience",
    gastronomica: {
      description: "A full immersion into Catalan gastronomic tradition. We will start the day discovering the ancient process of bread-making, from grain milling to baking in the century-old wood-fired oven. We will work the sourdough and knead it with our own hands, while gathering fresh produce from our organic garden. We will end by tasting bread with tomato, selected local products and much more, in a unique setting.",
    },
    cultural: {
      description: "The complete Carerac experience. We will combine the gastronomic day with a personalized cultural workshop tailored to your preferences: ceramics, painting, yoga, writing... You will enjoy a full meal made with local produce and time to relax by the pool surrounded by Mediterranean vegetation. A day to stop time and return with the feeling of having lived something truly authentic.",
    },
  },
  cookies: {
    message: "This website uses technical cookies and a language-preference cookie to function. No advertising or tracking purpose.",
    linkLabel: "More information",
    accept: "Got it",
  },
  cookiesPage: {
    title: "Cookies policy",
    updated: "Last updated: June 2026",
    back: "Back to home",
    sections: [
      {
        title: "What are cookies?",
        body: "Cookies are small text files that a website stores on your device when you visit it. They allow remembering information about your visit, such as your language preference, so that the next visit is more comfortable.",
      },
      {
        title: "Which cookies do we use?",
        body: "Carerac.life only uses strictly necessary and functional cookies:\n\n• Technical cookies: they manage the session of the internal panel administrator. They are not used for public browsing.\n• Language preference: we store your language choice in the browser to offer you content in your chosen language.\n• Loading flag: a small technical flag in the browser to avoid showing you the welcome screen repeatedly during your session.\n\nWe do not use third-party, advertising or tracking cookies of any kind.",
      },
      {
        title: "How to manage them?",
        body: "You can disable or delete cookies at any time from your browser settings. Note that some features may stop working correctly.",
      },
      {
        title: "Contact",
        body: "If you have any questions about this policy, you can contact us at carerac.life@gmail.com.",
      },
    ],
  },
  sobreNosaltres: {
    title: "About us",
    placeholder: "The history of Carerac will be told here soon...",
  },
  loading: {
    subtitle: "Authentic experiences",
  },
  timeline: {
    title: "Our Story",
    subtitle: "A journey through time, from the origins to the present day, where every stone tells a story.",
    cta: "Discover our experiences",
    finalText: "Today, this story continues with every visitor who discovers Can Carerac",
    today: "TODAY",
    events: [
      { year: "1890", title: "Original Construction", description: "The Can Carerac farmhouse is built following traditional Catalan architecture from the late 19th century." },
      { year: "1920", title: "Family Generations", description: "The Carerac family settles in the farmhouse, starting an agricultural tradition that would last for decades." },
      { year: "1960", title: "Golden Era", description: "The farmhouse lives its best years as an agricultural operation, with cereal crops and livestock." },
      { year: "1995", title: "Pause and Reflection", description: "The farmhouse becomes uninhabited, but its resistant structure withstands the passage of time." },
      { year: "2020", title: "Renaissance", description: "The respectful restoration project begins, preserving the historical essence with modern comforts." },
      { year: "2025", title: "Today - Unique Experiences", description: "Can Carerac opens its doors to share its history and traditions with visitors." },
    ],
  },
  espai: {
    title: "The Space",
    subtitle: "Carerac is a self-sufficient and sustainable farmhouse, surrounded by forest and nature, where solar energy, biomass and a living garden coexist in a space that combines tradition and modernity in harmony. A farmhouse restored with respect and love, rebuilt stone by stone.",
    spaces: {
      piscina: { title: "Swimming Pool", description: "Crystal clear waters surrounded by native Mediterranean vegetation" },
      hort: { title: "Garden", description: "Fresh ingredients grown with love for our experiences" },
      cuina: { title: "Kitchen / Indoor Dining Room", description: "Centenary wood-fired oven and traditional tools for artisanal preparation" },
      figuera: { title: "Beneath the Fig Tree", description: "Our special corner by the fig tree, where we share activities, moments and peace" },
    },
  },
  experiencies: {
    title: "Our Experiences",
    subtitle: "Choose the one that best suits what you're looking for",
    moreInfo: "More info",
    adaptedText: "Each experience adapts to your group and preferences",
    bookCta: "Book your experience",
    experience: "Experience",
    personalized: "Personalized",
    gastronomica: {
      title: "Gastronomic Experience",
      duration: "4:00 pm - 10:00 pm - 6 hours",
      activities: [
        "Harvesting food from the garden and the henhouse",
        "Traditional Catalan cooking workshop (sourdough bread, for a great pa amb tomaquet and Spanish omelette)",
        "Pool and rest time",
        "Homemade dinner with the products we have cooked",
      ],
    },
    cultural: {
      title: "Cultural / Gastronomic Experience",
      duration: "10:00 am - 6:30 pm - Full day",
      activities: [
        "Harvesting food from the garden and the henhouse",
        "Traditional Catalan cooking workshop (sourdough bread, for a great pa amb tomaquet and Spanish omelette)",
        "Pool and rest time",
        "Homemade lunch with the products we have cooked",
        "Afternoon workshop to choose: outdoor painting, mindfulness session or yoga session",
      ],
    },
  },
  ubicacio: {
    title: "How to Get Here",
    additionalInfo: "Additional information",
    fromBarcelona: "from Barcelona",
    fromTown: "from town",
    methods: {
      cotxe: { title: "Car Access", description: "Easy access from C-59 road, parking available at the farmhouse" },
      public: { title: "Public Transport", description: "Station in the town center, we coordinate pick-up with you" },
      peu: { title: "Walking Route", description: "2km trail, 30-minute walk through pine forests" },
    },
  },
  reservar: {
    title: "Make Your Booking",
    subtitle: "Let us know how many people will be coming and when, and we'll get in touch with you.",
    experienceSelector: { title: "Choose your experience", selected: "Selected" },
    guests: { title: "Number of people", label: "Guests", max: "Maximum: 10" },
    calendar: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      legend: { unavailable: "Unavailable", past: "Past", selected: "Selected" },
      selectedDate: "Selected date:",
      loading: "Loading availability...",
      error: "Could not load calendar. The days shown may not be up to date.",
    },
    form: {
      title: "Contact information",
      name: "Name", namePlaceholder: "Your name",
      lastname: "Last name", lastnamePlaceholder: "Your last name",
      email: "Email", emailPlaceholder: "email@example.com",
      phone: "Phone", phonePlaceholder: "+34 XXX XXX XXX",
      comments: "Comments", commentsPlaceholder: "Dietary preferences, special needs...",
      required: "* Required fields",
      sending: "Sending...",
      errorMessage: "Could not send the request. Please try contacting us directly by phone or email.",
      requiredFields: "Please fill in all required fields.",
      invalidEmail: "The email format is invalid.",
      invalidPhone: "The phone number must have at least 6 digits.",
      submit: "Send request",
    },
    contact: {
      title: "Contact Information",
      call: "Call us", email: "Email us",
      schedule: "Schedule", scheduleDays: "Monday to Sunday", scheduleHours: "10:00 AM - 8:00 PM",
      response: "We'll respond to your request within 24 hours",
    },
    confirmation: {
      title: "Request sent successfully!",
      emailSent: "You will receive a confirmation email with your request details.",
      response: "We'll respond within the next 24 hours.",
      summary: { date: "Requested date:", guests: "People:", experience: "Experience:" },
      newReservation: "Make another booking",
      questions: "If you have any questions, you can contact us:",
    },
  },
  footer: {
    description: "Authentic experiences in rural Catalonia",
    copyright: "\u00a9 2025 Can Carerac. All rights reserved.",
    sections: {
      experiences: {
        title: "Experiences",
        links: { gastronomic: "Gastronomic Experience", cultural: "Cultural Experience", space: "The Space", location: "How to Get Here" },
      },
      information: {
        title: "Information",
        links: { about: "About Us", faq: "FAQ", blog: "Blog", contact: "Contact" },
      },
      contact: {
        title: "Contact",
        address: "Can Carerac\nCaldes de Montbui",
        phone: "+34 XXX XXX XXX",
        email: "carerac.life@gmail.com",
      },
      legal: { privacy: "Privacy", terms: "Terms", cookies: "Cookies", legal: "Legal Notice" },
    },
  },
}
