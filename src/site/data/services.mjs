// Service landing pages, one per search intent, in English and French. Each page proves
// its claims with real case studies (`projects` are slugs from projects.mjs) and
// preselects the matching project type in the contact form (`formValue`, from the radio
// options in the i18n files). Keep every claim backed by the portfolio.

export const servicePages = [
  {
    id: "website",
    projects: ["photodamour", "ffastcar"],
    formValue: { en: "Website", fr: "Site web" },
    en: {
      slug: "website-development-casablanca",
      navLabel: "Website development",
      metaTitle: "Website Development in Casablanca, Morocco | PixelWaves Digital",
      metaDescription:
        "Professional website design and development in Casablanca: fast, mobile-first business and brand websites built with Next.js, optimised for Google and for enquiries. Get a quote.",
      kicker: "Website development · Casablanca",
      h1: "Website development in Casablanca",
      lead: "Business and brand websites that load fast, look premium on every phone and turn visitors into calls, WhatsApp messages and quote requests.",
      intro:
        "Your website is often the first impression a client has of your business. We design and build it from scratch around your offer, your clients and the one action you want them to take.",
      features: [
        "Custom design, no generic template",
        "Mobile-first layout, tested on real phones",
        "Built with Next.js for very fast loading",
        "Technical SEO: titles, structured data, sitemap, performance",
        "Contact forms, WhatsApp and click-to-call",
        "Multilingual versions: French, English, Arabic",
        "Content you can update yourself with a headless CMS",
        "Redesign of an existing, outdated website",
      ],
      stack: ["Next.js", "React", "Headless WordPress", "Vercel"],
      faq: [
        {
          q: "How long does it take to build a website?",
          a: "A well-scoped brand or business website can go live within a few weeks. The exact timeline depends on the number of pages, the content and the features, and we set it together before we start.",
        },
        {
          q: "Will my website be optimised for Google?",
          a: "Yes. Every site ships with technical SEO built in: fast loading, clean page titles and descriptions, structured data, a sitemap and a mobile-first layout, which Google uses for ranking.",
        },
        {
          q: "Can you redesign my existing website?",
          a: "Yes. We regularly modernise outdated sites with a new visual identity, a clearer structure, a better mobile experience, faster performance and stronger SEO.",
        },
        {
          q: "Do you work with clients outside Casablanca?",
          a: "Yes. We are based in Casablanca and work remotely with clients across Morocco, France, Belgium, Switzerland and the UAE, in French or English.",
        },
      ],
    },
    fr: {
      slug: "creation-site-web-casablanca",
      navLabel: "Création de site web",
      metaTitle: "Création Site Web Casablanca : Site Internet Professionnel | PixelWaves",
      metaDescription:
        "Création de site internet professionnel à Casablanca : sites vitrines et sites de marque rapides, pensés mobile et optimisés pour Google et pour les demandes de devis. Devis sur demande.",
      kicker: "Création de site web · Casablanca",
      h1: "Création de site web à Casablanca",
      lead: "Des sites vitrines et sites de marque rapides, élégants sur chaque téléphone et pensés pour transformer les visiteurs en appels, messages WhatsApp et demandes de devis.",
      intro:
        "Votre site internet est souvent la première impression qu'un client a de votre entreprise. Nous le concevons et le développons sur mesure, autour de votre offre, de vos clients et de l'action que vous attendez d'eux.",
      features: [
        "Design sur mesure, sans template générique",
        "Pensé mobile d'abord, testé sur de vrais téléphones",
        "Développé en Next.js pour un chargement très rapide",
        "SEO technique : balises, données structurées, sitemap, performance",
        "Formulaires de contact, WhatsApp et appel en un clic",
        "Versions multilingues : français, anglais, arabe",
        "Contenu modifiable par vous grâce à un CMS headless",
        "Refonte de site internet existant",
      ],
      stack: ["Next.js", "React", "WordPress headless", "Vercel"],
      faq: [
        {
          q: "Combien de temps faut-il pour créer un site web ?",
          a: "Un site vitrine ou un site de marque bien cadré peut être mis en ligne en quelques semaines. Le délai exact dépend du nombre de pages, du contenu et des fonctionnalités, et nous le fixons ensemble avant de commencer.",
        },
        {
          q: "Mon site sera-t-il optimisé pour Google ?",
          a: "Oui. Chaque site intègre le SEO technique dès le départ : chargement rapide, titres et descriptions soignés, données structurées, sitemap et affichage mobile irréprochable, des critères utilisés par Google pour le classement.",
        },
        {
          q: "Pouvez-vous refondre mon site internet actuel ?",
          a: "Oui. Nous modernisons régulièrement des sites vieillissants : nouvelle identité visuelle, structure plus claire, meilleure expérience mobile, performances accrues et SEO renforcé.",
        },
        {
          q: "Travaillez-vous avec des clients hors de Casablanca ?",
          a: "Oui. Basés à Casablanca, nous travaillons à distance avec des clients partout au Maroc, en France, en Belgique, en Suisse et aux Émirats, en français ou en anglais.",
        },
      ],
    },
  },
  {
    id: "ecommerce",
    projects: ["elitegear", "mastertimepiece"],
    formValue: { en: "E-commerce", fr: "E-commerce" },
    en: {
      slug: "ecommerce-development-morocco",
      navLabel: "E-commerce development",
      metaTitle: "E-commerce Website Development in Morocco | PixelWaves Digital",
      metaDescription:
        "Online store development in Morocco and Europe: product catalogue, smooth checkout, payments, delivery and an easy back-office. Fast Next.js e-commerce built to sell. Get a quote.",
      kicker: "E-commerce · Morocco & Europe",
      h1: "E-commerce website development",
      lead: "Online stores that sell: a clear catalogue, a checkout without friction, payments and delivery set up, and a back-office your team can run every day.",
      intro:
        "We build e-commerce sites for brands that want more than a template: fast product pages, a buying journey designed to convert and a store that stays easy to manage as your catalogue grows.",
      features: [
        "Product catalogue with categories, filters and search",
        "Product pages designed to convert",
        "Cart and checkout optimised for mobile",
        "Online payment and delivery options",
        "Back-office for products, orders and stock",
        "Headless architecture: Next.js front end with a CMS",
        "Technical SEO for categories and product pages",
        "Analytics and conversion tracking",
      ],
      stack: ["Next.js", "Headless WordPress", "React", "Vercel"],
      faq: [
        {
          q: "Can you build an online store for the Moroccan market?",
          a: "Yes. We build stores for Moroccan brands and adapt the checkout, payment and delivery options to how your customers actually buy, including order confirmation by phone or WhatsApp when that suits your business.",
        },
        {
          q: "Will I be able to manage products and orders myself?",
          a: "Yes. Your team gets a back-office to add products, update prices and stock, and follow orders, without touching the code.",
        },
        {
          q: "Why a headless Next.js store rather than a template?",
          a: "A Next.js front end loads much faster than most templates, which improves both Google rankings and conversion rates on mobile, while the CMS behind it stays simple to use.",
        },
        {
          q: "Can you redesign or migrate an existing online store?",
          a: "Yes. We can rebuild the front end of an existing store, improve its speed and checkout, and migrate its catalogue while preserving your Google rankings with proper redirects.",
        },
      ],
    },
    fr: {
      slug: "creation-site-e-commerce-maroc",
      navLabel: "Création de site e-commerce",
      metaTitle: "Création Site E-commerce au Maroc : Boutique en Ligne | PixelWaves",
      metaDescription:
        "Création de site e-commerce au Maroc et en Europe : catalogue produits, tunnel d'achat fluide, paiement, livraison et back-office simple. Boutique en ligne rapide en Next.js. Demandez un devis.",
      kicker: "E-commerce · Maroc & Europe",
      h1: "Création de site e-commerce au Maroc",
      lead: "Des boutiques en ligne qui vendent : un catalogue clair, un tunnel d'achat sans friction, paiement et livraison configurés, et un back-office que votre équipe gère au quotidien.",
      intro:
        "Nous créons des sites e-commerce pour les marques qui veulent plus qu'un template : des fiches produits rapides, un parcours d'achat pensé pour convertir et une boutique qui reste simple à gérer quand votre catalogue grandit.",
      features: [
        "Catalogue produits avec catégories, filtres et recherche",
        "Fiches produits pensées pour convertir",
        "Panier et tunnel d'achat optimisés mobile",
        "Paiement en ligne et options de livraison",
        "Back-office pour produits, commandes et stock",
        "Architecture headless : front Next.js et CMS",
        "SEO technique des catégories et fiches produits",
        "Analytics et suivi des conversions",
      ],
      stack: ["Next.js", "WordPress headless", "React", "Vercel"],
      faq: [
        {
          q: "Pouvez-vous créer une boutique en ligne pour le marché marocain ?",
          a: "Oui. Nous créons des boutiques pour des marques marocaines et adaptons le paiement, la livraison et la validation des commandes à la façon dont vos clients achètent réellement, y compris la confirmation par téléphone ou WhatsApp si cela convient à votre activité.",
        },
        {
          q: "Pourrai-je gérer mes produits et mes commandes moi-même ?",
          a: "Oui. Votre équipe dispose d'un back-office pour ajouter des produits, modifier prix et stock, et suivre les commandes, sans toucher au code.",
        },
        {
          q: "Pourquoi une boutique headless en Next.js plutôt qu'un template ?",
          a: "Un front Next.js se charge bien plus vite que la plupart des templates, ce qui améliore à la fois le référencement Google et le taux de conversion sur mobile, tandis que le CMS reste simple à utiliser.",
        },
        {
          q: "Pouvez-vous refondre ou migrer une boutique existante ?",
          a: "Oui. Nous pouvons reconstruire le front d'une boutique existante, améliorer sa vitesse et son tunnel d'achat, et migrer son catalogue en préservant votre référencement grâce à des redirections propres.",
        },
      ],
    },
  },
  {
    id: "saas",
    projects: ["desirparent", "casaxa"],
    formValue: { en: "SaaS", fr: "SaaS" },
    en: {
      slug: "saas-web-application-development",
      navLabel: "SaaS & web applications",
      metaTitle: "SaaS & Web Application Development | PixelWaves Digital, Morocco",
      metaDescription:
        "SaaS and custom web application development: MVPs, user accounts, subscriptions, dashboards, APIs and B2B platforms, built with React, Next.js and Java/Spring Boot. Get a quote.",
      kicker: "SaaS & web applications",
      h1: "SaaS and web application development",
      lead: "From a first MVP to a product used every day: user accounts, subscriptions, dashboards and APIs, built on a stack that can grow with your business.",
      intro:
        "We help founders and companies turn an idea or an internal process into a working web product. We scope the smallest version worth launching, build it properly and keep improving it with you.",
      features: [
        "MVP scoped and launched quickly",
        "User accounts, roles and permissions",
        "Subscriptions and online payments",
        "Dashboards and back-offices",
        "APIs and integrations with your tools",
        "Web and mobile apps sharing one platform",
        "Multi-tenant architecture for B2B SaaS",
        "Cloud hosting, CI/CD and monitoring",
      ],
      stack: ["React", "Next.js", "Java / Spring Boot", "Supabase", "React Native", "Docker"],
      faq: [
        {
          q: "Can you build an MVP for my startup?",
          a: "Yes. We start by defining the smallest version that proves your idea with real users, then build it with a clean architecture so it can grow without a rewrite.",
        },
        {
          q: "Which technologies do you use for web applications?",
          a: "Mainly React and Next.js for the front end, and Java/Spring Boot or Supabase for the back end, depending on the project. For mobile we use Flutter or React Native.",
        },
        {
          q: "Can you take over or finish an existing application?",
          a: "Yes. We can audit an existing codebase, fix what blocks you and continue development, or plan a progressive rebuild when that is the better option.",
        },
        {
          q: "Do you provide maintenance after launch?",
          a: "Yes. We stay involved after launch for maintenance, new features, performance monitoring and improvements based on how your users actually use the product.",
        },
      ],
    },
    fr: {
      slug: "developpement-application-web-saas",
      navLabel: "Application web & SaaS",
      metaTitle: "Développement Application Web & SaaS sur Mesure | PixelWaves Maroc",
      metaDescription:
        "Développement d'applications web et de SaaS sur mesure : MVP, comptes utilisateurs, abonnements, dashboards, API et plateformes B2B, en React, Next.js et Java/Spring Boot. Demandez un devis.",
      kicker: "Applications web & SaaS",
      h1: "Développement d'application web et SaaS",
      lead: "Du premier MVP au produit utilisé chaque jour : comptes utilisateurs, abonnements, dashboards et API, sur une stack capable de grandir avec votre activité.",
      intro:
        "Nous aidons fondateurs et entreprises à transformer une idée ou un processus interne en produit web fonctionnel. Nous définissons la plus petite version utile à lancer, la construisons proprement et continuons à l'améliorer avec vous.",
      features: [
        "MVP cadré et lancé rapidement",
        "Comptes utilisateurs, rôles et permissions",
        "Abonnements et paiement en ligne",
        "Dashboards et back-offices",
        "API et intégrations avec vos outils",
        "Applications web et mobile sur une même plateforme",
        "Architecture multi-tenant pour SaaS B2B",
        "Hébergement cloud, CI/CD et supervision",
      ],
      stack: ["React", "Next.js", "Java / Spring Boot", "Supabase", "React Native", "Docker"],
      faq: [
        {
          q: "Pouvez-vous développer le MVP de ma startup ?",
          a: "Oui. Nous commençons par définir la plus petite version qui valide votre idée auprès de vrais utilisateurs, puis nous la construisons avec une architecture propre pour qu'elle évolue sans tout réécrire.",
        },
        {
          q: "Quelles technologies utilisez-vous pour les applications web ?",
          a: "Principalement React et Next.js côté front, et Java/Spring Boot ou Supabase côté back, selon le projet. Pour le mobile, nous utilisons Flutter ou React Native.",
        },
        {
          q: "Pouvez-vous reprendre ou terminer une application existante ?",
          a: "Oui. Nous pouvons auditer un code existant, corriger ce qui vous bloque et poursuivre le développement, ou planifier une refonte progressive si c'est la meilleure option.",
        },
        {
          q: "Assurez-vous la maintenance après la mise en ligne ?",
          a: "Oui. Nous restons impliqués après le lancement pour la maintenance, les nouvelles fonctionnalités, le suivi des performances et les améliorations basées sur l'usage réel de vos utilisateurs.",
        },
      ],
    },
  },
  {
    id: "platform",
    projects: ["makan", "casaxa"],
    formValue: { en: "Custom platform", fr: "Plateforme sur mesure" },
    en: {
      slug: "custom-platform-development",
      navLabel: "Custom platforms",
      metaTitle: "Custom Platform Development: Marketplaces, Booking, Dashboards | PixelWaves",
      metaDescription:
        "Custom platform development in Morocco: marketplaces, online booking and reservation systems, inventory platforms, customer portals and dashboards built around how your business works.",
      kicker: "Custom platforms",
      h1: "Custom platforms, marketplaces and booking systems",
      lead: "When an off-the-shelf tool no longer fits, we build the platform around how your business really works: inventory, bookings, requests, customer accounts and dashboards.",
      intro:
        "Marketplaces, reservation systems, inventory platforms and customer portals all have one thing in common: the business logic is yours. We turn it into a platform your clients enjoy using and your team can run.",
      features: [
        "Marketplaces connecting buyers and sellers",
        "Online booking and reservation systems",
        "Live inventory and catalogue management",
        "Customer and partner accounts",
        "Request, quote and lead workflows",
        "Admin dashboards for your team",
        "Multilingual platforms: French, English, Arabic",
        "Integrations with WhatsApp, email and your existing tools",
      ],
      stack: ["Next.js", "React", "Java / Spring Boot", "Supabase", "React Native"],
      faq: [
        {
          q: "Can you build an online booking or reservation system?",
          a: "Yes. We build booking flows around your real availability rules, with confirmation by email or WhatsApp and an admin view for your team to manage reservations.",
        },
        {
          q: "Can the platform be multilingual, including Arabic?",
          a: "Yes. Makan Luxury Motors, one of our platforms, runs in French, English and Arabic.",
        },
        {
          q: "Why a custom platform instead of an existing tool?",
          a: "Off-the-shelf tools work until your process no longer fits them. A custom platform follows your workflow exactly, has no per-user licence fees and belongs to you.",
        },
        {
          q: "How do we start a platform project?",
          a: "Send us a brief through the form or WhatsApp. We reply within 24 hours with our questions, then define the scope, priorities and estimate together.",
        },
      ],
    },
    fr: {
      slug: "developpement-plateforme-sur-mesure",
      navLabel: "Plateformes sur mesure",
      metaTitle: "Plateforme sur Mesure : Marketplace, Réservation en Ligne | PixelWaves",
      metaDescription:
        "Développement de plateformes sur mesure au Maroc : marketplaces, systèmes de réservation en ligne, gestion d'inventaire, espaces clients et dashboards, construits autour de votre activité.",
      kicker: "Plateformes sur mesure",
      h1: "Plateformes sur mesure, marketplaces et systèmes de réservation",
      lead: "Quand un outil standard ne suffit plus, nous construisons la plateforme autour du fonctionnement réel de votre activité : inventaire, réservations, demandes, espaces clients et dashboards.",
      intro:
        "Marketplaces, systèmes de réservation, plateformes d'inventaire et espaces clients ont un point commun : la logique métier est la vôtre. Nous la transformons en plateforme agréable pour vos clients et simple à piloter pour votre équipe.",
      features: [
        "Marketplaces entre acheteurs et vendeurs",
        "Systèmes de réservation en ligne",
        "Gestion d'inventaire et de catalogue en temps réel",
        "Espaces clients et partenaires",
        "Parcours de demandes, devis et leads",
        "Dashboards d'administration pour votre équipe",
        "Plateformes multilingues : français, anglais, arabe",
        "Intégrations WhatsApp, email et outils existants",
      ],
      stack: ["Next.js", "React", "Java / Spring Boot", "Supabase", "React Native"],
      faq: [
        {
          q: "Pouvez-vous créer un système de réservation en ligne ?",
          a: "Oui. Nous construisons des parcours de réservation autour de vos règles de disponibilité réelles, avec confirmation par email ou WhatsApp et une interface d'administration pour gérer les réservations.",
        },
        {
          q: "La plateforme peut-elle être multilingue, y compris en arabe ?",
          a: "Oui. Makan Luxury Motors, l'une de nos plateformes, fonctionne en français, en anglais et en arabe.",
        },
        {
          q: "Pourquoi une plateforme sur mesure plutôt qu'un outil existant ?",
          a: "Les outils standards fonctionnent jusqu'au jour où votre processus ne rentre plus dans leur cadre. Une plateforme sur mesure suit exactement votre fonctionnement, sans licence par utilisateur, et vous appartient.",
        },
        {
          q: "Comment démarrer un projet de plateforme ?",
          a: "Envoyez-nous un brief via le formulaire ou WhatsApp. Nous répondons sous 24 h avec nos questions, puis nous définissons ensemble le périmètre, les priorités et l'estimation.",
        },
      ],
    },
  },
];

export const servicePaths = {
  en: (page) => `/services/${page.en.slug}/`,
  fr: (page) => `/fr/services/${page.fr.slug}/`,
};

export function serviceAlternates(page) {
  return { en: servicePaths.en(page), fr: servicePaths.fr(page) };
}
