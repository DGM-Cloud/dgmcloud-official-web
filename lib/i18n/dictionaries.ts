export type Locale = 'en' | 'es';

export const defaultLocale: Locale = 'es';

export const dictionaries = {
  en: {
    nav: {
      services: 'Services',
      portfolio: 'Work',
      about: 'Approach',
      cta: 'Contact',
      menu: 'Menu',
      langEn: 'EN',
      langEs: 'ES',
      logoAria: 'Go to top — DGM Cloud',
      langAria: 'Language',
      skipToContent: 'Skip to content',
    },
    hero: {
      eyebrow: 'Digital transformation · Automation · Custom solutions',
      title: 'We make technology work for your business.',
      subtitle:
        'DGM helps companies modernize how they operate: digitize processes, automate the repetitive, and build a custom solution when a standard tool is not enough.',
      ctaPrimary: 'Tell us the problem',
      ctaSecondary: 'How we work',
    },
    services: {
      kicker: 'What we do',
      title: 'From a business problem to a working solution',
      subtitle:
        'We help digitize processes, remove repetitive work, and build what a standard tool cannot cover. Technology is the means; the business result is the point.',
      howKicker: 'Capabilities',
      howLabel: 'How that work gets done',
      howHint: 'Supporting work behind the three pillars — not a separate catalogue of services.',
    },
    expertise: {
      digital: {
        label: '01',
        title: 'Digital transformation',
        body: 'Modernize processes, operations, and systems so the business runs with less friction.',
      },
      automation: {
        label: '02',
        title: 'Automation',
        body: 'Design flows that cut repetitive work — so people focus on what needs judgment.',
      },
      custom: {
        label: '03',
        title: 'Custom solutions',
        body: 'When a standard product is not enough, we build what the business actually needs.',
      },
    },
    capabilities: {
      software: {
        title: 'Software development',
        body: 'Software aimed at a concrete business problem, built to be maintained and evolved.',
      },
      integration: {
        title: 'Systems integration',
        body: 'Connect the tools you already use so information does not live in silos.',
      },
      consulting: {
        title: 'Technology analysis',
        body: 'Need, analysis, and proposal before code. The recommendation follows the business.',
      },
    },
    features: {
      kicker: 'How we work',
      title: 'Technology with a purpose',
      cta: 'Tell us the business problem',
      ctaHint: 'A short note is enough.',
      f1: {
        title: 'Purpose before novelty',
        subtitle: 'What problem are we solving?',
        description:
          'We do not implement a technology because it is new. If it does not serve a business problem, it does not belong in the project.',
      },
      f2: {
        title: 'The solution before the tool',
        subtitle: 'Need first, stack second',
        description:
          'We start with what the business needs, then choose the solution, then the technology that can implement it properly.',
      },
      f3: {
        title: 'Automation that makes sense',
        subtitle: 'Less repetition, not fewer people',
        description:
          'Automation should reduce repetitive tasks, errors, and waiting — not exist just to remove people from the picture.',
      },
      f4: {
        title: 'Built to last',
        subtitle: 'Able to evolve',
        description:
          'We do not build software only so that it works today. We build solutions that can evolve.',
      },
    },
    process: {
      kicker: 'How an engagement unfolds',
      title: 'We work in stages — we do not jump from the problem to the code.',
      subtitle:
        'A project starts with the business need. Implementation comes after the problem, the scope, and the approach are clear.',
      p1: {
        title: 'Need',
        body: 'What the problem is, who has it, and how it is handled today.',
      },
      p2: {
        title: 'Analysis',
        body: 'How the current process works and where it breaks — before choosing a tool.',
      },
      p3: {
        title: 'Proposal',
        body: 'What to do, with scope in and out, following the business need.',
      },
      p4: {
        title: 'Design',
        body: 'How the solution is structured so it can be maintained and evolved.',
      },
      p5: {
        title: 'Implementation',
        body: 'Build when the previous stages are clear enough.',
      },
    },
    portfolio: {
      kicker: 'Published work',
      title: 'Selected sites in production',
      subtitle: 'Public websites we have shipped. A sample of our work, not DGM’s full catalogue.',
      badgeWeb: 'Website',
      visitSite: 'Visit website',
      previewUnavailable: 'Preview unavailable — open the site from this card.',
      footnote: 'If you have a business process to improve, start there — not with a page type.',
      footnoteCta: 'Tell us about it',
      projects: {
        moreCorporation: {
          title: 'More Corporation',
          description: 'Corporate website for consulting and construction.',
          stack: 'Corporate website',
        },
        boomTea: {
          title: 'Boom Tea',
          description: 'Brand website for a bubble-tea business.',
          stack: 'Brand website',
        },
      },
    },
    contact: {
      kicker: 'Contact',
      title: 'Tell us the business problem',
      subtitle: 'What is getting in the way today, and what would be better. A short note is enough.',
      emailHint: 'Or write to us directly',
      labelName: 'Name',
      labelEmail: 'Email',
      labelProject: 'What this is about',
      labelMessage: 'Message',
      placeholderName: 'Your name',
      placeholderEmail: 'you@company.com',
      placeholderMessage: 'The process, the pain, and any constraint we should know.',
      selectPlaceholder: 'Select a topic',
      optTransformation: 'Digital transformation',
      optAutomation: 'Automation',
      optCustom: 'Custom solution',
      optSoftware: 'Software development',
      optIntegration: 'Systems integration',
      optAnalysis: 'Technology analysis',
      optOther: 'Something else',
      success: 'Message sent.',
      error: 'The message could not be sent. Please try again, or email us directly.',
      invalid: 'Choose a topic so we know how to read the note.',
      dataNote: 'We use your name, email, and message only to reply to this inquiry.',
      sending: 'Sending…',
      submit: 'Tell us the problem',
    },
    footer: {
      tagline: 'We make technology work for your business.',
      descriptor: 'Digital transformation · Automation · Custom solutions',
      quickLinks: 'Sitemap',
      contact: 'Contact',
      servicesTitle: 'Services',
      svcDigital: 'Digital transformation',
      svcAutomation: 'Automation',
      svcCustom: 'Custom solutions',
      svcConsulting: 'Technology analysis',
      follow: 'Follow',
      socialInstagram: 'Instagram',
      socialTiktok: 'TikTok',
      socialGithub: 'GitHub',
      socialLinkedin: 'LinkedIn',
      rights: '© 2026 DGM Cloud. All rights reserved.',
    },
    seo: {
      title: 'DGM Cloud | Digital transformation',
      description:
        'DGM Cloud makes technology work for your business. Digital transformation, automation, and custom solutions.',
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      portfolio: 'Trabajo',
      about: 'Enfoque',
      cta: 'Contacto',
      menu: 'Menú',
      langEn: 'EN',
      langEs: 'ES',
      logoAria: 'Ir al inicio — DGM Cloud',
      langAria: 'Idioma',
      skipToContent: 'Saltar al contenido',
    },
    hero: {
      eyebrow: 'Transformación digital · Automatización · Soluciones a medida',
      title: 'Hacemos que la tecnología trabaje para tu negocio.',
      subtitle:
        'DGM ayuda a empresas a modernizar cómo operan: digitalizar procesos, automatizar lo repetitivo y construir una solución a medida cuando una herramienta estándar no alcanza.',
      ctaPrimary: 'Cuéntanos el problema',
      ctaSecondary: 'Cómo trabajamos',
    },
    services: {
      kicker: 'Qué hacemos',
      title: 'Del problema de negocio a una solución que funciona',
      subtitle:
        'Ayudamos a digitalizar procesos, eliminar trabajo repetitivo y construir lo que una herramienta estándar no cubre. La tecnología es el medio; el resultado de negocio es el fin.',
      howKicker: 'Capacidades',
      howLabel: 'Cómo se concreta este trabajo',
      howHint: 'El trabajo que sostiene a los tres pilares — no un catálogo aparte de servicios.',
    },
    expertise: {
      digital: {
        label: '01',
        title: 'Transformación digital',
        body: 'Modernizar procesos, operaciones y sistemas para que el negocio opere con menos fricción.',
      },
      automation: {
        label: '02',
        title: 'Automatización',
        body: 'Diseñar flujos que reduzcan lo repetitivo — para que las personas se concentren en lo que requiere criterio.',
      },
      custom: {
        label: '03',
        title: 'Soluciones a medida',
        body: 'Cuando un producto estándar no alcanza, construimos lo que el negocio necesita.',
      },
    },
    capabilities: {
      software: {
        title: 'Desarrollo de software',
        body: 'Software orientado a un problema concreto, pensado para mantenerse y evolucionar.',
      },
      integration: {
        title: 'Integración de sistemas',
        body: 'Conectar las herramientas que ya usas para que la información no viva aislada.',
      },
      consulting: {
        title: 'Análisis tecnológico',
        body: 'Necesidad, análisis y propuesta antes del código. La recomendación sigue al negocio.',
      },
    },
    features: {
      kicker: 'Cómo trabajamos',
      title: 'Tecnología con propósito',
      cta: 'Cuéntanos el problema de negocio',
      ctaHint: 'Con una nota corta alcanza.',
      f1: {
        title: 'Propósito antes que novedad',
        subtitle: '¿Qué problema estamos resolviendo?',
        description:
          'No implementamos una tecnología porque sea nueva. Si no sirve a un problema de negocio, no entra en el proyecto.',
      },
      f2: {
        title: 'La solución antes que la herramienta',
        subtitle: 'Primero la necesidad, después el stack',
        description:
          'Primero qué necesita el negocio, después cuál es la solución, y al final qué tecnología permite implementarla bien.',
      },
      f3: {
        title: 'Automatización con sentido',
        subtitle: 'Menos repetición, no menos personas',
        description:
          'Automatizar debe reducir tareas repetitivas, errores y esperas — no existir solo para sacar a las personas de la foto.',
      },
      f4: {
        title: 'Pensado para durar',
        subtitle: 'Capaces de evolucionar',
        description:
          'No construimos software solamente para que funcione hoy. Construimos soluciones capaces de evolucionar.',
      },
    },
    process: {
      kicker: 'Cómo avanza un encargo',
      title: 'Trabajamos por etapas — no saltamos del problema al código.',
      subtitle:
        'El proyecto empieza por la necesidad del negocio. La implementación llega cuando el problema, el alcance y el enfoque están claros.',
      p1: {
        title: 'Necesidad',
        body: 'Qué problema hay, quién lo tiene y cómo se resuelve hoy.',
      },
      p2: {
        title: 'Análisis',
        body: 'Cómo funciona el proceso actual y dónde se traba — antes de elegir una herramienta.',
      },
      p3: {
        title: 'Propuesta',
        body: 'Qué conviene hacer, con alcance y fuera de alcance.',
      },
      p4: {
        title: 'Diseño',
        body: 'Cómo se estructura la solución para mantenerla y hacerla evolucionar.',
      },
      p5: {
        title: 'Implementación',
        body: 'Construir cuando las etapas anteriores están claras.',
      },
    },
    portfolio: {
      kicker: 'Trabajo publicado',
      title: 'Sitios seleccionados en producción',
      subtitle:
        'Sitios públicos que hemos puesto en línea. Son una muestra de nuestro trabajo, no el catálogo completo de DGM.',
      badgeWeb: 'Sitio web',
      visitSite: 'Visitar sitio',
      previewUnavailable: 'La vista previa no está disponible — abre el sitio desde esta tarjeta.',
      footnote: 'Si hay un proceso de negocio que mejorar, empecemos por ahí — no por un tipo de página.',
      footnoteCta: 'Cuéntanos',
      projects: {
        moreCorporation: {
          title: 'More Corporation',
          description: 'Sitio corporativo para consulting y construcción.',
          stack: 'Sitio corporativo',
        },
        boomTea: {
          title: 'Boom Tea',
          description: 'Sitio de marca para un negocio de bubble tea.',
          stack: 'Sitio de marca',
        },
      },
    },
    contact: {
      kicker: 'Contacto',
      title: 'Cuéntanos el problema de negocio',
      subtitle: 'Qué está trabando el trabajo hoy y qué tendría que mejorar. Con una nota corta alcanza.',
      emailHint: 'O escríbenos directo',
      labelName: 'Nombre',
      labelEmail: 'Email',
      labelProject: 'De qué se trata',
      labelMessage: 'Mensaje',
      placeholderName: 'Tu nombre',
      placeholderEmail: 'tu@empresa.com',
      placeholderMessage: 'El proceso, el dolor y cualquier restricción que debamos conocer.',
      selectPlaceholder: 'Elige un tema',
      optTransformation: 'Transformación digital',
      optAutomation: 'Automatización',
      optCustom: 'Solución a medida',
      optSoftware: 'Desarrollo de software',
      optIntegration: 'Integración de sistemas',
      optAnalysis: 'Análisis tecnológico',
      optOther: 'Otro',
      success: 'Mensaje enviado.',
      error: 'No se pudo enviar. Inténtalo de nuevo o escríbenos por email.',
      invalid: 'Elige un tema para saber cómo leer la nota.',
      dataNote: 'Usamos nombre, email y mensaje solo para responder esta consulta.',
      sending: 'Enviando…',
      submit: 'Cuéntanos el problema',
    },
    footer: {
      tagline: 'Hacemos que la tecnología trabaje para tu negocio.',
      descriptor: 'Transformación digital · Automatización · Soluciones a medida',
      quickLinks: 'Mapa',
      contact: 'Contacto',
      servicesTitle: 'Servicios',
      svcDigital: 'Transformación digital',
      svcAutomation: 'Automatización',
      svcCustom: 'Soluciones a medida',
      svcConsulting: 'Análisis tecnológico',
      follow: 'Síguenos',
      socialInstagram: 'Instagram',
      socialTiktok: 'TikTok',
      socialGithub: 'GitHub',
      socialLinkedin: 'LinkedIn',
      rights: '© 2026 DGM Cloud. Todos los derechos reservados.',
    },
    seo: {
      title: 'DGM Cloud | Transformación digital',
      description:
        'DGM Cloud hace que la tecnología trabaje para tu negocio. Transformación digital, automatización y soluciones a medida.',
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export type Messages = (typeof dictionaries)[Locale];
