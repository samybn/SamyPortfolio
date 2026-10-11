export type Language = "FR" | "EN";

export interface SkillItemI18n {
  label: string;
  subtitle: string;
}

export interface JournalEntryI18n {
  id: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Translations {
  nav: {
    home: string;
    skills: string;
    projects: string;
    contact: string;
    sayHi: string;
  };
  hero: {
    eyebrow: string;
    rolePrefix: string;
    roleHighlight: string;
    roles: string[];
    descriptionPart1: string;
    descriptionPart2: string;
    seeWorks: string;
    reachOut: string;
  };
  about: {
    heading: string;
    description: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    items: Record<string, { subtitle: string }>;
  };
  projects: {
    heading: string;
    liveButton: string;
  };
  moreProjects: {
    eyebrow: string;
    headingMain: string;
    headingAccent: string;
    subtext: string;
    viewAll: string;
    entries: JournalEntryI18n[];
  };
  contact: {
    heading: string;
    intro: string;
    contactEmail: string;
    location: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successTitle: string;
    successDesc: string;
    errorMessage: string;
  };
  footer: {
    subtitle: string;
    socialsTitle: string;
    rights: string;
    crafted: string;
  };
  projectDetail: {
    backToProjects: string;
    visit: string;
    projectBadge: string;
    visitProject: string;
    sourceCode: string;
    overviewEyebrow: string;
    aboutProject: string;
    client: string;
    role: string;
    year: string;
    category: string;
    keyPointsEyebrow: string;
    mainFeatures: string;
    techStackEyebrow: string;
    techUsed: string;
    nextProjectEyebrow: string;
    nextProjectBadge: string;
  };
  slider: {
    expandTitle: string;
    prevImage: string;
    nextImage: string;
  };
  notFound: {
    badge: string;
    title: string;
    description: string;
    backHome: string;
    viewProjects: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  FR: {
    nav: {
      home: "Accueil",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      sayHi: "Me Contacter",
    },
    hero: {
      eyebrow: "PORTFOLIO '26 · GÉNIE LOGICIEL",
      rolePrefix: "Étudiant en Master spécialisé en ",
      roleHighlight: "Génie Logiciel",
      roles: ["applications web", "applications mobiles", "jeux vidéo"],
      descriptionPart1:
        "Passionné par l'ingénierie logicielle et le développement Full Stack, je conçois et développe des ",
      descriptionPart2:
        " modernes, performants et scalables. De la conception d'architectures distribuées robustes aux interfaces utilisateurs soignées, je transforme des problématiques complexes en solutions digitales fiables et pérennes.",
      seeWorks: "Voir les Projets",
      reachOut: "Me Contacter",
    },
    about: {
      heading: "À propos",
      description:
        "Avec plus de cinq ans d'expérience en génie logiciel et développement Full Stack, je conçois et développe des applications web performantes, des APIs robustes et des architectures cloud hautement scalables. J'aime collaborer avec des équipes ambitieuses pour concevoir des produits rapides, fiables et soignés. Créons ensemble des projets d'exception !",
    },
    skills: {
      eyebrow: "Stack technique",
      heading: "Mes compétences",
      items: {
        Java: { subtitle: "POO, Spring Boot, API REST et architectures backend" },
        React: { subtitle: "Interfaces modernes, hooks et gestion d'état" },
        "Next.js": { subtitle: "SSR, App Router et applications full-stack" },
        TypeScript: { subtitle: "Typage strict pour un code robuste et maintenable" },
        "Spring Boot": { subtitle: "Microservices, sécurité JWT, JPA/Hibernate" },
        "Node.js": { subtitle: "APIs rapides avec Express et traitements asynchrones" },
        Python: { subtitle: "Data, scripts d'automatisation et machine learning" },
        PostgreSQL: { subtitle: "Modélisation, requêtes avancées et optimisation" },
        MySQL: { subtitle: "Bases relationnelles et conception de schémas" },
        Docker: { subtitle: "Conteneurisation et déploiement reproductible" },
        Git: { subtitle: "Versioning, branches et workflows collaboratifs" },
        Linux: { subtitle: "Administration système et ligne de commande" },
      },
    },
    projects: {
      heading: "Projets",
      liveButton: "Voir le Projet",
    },
    moreProjects: {
      eyebrow: "Projets & Réalisations",
      headingMain: "Autres ",
      headingAccent: "projets",
      subtext:
        "Une sélection de projets, architectures logicielles et réalisations techniques complémentaires.",
      viewAll: "Voir Tous Les Projets",
      entries: [
        {
          id: "01",
          title: "Conception d'APIs Edge haute performance avec Cloudflare Workers & TypeScript",
          description:
            "Architecture de microservices globaux à latence sub-50ms avec worker bindings, cache intelligent et zéro cold start.",
          tag: "Architecture",
          readTime: "5 min de lecture",
          date: "Août 2026",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "02",
          title: "Synchronisation d'état Micro-Frontend & Pipelines Temps Réel",
          description:
            "Conception de modules isolés communicant via des bus d'événements pub/sub légers sans couplage fort.",
          tag: "Full Stack",
          readTime: "7 min de lecture",
          date: "Juil 2026",
          image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "03",
          title: "Maîtriser les animations de cartes empilées au scroll avec Framer Motion",
          description:
            "Implémentation d'un empilement 3D à 60fps, interpolation d'échelle et interactions magnétiques.",
          tag: "UI / Motion",
          readTime: "4 min de lecture",
          date: "Juin 2026",
          image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "04",
          title: "Conception d'architectures Offline-First résilientes avec l'API Google Drive",
          description:
            "Synchronisation cloud, transformations CDN d'images et mise en cache côté client pour vitrine dynamique.",
          tag: "Cloud & Dev",
          readTime: "6 min de lecture",
          date: "Mai 2026",
          image:
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=85",
        },
      ],
    },
    contact: {
      heading: "Contact",
      intro:
        "Vous avez un projet en tête ou souhaitez simplement échanger ? Envoyez-moi un message et je vous répondrai dans les plus brefs délais.",
      contactEmail: "jack@example.com",
      location: "Basé à Paris, France · Ouvert au télétravail",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre adresse email",
      messagePlaceholder: "Votre message",
      sendButton: "Envoyer le Message",
      sendingButton: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successDesc: "Merci pour votre message — je vous répondrai très prochainement.",
      errorMessage: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou contacter directement par email.",
    },
    footer: {
      subtitle: "Master Génie Logiciel · Développeur Full Stack",
      socialsTitle: "Réseaux",
      rights: "Bouadloune Samy — Tous droits réservés",
      crafted: "Conçu & développé avec passion",
    },
    projectDetail: {
      backToProjects: "Retour aux projets",
      visit: "Visiter",
      projectBadge: "PROJET #",
      visitProject: "Visiter le projet",
      sourceCode: "Code source",
      overviewEyebrow: "Présentation",
      aboutProject: "À propos du projet",
      client: "Client",
      role: "Rôle",
      year: "Année",
      category: "Catégorie",
      keyPointsEyebrow: "Points clés",
      mainFeatures: "Fonctionnalités principales",
      techStackEyebrow: "Stack technique",
      techUsed: "Technologies utilisées",
      nextProjectEyebrow: "Projet suivant",
      nextProjectBadge: "Projet #",
    },
    slider: {
      expandTitle: "Agrandir l'image",
      prevImage: "Image précédente",
      nextImage: "Image suivante",
    },
    notFound: {
      badge: "Erreur 404",
      title: "Page ou projet introuvable",
      description:
        "La page ou le projet que vous recherchez n'existe pas ou a été déplacé.",
      backHome: "Retour à l'accueil",
      viewProjects: "Explorer les projets",
    },
  },
  EN: {
    nav: {
      home: "Home",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      sayHi: "Contact Me",
    },
    hero: {
      eyebrow: "PORTFOLIO '26 · SOFTWARE ENGINEERING",
      rolePrefix: "Master's student specializing in ",
      roleHighlight: "Software Engineering",
      roles: ["web applications", "mobile applications", "video games"],
      descriptionPart1:
        "Passionate about software engineering and Full Stack development, I design and build modern, high-performance, and scalable ",
      descriptionPart2:
        ". From designing robust distributed architectures to polished user interfaces, I turn complex problems into reliable and sustainable digital solutions.",
      seeWorks: "View Projects",
      reachOut: "Contact Me",
    },
    about: {
      heading: "About me",
      description:
        "With more than five years of experience in software development, I focus on building full-stack web applications, APIs, and scalable cloud architectures. I enjoy working with ambitious teams that want to ship products that are fast, reliable, and beautifully crafted. Let's build something incredible together!",
    },
    skills: {
      eyebrow: "Tech Stack",
      heading: "My Skills",
      items: {
        Java: { subtitle: "OOP, Spring Boot, REST APIs & backend architectures" },
        React: { subtitle: "Modern interfaces, hooks & state management" },
        "Next.js": { subtitle: "SSR, App Router & full-stack applications" },
        TypeScript: { subtitle: "Strict typing for robust & maintainable code" },
        "Spring Boot": { subtitle: "Microservices, JWT security, JPA/Hibernate" },
        "Node.js": { subtitle: "Fast APIs with Express & async processing" },
        Python: { subtitle: "Data, automation scripts & machine learning" },
        PostgreSQL: { subtitle: "Data modeling, advanced queries & optimization" },
        MySQL: { subtitle: "Relational databases & schema design" },
        Docker: { subtitle: "Containerization & reproducible deployment" },
        Git: { subtitle: "Versioning, branching & collaborative workflows" },
        Linux: { subtitle: "System administration & command line" },
      },
    },
    projects: {
      heading: "Projects",
      liveButton: "View Project",
    },
    moreProjects: {
      eyebrow: "Projects & Achievements",
      headingMain: "Other ",
      headingAccent: "projects",
      subtext:
        "A curated selection of projects, software architectures, and complementary technical achievements.",
      viewAll: "View All Projects",
      entries: [
        {
          id: "01",
          title: "Designing high-performance Edge APIs with Cloudflare Workers & TypeScript",
          description:
            "Global microservices architecture with sub-50ms latency using worker bindings, smart caching, and zero cold start.",
          tag: "Architecture",
          readTime: "5 min read",
          date: "Aug 2026",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "02",
          title: "Micro-Frontend State Synchronization & Real-time Pipelines",
          description:
            "Designing isolated modules communicating via lightweight pub/sub event buses without tight coupling.",
          tag: "Full Stack",
          readTime: "7 min read",
          date: "Jul 2026",
          image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "03",
          title: "Mastering scroll-stacked card animations with Framer Motion",
          description:
            "Implementing a 60fps 3D card stack, scale interpolation, and magnetic interactions.",
          tag: "UI / Motion",
          readTime: "4 min read",
          date: "Jun 2026",
          image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=85",
        },
        {
          id: "04",
          title: "Designing resilient Offline-First architectures with Google Drive API",
          description:
            "Cloud synchronization, CDN image transformations, and client-side caching for dynamic showcases.",
          tag: "Cloud & Dev",
          readTime: "6 min read",
          date: "May 2026",
          image:
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=85",
        },
      ],
    },
    contact: {
      heading: "Contact",
      intro:
        "Have a project in mind or just want to chat? Send me a message and I'll get back to you as soon as possible.",
      contactEmail: "jack@example.com",
      location: "Based in Paris, France · Open to remote",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email address",
      messagePlaceholder: "Your message",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      successTitle: "Message sent!",
      successDesc: "Thank you for your message — I'll get back to you shortly.",
      errorMessage: "An error occurred while sending. Please try again or reach out directly by email.",
    },
    footer: {
      subtitle: "Master Software Engineering · Full Stack Developer",
      socialsTitle: "Socials",
      rights: "Bouadloune Samy — All rights reserved",
      crafted: "Crafted & developed with passion",
    },
    projectDetail: {
      backToProjects: "Back to projects",
      visit: "Visit",
      projectBadge: "PROJECT #",
      visitProject: "Visit project",
      sourceCode: "Source code",
      overviewEyebrow: "Overview",
      aboutProject: "About the project",
      client: "Client",
      role: "Role",
      year: "Year",
      category: "Category",
      keyPointsEyebrow: "Key points",
      mainFeatures: "Key features",
      techStackEyebrow: "Tech stack",
      techUsed: "Technologies used",
      nextProjectEyebrow: "Next project",
      nextProjectBadge: "Project #",
    },
    slider: {
      expandTitle: "Expand image",
      prevImage: "Previous image",
      nextImage: "Next image",
    },
    notFound: {
      badge: "404 Error",
      title: "Page or project not found",
      description:
        "The page or project you are looking for does not exist or has been moved.",
      backHome: "Back to Home",
      viewProjects: "Explore Projects",
    },
  },
};
