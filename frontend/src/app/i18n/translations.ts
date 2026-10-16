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
      eyebrow: "",
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
        Java:         { subtitle: "POO, design patterns et architectures backend" },
        C:            { subtitle: "Programmation bas niveau, pointeurs et gestion mémoire" },
        Dart:         { subtitle: "Développement mobile cross-platform avec Flutter" },
        React:        { subtitle: "Interfaces modernes, hooks et gestion d'état" },
        HTML:         { subtitle: "Structure sémantique et accessibilité web" },
        CSS:          { subtitle: "Design responsive, animations et Flexbox/Grid" },
        JavaScript:   { subtitle: "ES6+, DOM, async/await et logique front-end" },
        PHP:          { subtitle: "Développement back-end et applications web dynamiques" },
        Redis:        { subtitle: "Cache distribué, sessions et files de messages" },
        "CI/CD":      { subtitle: "Pipelines automatiques, GitHub Actions et déploiement continu" },
        MongoDB:      { subtitle: "Base NoSQL, agrégations et conception de schémas" },
        Python:       { subtitle: "Scripts, automatisation et traitement de données" },
        "Express.js": { subtitle: "APIs REST rapides et middlewares Node.js" },
        Git:          { subtitle: "Versioning, branches et workflows collaboratifs" },
        MySQL:        { subtitle: "Bases relationnelles et conception de schémas" },
        Linux:        { subtitle: "Administration système et ligne de commande" },
        TypeScript:   { subtitle: "Typage strict pour un code robuste et maintenable" },
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
          id: "saldaetrip",
          title: "SaldaeTrip — Guide touristique interactif et patrimoine de Béjaïa",
          description:
            "Application de découverte touristique avec circuits culturels, monuments historiques et fiches pratiques.",
          tag: "Tourisme & Web",
          readTime: "Projet Web",
          date: "2025 - 2026",
          image: "/projects/saldaetrip-1.png",
        },
        {
          id: "pong-game",
          title: "Pong Game — Réinterprétation moderne du jeu d'arcade rétro classique",
          description:
            "Jeu 2D avec moteur physique sur Canvas HTML5, IA adverse adaptative et boucle de rendu à 60 FPS.",
          tag: "Jeux Vidéo",
          readTime: "Projet Arcade",
          date: "2025",
          image: "/projects/pong-1.png",
        },
      ],
    },
    contact: {
      heading: "Contact",
      intro:
        "Vous avez un projet en tête ou souhaitez simplement échanger ? Envoyez-moi un message et je vous répondrai dans les plus brefs délais.",
      contactEmail: "jack@example.com",
      location: "Basé en Algérie · Ouvert au télétravail",
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
      subtitle: "Master Génie Logiciel",
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
      eyebrow: "",
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
        Java:         { subtitle: "OOP, design patterns & backend architectures" },
        C:            { subtitle: "Low-level programming, pointers & memory management" },
        Dart:         { subtitle: "Cross-platform mobile development with Flutter" },
        React:        { subtitle: "Modern interfaces, hooks & state management" },
        HTML:         { subtitle: "Semantic structure & web accessibility" },
        CSS:          { subtitle: "Responsive design, animations & Flexbox/Grid" },
        JavaScript:   { subtitle: "ES6+, DOM, async/await & front-end logic" },
        PHP:          { subtitle: "Back-end development & dynamic web applications" },
        Redis:        { subtitle: "Distributed cache, sessions & message queues" },
        "CI/CD":      { subtitle: "Automated pipelines, GitHub Actions & continuous deployment" },
        MongoDB:      { subtitle: "NoSQL database, aggregations & schema design" },
        Python:       { subtitle: "Scripts, automation & data processing" },
        "Express.js": { subtitle: "Fast REST APIs & Node.js middleware" },
        Git:          { subtitle: "Versioning, branching & collaborative workflows" },
        MySQL:        { subtitle: "Relational databases & schema design" },
        Linux:        { subtitle: "System administration & command line" },
        TypeScript:   { subtitle: "Strict typing for robust & maintainable code" },
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
          id: "saldaetrip",
          title: "SaldaeTrip — Interactive tourism guide & heritage of Béjaïa",
          description:
            "Tourism discovery application featuring cultural tours, historical landmarks, and practical travel guides.",
          tag: "Tourism & Web",
          readTime: "Web Project",
          date: "2025 - 2026",
          image: "/projects/saldaetrip-1.png",
        },
        {
          id: "pong-game",
          title: "Pong Game — Modern reinterpretation of the retro arcade classic",
          description:
            "2D Canvas HTML5 physics game with adaptive AI opponent and smooth 60 FPS rendering loop.",
          tag: "Video Games",
          readTime: "Arcade Project",
          date: "2025",
          image: "/projects/pong-1.png",
        },
      ],
    },
    contact: {
      heading: "Contact",
      intro:
        "Have a project in mind or just want to chat? Send me a message and I'll get back to you as soon as possible.",
      contactEmail: "jack@example.com",
      location: "Based in Algeria · Open to remote",
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
      subtitle: "Master Software Engineering",
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
