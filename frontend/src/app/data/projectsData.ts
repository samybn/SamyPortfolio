export interface ProjectDetail {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  client: string;
  year: string;
  role: string;
  liveUrl: string;
  githubUrl?: string;
  description: string;
  challenges?: string;
  features: string[];
  technologies: string[];
  images: string[];
  col1img1: string;
  col1img2: string;
  col2img: string;
}

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: "nextlevel-studio",
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    tagline: "Plateforme web immersive & identité digitale pour une agence créative de pointe.",
    client: "Nextlevel Studio Agency",
    year: "2026",
    role: "Lead Full Stack & Creative Developer",
    liveUrl: "https://nextlevelstudio.agency",
    githubUrl: "https://github.com/samybn/nextlevel-studio",
    description:
      "Nextlevel Studio est une plateforme web sur-mesure conçue pour une agence de design et de direction artistique haut de gamme. L'objectif était de concevoir une vitrine digitale spectaculaire alliant une identité visuelle futuriste, des transitions cinématiques fluides à 60 FPS et des performances de chargement optimales grâce au Server-Side Rendering (SSR). Le site intègre un système dynamique de présentation des cas clients, un portfolio filtrable et un tunnel de contact automatisé.",
    challenges:
      "Assurer un rendu fluide des animations complexes et des effets de scroll tout en maintenant un score Core Web Vitals supérieur à 95 et une compatibilité mobile irréprochable.",
    features: [
      "Navigation interactive et animations de défilement au pixel près avec GSAP et Framer Motion",
      "Système de design sombre premium avec finitions glassmorphism et dégradés néon personnalisés",
      "Architecture full-stack sécurisée avec API REST et validation stricte des données",
      "Optimisation SEO poussée avec balisage OpenGraph et temps de chargement sub-seconde",
      "Galerie média adaptative avec streaming d'images haute résolution et compression WebP",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Spring Boot",
      "Tailwind CSS",
      "GSAP",
      "PostgreSQL",
      "Docker",
    ],
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    ],
  },
  {
    id: "aura-brand-identity",
    number: "02",
    name: "Aura Brand Identity",
    category: "Personnel",
    tagline: "Système de design génératif et vitrine e-commerce de nouvelle génération.",
    client: "Aura Creative Lab",
    year: "2026",
    role: "Architecte Frontend & UI/UX Designer",
    liveUrl: "https://aurabrand.design",
    githubUrl: "https://github.com/samybn/aura-brand",
    description:
      "Aura est une étude de cas explorant le croisement entre identité visuelle futuriste et commerce digital interactif. Le projet introduit un système de palettes chromatiques dynamiques s'adaptant à l'heure de la journée et au comportement de l'utilisateur. Chaque produit est mis en valeur avec un carrousel 3D fluide, un aperçu à 360 degrés et une micro-typographie soignée.",
    challenges:
      "Créer une expérience de marque haut de gamme sans sacrifier l'accessibilité ni les performances sur les connexions réseau lentes.",
    features: [
      "Effets de distorsion visuelle et curseur magnétique interactif",
      "Système de panier fluide avec mise à jour optimiste de l'état en temps réel",
      "Architecture de composants modulaires et réutilisables basés sur Tailwind CSS",
      "Thème sombre immersif respectant les contrastes WCAG AA",
      "API de catalogue ultra-rapide avec mise en cache CDN",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Framer Motion",
      "MySQL",
    ],
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    ],
  },
  {
    id: "solaris-digital",
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    tagline: "Plateforme de supervision énergétique et monitoring IoT en temps réel.",
    client: "Solaris Energy Corp",
    year: "2026",
    role: "Ingénieur Full Stack & Data Architecture",
    liveUrl: "https://solaris-digital.io",
    githubUrl: "https://github.com/samybn/solaris-digital",
    description:
      "Solaris Digital est une suite SaaS de contrôle et d'analyse prédictive destinée aux gestionnaires de parcs photovoltaïques et d'infrastructures d'énergie propre. Le système ingère et traite des milliers de relevés télémétriques par seconde, agrégeant les données de production pour générer des tableaux de bord interactifs et des alertes automatiques d'anomalie.",
    challenges:
      "Gestion de gros volumes de séries temporelles avec rafraîchissement en temps réel sans latence d'affichage côté client.",
    features: [
      "Tableaux de bord analytiques temps réel avec streaming WebSockets",
      "Cartes de chaleur interactives et projections de rendement par IA (Python)",
      "Modélisation de données complexes avec requêtes PostgreSQL et indexation optimisée",
      "Gestion granulaire des permissions utilisateurs (RBAC) et logs d'audit",
      "Architecture cloud conteneurisée prête pour la haute disponibilité",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    ],
  },
  {
    id: "edge-api-workers",
    number: "04",
    name: "Edge API Workers",
    category: "Architecture",
    tagline: "Architecture de microservices globaux à latence sub-50ms avec Cloudflare Workers.",
    client: "Open Source / Projet Personnel",
    year: "2026",
    role: "Architecte Cloud & Backend",
    liveUrl: "https://github.com/samybn",
    githubUrl: "https://github.com/samybn",
    description:
      "Conception et implémentation d'une infrastructure d'APIs Edge distribuée mondialement à l'aide de Cloudflare Workers et TypeScript. Le projet met en œuvre un routage sub-50ms, la mise en cache multi-niveaux avec KV, le rate limiting intelligent et l'absence totale de cold start.",
    challenges:
      "Optimiser la taille du bundle d'exécution et gérer la cohérence éventuelle du cache distribué tout en assurant une haute tolérance aux pannes.",
    features: [
      "Déploiement serverless global distribué sur plus de 300 centres de données",
      "Rate limiting et protection anti-abus via Cloudflare KV",
      "Validation stricte des schémas et assainissement des entrées avec TypeScript",
      "Monitoring et télémétrie en temps réel",
      "Temps de réponse moyen mondial sous la barre des 50 millisecondes",
    ],
    technologies: [
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare KV",
      "Wrangler",
      "REST API",
      "Linux",
    ],
    col1img1:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&auto=format&fit=crop&q=85",
    col1img2:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=85",
    col2img:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&auto=format&fit=crop&q=85",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "micro-frontend-sync",
    number: "05",
    name: "Micro-Frontend Sync",
    category: "Full Stack",
    tagline: "Synchronisation d'état Micro-Frontend & bus d'événements pub/sub réactif.",
    client: "Laboratoire R&D",
    year: "2026",
    role: "Lead Frontend Engineer",
    liveUrl: "https://github.com/samybn",
    githubUrl: "https://github.com/samybn",
    description:
      "Architecture de micro-applications découplées communiquant en temps réel via un bus d'événements pub/sub léger et ultra-résilient. Permet à plusieurs équipes de développer, tester et déployer des modules de manière totalement autonome sans risque de collision d'état global.",
    challenges:
      "Garantir l'isolation stricte des dépendances CSS et JS tout en maintenant une synchronisation instantanée des données partagées.",
    features: [
      "Bus d'événements réactif type-safe avec gestion des listeners éphémères",
      "Intégration d'applications React et composants modulaires découplés",
      "Stratégie de synchronisation optimiste sans latence perçue",
      "Gestionnaire de cycle de vie et de montage dynamique",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "CI/CD",
      "Git",
    ],
    col1img1:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=85",
    col1img2:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&auto=format&fit=crop&q=85",
    col2img:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=85",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "framer-motion-stack",
    number: "06",
    name: "Motion Card Stack",
    category: "UI / Motion",
    tagline: "Système d'empilement de cartes 3D cinématique au défilement à 60 FPS.",
    client: "Projet Expérimental",
    year: "2026",
    role: "Creative Developer",
    liveUrl: "https://github.com/samybn",
    githubUrl: "https://github.com/samybn",
    description:
      "Implémentation haut de gamme d'un système de cartes empilées en 3D réagissant au défilement de l'utilisateur. Utilise les transformations matérielles GPU, l'interpolation d'échelle et des transitions fluides conçues pour immerger l'utilisateur sans impacter les performances de la page.",
    challenges:
      "Obtenir un taux de rafraîchissement constant à 60 FPS sur tous les appareils, y compris les mobiles d'entrée de gamme.",
    features: [
      "Calcul des coordonnées et scroll progress en temps réel avec Framer Motion",
      "Effets d'empilement sticky avec scaling automatique",
      "Accélération matérielle CSS et optimisations will-change",
      "Rendu responsive et adaptatif selon le ratio d'écran",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
    col1img1:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&auto=format&fit=crop&q=85",
    col1img2:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&auto=format&fit=crop&q=85",
    col2img:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&auto=format&fit=crop&q=85",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "offline-first-drive",
    number: "07",
    name: "Cloud Sync Engine",
    category: "Cloud & Dev",
    tagline: "Architecture de synchronisation média et mise en cache résiliente.",
    client: "Système Interne",
    year: "2026",
    role: "Architecte Cloud",
    liveUrl: "https://github.com/samybn",
    githubUrl: "https://github.com/samybn",
    description:
      "Moteur de synchronisation intelligent avec l'API Google Drive et stockage en cache côté client. Il permet la transformation dynamique des images, la génération de vignettes WebP et le fonctionnement continu même en mode hors-ligne ou connexion réseau dégradée.",
    challenges:
      "Gestion des quotas d'API, transformation d'images à la volée et politique d'invalidation de cache granulaire.",
    features: [
      "Mise en cache côté client avec IndexedDB et Service Workers",
      "Redimensionnement et optimisation automatique au format WebP",
      "Système de retry exponentiel pour les requêtes réseau instables",
      "Architecture prête pour le déploiement multi-cloud",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "Redis",
      "Google Drive API",
      "Linux",
    ],
    col1img1:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&auto=format&fit=crop&q=85",
    col1img2:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&auto=format&fit=crop&q=85",
    col2img:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&auto=format&fit=crop&q=85",
    images: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&auto=format&fit=crop&q=85",
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
