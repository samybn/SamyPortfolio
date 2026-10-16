export interface ProjectDetail {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  client: string;
  year: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  challenges?: string;
  features: string[];
  technologies: string[];
  images: string[];
  col1img1: string;
  col1img2?: string;
  col2img: string;
}

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: "detectinfo",
    number: "01",
    name: "DetectInfo",
    category: "Big Data & IA",
    tagline: "Plateforme analytique de traitement de flux massifs et détection intelligente d'anomalies.",
    client: "Projet Académique & R&D",
    year: "2025 - 2026",
    role: "Ingénieur Big Data & Full Stack",
    liveUrl: "",
    githubUrl: "https://github.com/samybn/projet-BIGDATA",
    description:
      "DetectInfo est une solution d'ingénierie logicielle et Big Data dédiée au traitement, à l'analyse et à la détection d'anomalies sur de larges flux de données. Conçue pour traiter des données volumineuses et hétérogènes, la plateforme met en œuvre des pipelines d'ingestion résilients, des algorithmes de filtrage avancés et des modèles analytiques permettant de restituer des métriques décisionnelles fiables en temps réel.",
    challenges:
      "Assurer l'ingestion distribuée et le partitionnement efficace de jeux de données massifs tout en conservant des temps de réponse rapides et une visualisation fluide des résultats.",
    features: [
      "Ingestion et nettoyage distribué de flux de données massifs",
      "Détection d'anomalies et modélisation analytique en continu",
      "Tableaux de bord dynamiques pour la visualisation des métriques critiques",
      "Architecture modulaire et scalable facilitant l'intégration de nouvelles sources",
      "Requêtage optimisé et agrégation distribuée pour des temps de réponse sub-secondes",
    ],
    technologies: [
      "Python",
      "Big Data",
      "Machine Learning",
      "FastAPI",
      "React",
      "TypeScript",
      "Docker",
      "Git",
    ],
    col1img1: "/projects/detectinfo-1.png",
    col1img2: "/projects/detectinfo-1.png",
    col2img: "/projects/detectinfo-1.png",
    images: [
      "/projects/detectinfo-1.png",
      "/projects/detectinfo-2.png",
    ],
  },
  {
    id: "karily",
    number: "02",
    name: "Karrily",
    category: "Web & Mobile",
    tagline: "Plateforme moderne de location de véhicules et gestion de flotte automobile en temps réel.",
    client: "Projet Innovant",
    year: "2025 - 2026",
    role: "Lead Full Stack Developer",
    liveUrl: "https://karilly.pages.dev",
    githubUrl: "https://github.com/RamyBenali/Karrily",
    description:
      "Karrily est une application web et mobile complète simplifiant la réservation, la location de véhicules et la gestion de flotte automobile en libre-service. La solution intègre une recherche multicritère intuitive, un calendrier dynamique des disponibilités, un tunnel de réservation fluide et un tableau de bord administratif complet.",
    challenges:
      "Garantir la cohérence des disponibilités en temps réel, prévenir les surréservations et offrir un temps de chargement instantané du catalogue de véhicules.",
    features: [
      "Système interactif de réservation en ligne avec calendrier de disponibilités",
      "Filtrage multicritère de la flotte (catégorie, motorisation, boîte, tarifs)",
      "Interface responsive conçue pour un usage mobile et desktop optimal",
      "Espace utilisateur avec historique des locations et gestion des contrats",
      "Architecture API sécurisée et synchronisation instantanée des états",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "REST API",
      "Git",
    ],
    col1img1: "/projects/karily-1.png",
    col1img2: "/projects/karily-1.png",
    col2img: "/projects/karily-1.png",
    images: [
      "/projects/karily-1.png",
      "/projects/karily-2.png",
      "/projects/karily-3.png",
      "/projects/karily-4.png",
    ],
  },
  {
    id: "nexus",
    number: "03",
    name: "Nexus",
    category: "Web Platform & Gaming",
    tagline: "Portail communautaire immersif et plateforme interactive pour serveurs de jeu.",
    client: "Communauté Nexus",
    year: "2025 - 2026",
    role: "Architecte Frontend & UI Designer",
    liveUrl: "https://nexus-df4.pages.dev",
    githubUrl: "https://github.com/ansusta/projectMc",
    description:
      "Nexus est un portail web moderne et immersif conçu pour une communauté de serveurs de jeu multijoueurs. Le site intègre la surveillance du statut et de l'affluence du serveur en temps réel, un catalogue d'articles et récompenses, des guides de progression complets et une direction artistique soignée.",
    challenges:
      "Concevoir une interface thématique percutante respectant les standards de modernité web tout en assurant des animations fluides et une réactivité instantanée.",
    features: [
      "Monitoring en temps réel de l'état du serveur et des joueurs connectés",
      "Direction artistique sombre premium avec micro-interactions et transitions soignées",
      "Catalogue d'articles, grades et intégration de vote communautaire",
      "Espace actualités, guides interactifs et règles officielles",
      "Rendu responsive et optimisé pour une consultation fluide sur mobile et desktop",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Motion",
      "REST API",
      "Git",
    ],
    col1img1: "/projects/nexus-1.png",
    col1img2: "/projects/nexus-1.png",
    col2img: "/projects/nexus-1.png",
    images: [
      "/projects/nexus-1.png",
      "/projects/nexus-2.png",
      "/projects/nexus-3.png",
      "/projects/nexus-4.png",
      "/projects/nexus-5.png",
    ],
  },
  {
    id: "saldaetrip",
    number: "04",
    name: "SaldaeTrip",
    category: "Tourisme & Web",
    tagline: "Guide touristique interactif et vitrine de découverte culturelle de Béjaïa.",
    client: "Projet Culture & Tourisme",
    year: "2025 - 2026",
    role: "Développeur Full Stack",
    liveUrl: "",
    githubUrl: "https://github.com/RamyBenali/SaldaeTrip",
    description:
      "SaldaeTrip est une application web conçue pour faire rayonner la richesse touristique, historique et naturelle de Béjaïa (l'antique Saldae). Les utilisateurs peuvent explorer les sites emblématiques, monuments historiques, parcs naturels et plages à travers des fiches illustrées et des parcours guidés.",
    challenges:
      "Structurer un catalogue multimédia riche et interactif garantissant une consultation rapide et agréable, même en situation de mobilité.",
    features: [
      "Exploration interactive des sites incontournables et trésors naturels de la région",
      "Fiches patrimoniales détaillées avec galeries photographiques et repères historiques",
      "Circuits thématiques et recommandations pratiques pour les voyageurs",
      "Interface ergonomique pensée mobile-first pour une utilisation fluide sur le terrain",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
      "Git",
    ],
    col1img1: "/projects/saldaetrip-1.png",
    col1img2: "/projects/saldaetrip-1.png",
    col2img: "/projects/saldaetrip-1.png",
    images: [
      "/projects/saldaetrip-1.png",
      "/projects/saldaetrip-2.png",
      "/projects/saldaetrip-3.png",
    ],
  },
  {
    id: "pong-game",
    number: "05",
    name: "Pong Game",
    category: "Jeux Vidéo & Web",
    tagline: "Réinterprétation moderne et dynamique du jeu d'arcade rétro classique Pong.",
    client: "Projet Ludique & Canvas",
    year: "2025",
    role: "Game Developer & Front-End",
    liveUrl: "",
    githubUrl: "https://github.com/samybn/ping-pong-",
    description:
      "Pong Game est une recréation moderne et dynamique du célèbre jeu d'arcade classique. Développé avec les technologies web et le Canvas HTML5, le jeu propose une physique de balle précise, une IA adverse réactive à difficulté croissante, des effets visuels contemporains et un taux de rafraîchissement à 60 FPS constants.",
    challenges:
      "Gérer la physique des collisions balle-raquettes, les angles de rebond dynamiques et synchroniser la boucle de rendu sans micro-saccades.",
    features: [
      "Moteur physique 2D fluide avec calcul d'angles de rebond en temps réel",
      "Mode solo avec intelligence artificielle progressive",
      "Effets visuels rétro revisités et feedback dynamique",
      "Gestion du score en direct et contrôles réactifs au clavier",
    ],
    technologies: [
      "JavaScript",
      "HTML5 Canvas",
      "CSS3",
      "Game Physics",
      "Git",
    ],
    col1img1: "/projects/pong-1.png",
    col1img2: "/projects/pong-1.png",
    col2img: "/projects/pong-1.png",
    images: [
      "/projects/pong-1.png",
      "/projects/pong-2.png",
      "/projects/pong-3.png",
    ],
  },
];

export function getProjectById(idOrNumber: string): ProjectDetail | undefined {
  const normalized = idOrNumber.toLowerCase().trim();
  return PROJECTS_DATA.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.number === normalized ||
      p.name.toLowerCase().replace(/\s+/g, "-") === normalized,
  );
}

export function getNextProject(currentId: string): ProjectDetail {
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === currentId);
  const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
  return PROJECTS_DATA[nextIndex];
}
