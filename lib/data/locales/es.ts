import type { Locale } from './types'

export const es: Locale = {
  nav: {
    espai: "El Espacio",
    timeline: "Historia",
    experiencies: "Experiencias",
    ubicacio: "Ubicacion",
    reservar: "Reservar",
    galeria: "Galeria",
  },
  hero: {
    title: "Carerac",
    subtitle: "Una masia familiar donde vivir experiencias gastronomicas y creativas conectadas con la naturaleza.",
    cta: "Descubre las experiencias",
    scroll: "Reserva la tuya",
  },
  arcades: {
    title: 'Prologo',
    subtitle: "Una casa con historia. Una mesa compartida. Un dia para aprender y ser creativos. En Carerac abrimos las puertas de nuestra casa para compartir una manera de vivir: cocinar con lo que nos da el huerto, comer sin prisa, banarse bajo el sol, crear con las manos y disfrutar de la naturaleza con calma.",
  },
  history: {
    label: "Historia",
    subtitle: "Un viaje a traves del tiempo, desde los origenes hasta la actualidad.",
    passat: {
      tag: "Pasado",
      title: "Origenes y tradicion",
      paragraph: "Construida en el siglo XVI siguiendo la arquitectura tradicional catalana, la masia Carerac fue durante generaciones el centro de una explotacion agricola. Cereales, ganaderia y vida familiar se sucedieron entre sus paredes durante decadas. A finales del siglo XX la masia quedo deshabitada, pero su estructura sobrevivio al paso del tiempo esperando un nuevo comienzo.",
      image: "/images/gallery/timeline-fundacio.webp",
    },
    present: {
      tag: "Presente",
      title: "Renacimiento y experiencias",
      paragraph: "En 2009 comenzo la restauracion respetuosa, conservando la esencia historica e incorporando las comodidades modernas necesarias. Hoy Carerac abre sus puertas a quien quiera descubrir su historia, disfrutar de su calma y compartir sus tradiciones a traves de experiencias gastronomicas y culturales unicas.",
      image: "/images/gallery/timeline-actualitat.webp",
    },
    moreCta: "Lee nuestra historia completa",
  },
  experienceDetails: {
    close: "Cerrar",
    bookNow: "Reservar esta experiencia",
    gastronomica: {
      description: "Una inmersion total en la tradicion gastronomica catalana. Comenzaremos el dia descubriendo el proceso ancestral del pan, desde la molienda del grano hasta el horneado en el horno de lena centenario. Trabajaremos la masa madre y la amasaremos con nuestras manos, mientras recogemos productos frescos de nuestro huerto ecologico. Terminaremos degustando pan con tomate, productos locales seleccionados y mucho mas, en un entorno unico.",
    },
    cultural: {
      description: "La experiencia completa de Carerac. Combinaremos la jornada gastronomica con un taller cultural personalizado segun vuestras preferencias: ceramica, pintura, yoga, escritura... Disfrutaremos de una comida completa preparada con productos de la tierra y tendremos tiempo de relajacion en la piscina rodeada de vegetacion mediterranea. Una jornada para detener el tiempo y volver con la sensacion de haber vivido algo autentico.",
    },
  },
  cookies: {
    message: "Esta web usa cookies tecnicas y una cookie de preferencia de idioma para su funcionamiento. Sin finalidad publicitaria ni de tracking.",
    linkLabel: "Mas informacion",
    accept: "Entendido",
  },
  cookiesPage: {
    title: "Politica de cookies",
    updated: "Ultima actualizacion: junio 2026",
    back: "Volver al inicio",
    sections: [
      {
        title: "Que son las cookies?",
        body: "Las cookies son pequenos archivos de texto que un sitio web guarda en tu dispositivo cuando lo visitas. Permiten recordar informacion sobre tu visita, como tu preferencia de idioma, para que la proxima vez sea mas comoda.",
      },
      {
        title: "Que cookies usamos?",
        body: "Carerac.life solo utiliza cookies estrictamente necesarias y funcionales:\n\n• Cookies tecnicas: gestionan la sesion del administrador del panel interno. No se utilizan para la navegacion publica.\n• Preferencia de idioma: guardamos tu eleccion de idioma en el navegador para ofrecerte los contenidos en la lengua escogida.\n• Marca de carga: una pequena marca tecnica en el navegador para evitar mostrarte la pantalla de bienvenida repetidamente durante tu sesion.\n\nNo utilizamos cookies de terceros, publicitarias ni de tracking de ningun tipo.",
      },
      {
        title: "Como gestionarlas?",
        body: "Puedes desactivar o borrar las cookies en cualquier momento desde la configuracion de tu navegador. Ten en cuenta que algunas funcionalidades podrian dejar de funcionar correctamente.",
      },
      {
        title: "Contacto",
        body: "Si tienes cualquier duda sobre esta politica, puedes contactar con nosotros en carerac.life@gmail.com.",
      },
    ],
  },
  sobreNosaltres: {
    title: "Sobre nosotros",
    placeholder: "La historia de Carerac se contara aqui muy pronto...",
  },
  loading: {
    subtitle: "Experiencias autenticas",
  },
  timeline: {
    title: "Nuestra Historia",
    subtitle: "Un viaje a traves del tiempo, desde los origenes hasta la actualidad, donde cada piedra cuenta una historia.",
    cta: "Descubre nuestras experiencias",
    finalText: "Hoy, esta historia continua con cada visitante que descubre Can Carerac",
    today: "HOY",
    events: [
      { year: "1890", title: "Construccion Original", description: "La masia Can Carerac se construye siguiendo la arquitectura tradicional catalana de finales del siglo XIX." },
      { year: "1920", title: "Generaciones Familiares", description: "La familia Carerac se establece en la masia, iniciando una tradicion agricola que duraria decadas." },
      { year: "1960", title: "Epoca Dorada", description: "La masia vive sus mejores anos como explotacion agricola, con cultivos de cereales y ganaderia." },
      { year: "1995", title: "Pausa y Reflexion", description: "La masia queda deshabitada, pero su estructura resistente aguanta el paso del tiempo." },
      { year: "2020", title: "Renacimiento", description: "Inicia el proyecto de restauracion respetuosa, conservando la esencia historica con comodidades modernas." },
      { year: "2025", title: "Hoy - Experiencias Unicas", description: "Can Carerac abre sus puertas para compartir su historia y tradiciones con los visitantes." },
    ],
  },
  espai: {
    title: "El Espacio",
    subtitle: "Carerac es una masia autosuficiente y sostenible, rodeada de bosque y naturaleza, donde conviven la energia solar, la biomasa y un huerto vivo, en un espacio que combina tradicion y modernidad con armonia. Una masia restaurada con respeto y amor, reconstruida piedra a piedra.",
    spaces: {
      piscina: { title: "Piscina", description: "Aguas cristalinas rodeadas de vegetacion mediterranea autoctona" },
      hort: { title: "Huerto Ecologico", description: "Ingredientes frescos cultivados con amor para nuestras experiencias" },
      cuina: { title: "Cocina / Comedor Interior", description: "Horno de lena centenario y utensilios tradicionales para la elaboracion artesanal" },
      figuera: { title: "Bajo la Higuera", description: "Nuestro rincon especial bajo la higuera, donde compartimos actividades, momentos y calma" },
    },
  },
  experiencies: {
    title: "Nuestras Experiencias",
    subtitle: "Elige la que mas se adapte a lo que buscas",
    moreInfo: "Mas info",
    adaptedText: "Cada experiencia se adapta a vuestro grupo y preferencias",
    bookCta: "Reserva tu experiencia",
    experience: "Experiencia",
    personalized: "Personalizada",
    gastronomica: {
      title: "Experiencia Gastronomica",
      duration: "16:00 - 22:00 - 6 horas",
      activities: [
        "Recoleccion de alimentos del huerto y la ouera",
        "Taller de cocina tradicional catalana (pan de masa madre, para hacer un buen pan con tomate y tortilla de patatas)",
        "Piscina y tiempo de descanso",
        "Cena casera con los productos que hemos cocinado",
      ],
    },
    cultural: {
      title: "Experiencia Cultural / Gastronomica",
      duration: "10:00 - 18:30 - Dia completo",
      activities: [
        "Recoleccion de alimentos del huerto y la ouera",
        "Taller de cocina tradicional catalana (pan de masa madre, para hacer un buen pan con tomate y tortilla de patatas)",
        "Piscina y tiempo de descanso",
        "Comida casera con los productos que hemos cocinado",
        "Taller de tarde a escoger: pintura al aire libre, sesion de mindfulness o sesion de yoga",
      ],
    },
  },
  ubicacio: {
    title: "Como Llegar",
    additionalInfo: "Informacion adicional",
    fromBarcelona: "desde Barcelona",
    fromTown: "desde el pueblo",
    methods: {
      cotxe: { title: "Acceso en Coche", description: "Facil acceso desde la C-59, aparcamiento disponible en la masia" },
      public: { title: "Transporte Publico", description: "Estacion en el centro del pueblo, coordinamos la recogida" },
      peu: { title: "Ruta a pie", description: "Sendero de 2km, 30 minutos caminando entre bosques de pinos" },
    },
  },
  reservar: {
    title: "Haz tu Reserva",
    subtitle: "Dinos cuantas personas sereis y cuando os gustaria venir, y nos pondremos en contacto con vosotros.",
    experienceSelector: { title: "Elige tu experiencia", selected: "Seleccionada" },
    guests: { title: "Numero de personas", label: "Invitados", max: "Maximo: 10" },
    calendar: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekDays: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      legend: { unavailable: "No disponible", past: "Pasado", selected: "Seleccionado" },
      selectedDate: "Fecha seleccionada:",
      loading: "Cargando disponibilidad...",
      error: "No se ha podido cargar el calendario. Los dias mostrados pueden no estar actualizados.",
    },
    form: {
      title: "Informacion de contacto",
      name: "Nombre", namePlaceholder: "Tu nombre",
      lastname: "Apellidos", lastnamePlaceholder: "Tus apellidos",
      email: "Email", emailPlaceholder: "correo@ejemplo.com",
      phone: "Telefono", phonePlaceholder: "+34 XXX XXX XXX",
      comments: "Comentarios", commentsPlaceholder: "Preferencias alimentarias, necesidades especiales...",
      required: "* Campos obligatorios",
      sending: "Enviando...",
      errorMessage: "No se ha podido enviar la solicitud. Por favor, intenta contactarnos directamente por telefono o email.",
      requiredFields: "Por favor, rellena todos los campos obligatorios.",
      invalidEmail: "El email no tiene un formato valido.",
      invalidPhone: "El telefono debe tener al menos 6 digitos.",
      submit: "Enviar solicitud",
    },
    contact: {
      title: "Informacion de Contacto",
      call: "Llamanos", email: "Escribenos",
      schedule: "Horario", scheduleDays: "Lunes a Domingo", scheduleHours: "10:00 - 20:00",
      response: "Responderemos tu solicitud en menos de 24 horas",
    },
    confirmation: {
      title: "\u00a1Solicitud enviada correctamente!",
      emailSent: "Recibiras un email de confirmacion con los datos de tu solicitud.",
      response: "Te responderemos en las proximas 24 horas.",
      summary: { date: "Fecha solicitada:", guests: "Personas:", experience: "Experiencia:" },
      newReservation: "Hacer otra reserva",
      questions: "Si tienes alguna pregunta, puedes contactarnos:",
    },
  },
  footer: {
    description: "Experiencias autenticas en la Cataluna rural",
    copyright: "\u00a9 2025 Can Carerac. Todos los derechos reservados.",
    sections: {
      experiences: {
        title: "Experiencias",
        links: { gastronomic: "Experiencia Gastronomica", cultural: "Experiencia Cultural", space: "El Espacio", location: "Como Llegar" },
      },
      information: {
        title: "Informacion",
        links: { about: "Sobre Nosotros", faq: "Preguntas Frecuentes", blog: "Blog", contact: "Contacto" },
      },
      contact: {
        title: "Contacto",
        address: "Can Carerac\nCaldes de Montbui",
        phone: "+34 XXX XXX XXX",
        email: "carerac.life@gmail.com",
      },
      legal: { privacy: "Privacidad", terms: "Terminos", cookies: "Cookies", legal: "Aviso Legal" },
    },
  },
}
