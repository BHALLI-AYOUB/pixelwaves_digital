// Portfolio. Screenshots for each slug live in public/work/ (see scripts/capture-projects.mjs).
// `shots` are the inner screens shown on each case study page: `url` plus optionally
// `scrollTo` (a selector), `scrollToText` (heading text) or `click` (link text),
// `nudge` (extra px down, or { desktop, mobile }) and `mobile: true` for the phone view.
// `logo` is the client's own logo, turned into a monochrome mark by scripts/client-logos.mjs:
// `background` says what to remove, `withName` adds the name beside symbol-only logos.
export const projects = [
  {
    slug: "elitegear",
    name: "EliteGear",
    url: "https://elitegear.ma/",
    domain: "elitegear.ma",
    logo: { src: "https://elitegear.ma/elitegear-logo.png", background: "transparent" },
    facts: [
      { value: "FR · EN", en: "bilingual storefront", fr: "boutique bilingue" },
      { value: "PC builder", en: "configure a complete setup", fr: "configurer un setup complet" },
      { value: "Compare", en: "products side by side", fr: "produits côte à côte" },
    ],
    shots: [
      { id: "catalogue", url: "https://elitegear.ma/pc-gamer", mobile: true, en: "Gaming PC catalogue with category filters", fr: "Catalogue PC gamer avec filtres par catégorie" },
      { id: "product", url: "https://elitegear.ma/product/pc-gaming-setup-ryzen-7-9800x3d-rx-9070-xt-16gb-32gb-ddr5-6000-1tb-nvme-b650-wifi", mobile: true, en: "Product page with full specifications", fr: "Fiche produit avec caractéristiques complètes" },
      { id: "components", url: "https://elitegear.ma/composants?type=cpu", en: "Components shop, filtered by processor", fr: "Boutique composants, filtrée par processeur" },
    ],
    en: {
      category: "E-commerce",
      sector: "Gaming hardware",
      description:
        "A premium Moroccan store for gaming PCs, laptops and components — full catalogue, category browsing, a PC configurator and WhatsApp support built into the buying journey.",
      overview:
        "EliteGear sells gaming PCs, laptops and components across Morocco. We built a storefront that makes a large, technical catalogue easy to browse and buy — from ready-to-play setups to single components — with WhatsApp support one tap away.",
      features: [
        "Catalogue organised by family: gaming PCs, laptops, components, screens and accessories",
        "Product pages with full technical specifications",
        "Filters by price, availability and component type",
        "PC configurator to build a complete setup",
        "Product comparison, wishlist and customer accounts",
        "French and English storefront with WhatsApp support",
      ],
      tags: ["Next.js", "Headless WordPress", "PC configurator", "FR / EN"],
    },
    fr: {
      category: "E-commerce",
      sector: "Matériel gaming",
      description:
        "Boutique marocaine premium de PC gamer, laptops et composants : catalogue complet, navigation par catégories, configurateur de PC et support WhatsApp intégré au parcours d'achat.",
      overview:
        "EliteGear vend des PC gamer, laptops et composants partout au Maroc. Nous avons conçu une boutique qui rend un catalogue vaste et technique simple à parcourir et à acheter — du setup prêt à jouer au composant seul — avec le support WhatsApp à portée de main.",
      features: [
        "Catalogue organisé par famille : PC gamer, laptops, composants, écrans et accessoires",
        "Fiches produits avec caractéristiques techniques complètes",
        "Filtres par prix, disponibilité et type de composant",
        "Configurateur pour composer un setup complet",
        "Comparateur, favoris et espace client",
        "Boutique en français et en anglais avec support WhatsApp",
      ],
      tags: ["Next.js", "WordPress headless", "Configurateur PC", "FR / EN"],
    },
  },
  {
    slug: "mastertimepiece",
    name: "Master Time Piece",
    url: "https://mastertimepiece.com/",
    domain: "mastertimepiece.com",
    logo: { src: "https://www.mastertimepiece.com/logo.png", background: "dark" },
    facts: [
      { value: "394", en: "watches in the catalogue", fr: "montres au catalogue" },
      { value: "13", en: "brands", fr: "marques" },
      { value: "32", en: "collections", fr: "collections" },
    ],
    shots: [
      { id: "collections", url: "https://www.mastertimepiece.com/collections", nudge: { desktop: 730, mobile: 560 }, mobile: true, en: "Collections index across 13 brands", fr: "Index des collections sur 13 marques" },
      { id: "product", url: "https://www.mastertimepiece.com/produits/rolex-daytona-icy-blue-automatic-watch-40mm", mobile: true, en: "Watch page with gallery and private advisor", fr: "Fiche montre avec galerie et conseiller privé" },
      { id: "catalogue", url: "https://www.mastertimepiece.com/produits", nudge: 640, en: "Full catalogue with brand filters", fr: "Catalogue complet avec filtres par marque" },
    ],
    en: {
      category: "E-commerce",
      sector: "Luxury watches",
      description:
        "A luxury watch boutique for Morocco: nearly 400 timepieces across 13 brands and 32 collections, with a private advisor, cash on delivery and a trilingual experience.",
      overview:
        "Master Time Piece offers premium watches in Morocco. The site had to feel as precise as the products: a calm, editorial catalogue where every timepiece gets its own stage, and a private advisor is always within reach.",
      features: [
        "Catalogue organised by brand, collection and gender",
        "Filters by brand, collection and selection",
        "Watch pages with photo gallery and key details",
        "Private advisor contact through WhatsApp",
        "Cash on delivery, delivery and returns information",
        "French, English and Arabic",
      ],
      tags: ["Next.js", "Vercel", "Product catalogue", "FR / EN / AR"],
    },
    fr: {
      category: "E-commerce",
      sector: "Horlogerie de luxe",
      description:
        "Horlogerie de luxe au Maroc : près de 400 montres, 13 marques et 32 collections, avec conseiller privé, paiement à la livraison et une expérience en trois langues.",
      overview:
        "Master Time Piece propose des montres premium au Maroc. Le site devait être aussi précis que les produits : un catalogue éditorial et apaisé où chaque montre a sa propre scène, et un conseiller privé toujours accessible.",
      features: [
        "Catalogue organisé par marque, collection et genre",
        "Filtres par marque, collection et sélection",
        "Fiches montres avec galerie photo et détails clés",
        "Conseiller privé joignable sur WhatsApp",
        "Paiement à la livraison, livraison et retours",
        "Français, anglais et arabe",
      ],
      tags: ["Next.js", "Vercel", "Catalogue produits", "FR / EN / AR"],
    },
  },
  {
    slug: "desirparent",
    name: "DésirParent",
    url: "https://desirparent.com/",
    domain: "desirparent.com",
    logo: { src: "https://desirparent.com/assets/logo-9M4Tgl0B.jpeg", background: "light", withName: true },
    facts: [
      { value: "4", en: "countries: France, Belgium, Switzerland, Québec", fr: "pays : France, Belgique, Suisse, Québec" },
      { value: "3", en: "steps to create a profile", fr: "étapes pour créer son profil" },
      { value: "3", en: "membership plans", fr: "formules d'abonnement" },
    ],
    shots: [
      { id: "how", url: "https://desirparent.com/", scrollTo: "#comment", mobile: true, en: "How it works, in three steps", fr: "Le fonctionnement, en trois étapes" },
      { id: "pricing", url: "https://desirparent.com/", scrollTo: "#tarifs", nudge: { desktop: 330, mobile: 430 }, mobile: true, en: "Membership plans and pricing", fr: "Formules d'abonnement et tarifs" },
      { id: "signup", url: "https://desirparent.com/inscription", en: "Profile creation flow", fr: "Parcours de création de profil" },
    ],
    en: {
      category: "SaaS platform",
      sector: "Co-parenting",
      description:
        "The first French-speaking co-parenting platform: member profiles, compatibility matching, private messaging and pricing plans for future parents in France, Belgium, Switzerland and Québec.",
      overview:
        "DésirParent connects French-speaking adults who want to become parents together. We designed a warm, trustworthy platform for a sensitive subject: clear onboarding, compatibility matching and private messaging.",
      features: [
        "Profile creation in three guided steps",
        "Compatibility matching between future parents",
        "Private messaging between members",
        "Free, Standard and Premium membership plans",
        "Testimonials, FAQ and support centre",
        "French and English",
      ],
      tags: ["React", "Vite", "Matching & messaging", "FR / EN"],
    },
    fr: {
      category: "Plateforme SaaS",
      sector: "Coparentalité",
      description:
        "La 1re plateforme francophone de coparentalité : profils membres, matching de compatibilité, messagerie privée et formules d'abonnement pour les futurs parents en France, Belgique, Suisse et au Québec.",
      overview:
        "DésirParent met en relation des adultes francophones qui veulent devenir parents ensemble. Nous avons conçu une plateforme chaleureuse et rassurante pour un sujet sensible : inscription claire, matching de compatibilité et messagerie privée.",
      features: [
        "Création de profil en trois étapes guidées",
        "Matching de compatibilité entre futurs parents",
        "Messagerie privée entre membres",
        "Formules Gratuit, Standard et Premium",
        "Témoignages, FAQ et centre de support",
        "Français et anglais",
      ],
      tags: ["React", "Vite", "Matching & messagerie", "FR / EN"],
    },
  },
  {
    slug: "photodamour",
    name: "Photo d'Amour",
    url: "https://photodiamour.com/",
    domain: "photodiamour.com",
    logo: { src: "https://www.photodiamour.com/assests/images/logo.png", background: "transparent", topBlockOnly: true },
    facts: [
      { value: "3", en: "packages: Silver, Gold, Royal", fr: "forfaits : Silver, Gold, Royal" },
      { value: "FR · EN", en: "bilingual website", fr: "site bilingue" },
      { value: "Worldwide", en: "available for destination weddings", fr: "disponible pour les mariages à l'étranger" },
    ],
    shots: [
      { id: "packages", url: "https://www.photodiamour.com/", scrollToText: "forfaits", nudge: { desktop: -80, mobile: -50 }, mobile: true, en: "Photography and film packages", fr: "Forfaits photo et film" },
      { id: "founder", url: "https://www.photodiamour.com/", scrollTo: "#fondateur", mobile: true, en: "The photographer behind the studio", fr: "Le photographe derrière le studio" },
      { id: "contact", url: "https://www.photodiamour.com/", scrollTo: "#contact", en: "Booking request form", fr: "Formulaire de demande de réservation" },
    ],
    en: {
      category: "Brand website",
      sector: "Wedding photography",
      description:
        "A cinematic website for a luxury wedding photography and film studio in Casablanca — packages, booking requests, a blog and a bilingual experience.",
      overview:
        "Photo d'Amour (Maison Diamour) captures weddings and private events in Casablanca and abroad. The site opens like a film: full-bleed imagery, elegant serif typography and a short, direct path to booking.",
      features: [
        "Cinematic homepage with full-screen imagery",
        "Three photography and film packages",
        "Founder presentation",
        "Booking request form and WhatsApp contact",
        "Client testimonials, blog and Instagram feed",
        "French and English",
      ],
      tags: ["Custom build", "Vercel", "Booking requests", "FR / EN"],
    },
    fr: {
      category: "Site de marque",
      sector: "Photographie de mariage",
      description:
        "Un site cinématographique pour un studio de photographie et de films de mariage de luxe à Casablanca : forfaits, demandes de réservation, blog et expérience bilingue.",
      overview:
        "Photo d'Amour (Maison Diamour) immortalise mariages et événements privés à Casablanca et à l'étranger. Le site s'ouvre comme un film : images plein écran, typographie serif élégante et un chemin court et direct vers la réservation.",
      features: [
        "Page d'accueil cinématographique avec images plein écran",
        "Trois forfaits photo et film",
        "Présentation du fondateur",
        "Formulaire de réservation et contact WhatsApp",
        "Témoignages clients, blog et fil Instagram",
        "Français et anglais",
      ],
      tags: ["Développement sur mesure", "Vercel", "Réservations", "FR / EN"],
    },
  },
  {
    slug: "ffastcar",
    name: "FFastCar",
    url: "https://ffastcar-amber.vercel.app/",
    domain: "ffastcar-amber.vercel.app",
    logo: { src: "https://ffastcar-amber.vercel.app/images/logo-20ab-20300pp-20.png", background: "transparent" },
    facts: [
      { value: "24/7", en: "assistance for renters", fr: "assistance pour les clients" },
      { value: "Home", en: "and airport vehicle delivery", fr: "livraison à domicile et à l'aéroport" },
      { value: "1 tap", en: "booking by phone or WhatsApp", fr: "réservation par téléphone ou WhatsApp" },
    ],
    shots: [
      { id: "fleet", url: "https://ffastcar-amber.vercel.app/", scrollTo: "#fleet", nudge: { desktop: 170, mobile: 180 }, mobile: true, en: "Premium fleet showcase", fr: "Vitrine de la flotte premium" },
      { id: "services", url: "https://ffastcar-amber.vercel.app/", scrollTo: "#services", mobile: true, en: "Services and rental advantages", fr: "Services et avantages de location" },
      { id: "contact", url: "https://ffastcar-amber.vercel.app/", scrollTo: "#contact", en: "Contact and booking section", fr: "Section contact et réservation" },
    ],
    en: {
      category: "Web development",
      sector: "Car rental",
      description:
        "A bold, conversion-focused site for a luxury car rental company in Rabat — premium fleet showcase, brand carousel and one-tap booking by phone or WhatsApp.",
      overview:
        "AB Fast Car rents premium vehicles in Rabat. The site has one job: turn visitors into bookings — a bold hero, the fleet front and centre, and a call or WhatsApp message always one tap away.",
      features: [
        "Fleet showcase with prices and vehicle details",
        "Premium brands carousel",
        "Services: VIP chauffeur, home delivery, recent luxury cars, 24/7 assistance",
        "How-it-works steps and customer testimonials",
        "Contact section with map directions",
        "One-tap booking by phone or WhatsApp",
      ],
      tags: ["Next.js", "Vercel", "Fleet showcase", "WhatsApp booking"],
    },
    fr: {
      category: "Développement web",
      sector: "Location automobile",
      description:
        "Un site audacieux et orienté conversion pour une agence de location de voitures de luxe à Rabat : vitrine de la flotte, carrousel de marques et réservation en un geste par téléphone ou WhatsApp.",
      overview:
        "AB Fast Car loue des véhicules premium à Rabat. Le site a une seule mission : transformer les visiteurs en réservations — un hero audacieux, la flotte au premier plan et un appel ou message WhatsApp toujours à un geste.",
      features: [
        "Vitrine de la flotte avec prix et détails des véhicules",
        "Carrousel des marques premium",
        "Services : chauffeur VIP, livraison à domicile, voitures récentes de luxe, assistance 24/7",
        "Étapes de réservation et témoignages clients",
        "Section contact avec itinéraire",
        "Réservation en un geste par téléphone ou WhatsApp",
      ],
      tags: ["Next.js", "Vercel", "Vitrine de flotte", "Réservation WhatsApp"],
    },
  },
  {
    slug: "makan",
    name: "Makan Luxury Motors",
    url: "https://www.makanluxurymotors.com/en",
    domain: "makanluxurymotors.com",
    logo: { src: "https://www.makanluxurymotors.com/logo.png", background: "dark" },
    facts: [
      { value: "3", en: "languages: French, English, Arabic", fr: "langues : français, anglais, arabe" },
      { value: "Live", en: "inventory of available vehicles", fr: "inventaire des véhicules disponibles" },
      { value: "Europe", en: "custom vehicle sourcing", fr: "recherche de véhicules sur mesure" },
    ],
    shots: [
      { id: "inventory", url: "https://www.makanluxurymotors.com/en/vente", mobile: true, en: "Live vehicle inventory", fr: "Inventaire de véhicules en temps réel" },
      { id: "vehicle", url: "https://www.makanluxurymotors.com/en/cars/mercedes-classe-a200-pack-amg-full-options", mobile: true, en: "Vehicle detail page", fr: "Fiche détaillée d'un véhicule" },
      { id: "sourcing", url: "https://www.makanluxurymotors.com/en/recherche-personnalisee", en: "Custom sourcing request", fr: "Demande de recherche personnalisée" },
    ],
    en: {
      category: "Custom platform",
      sector: "Luxury automotive",
      description:
        "A showroom platform for a luxury car dealer in Marrakech: up-to-date vehicle inventory, sales and import requests, and customer accounts — in French, English and Arabic.",
      overview:
        "Makan Luxury Motors runs a luxury car showroom in Marrakech. We built the platform around its real stock — every available vehicle online with its own page — plus import, custom sourcing and customer accounts.",
      features: [
        "Live inventory of available vehicles",
        "Vehicle pages with full photo galleries",
        "Custom sourcing requests across Europe",
        "Import service",
        "Customer accounts with sign-up and login",
        "French, English and Arabic",
      ],
      tags: ["Next.js", "Vercel", "Vehicle inventory", "FR / EN / AR"],
    },
    fr: {
      category: "Plateforme sur mesure",
      sector: "Automobile de luxe",
      description:
        "Une plateforme showroom pour un concessionnaire de voitures de luxe à Marrakech : inventaire de véhicules à jour, demandes de vente et d'import, et espace client — en français, anglais et arabe.",
      overview:
        "Makan Luxury Motors dirige un showroom de voitures de luxe à Marrakech. Nous avons construit la plateforme autour de son stock réel — chaque véhicule disponible en ligne avec sa propre page — ainsi que l'import, la recherche personnalisée et l'espace client.",
      features: [
        "Inventaire en ligne des véhicules disponibles",
        "Fiches véhicules avec galeries photo complètes",
        "Demandes de recherche personnalisée en Europe",
        "Service d'import",
        "Espace client avec inscription et connexion",
        "Français, anglais et arabe",
      ],
      tags: ["Next.js", "Vercel", "Inventaire véhicules", "FR / EN / AR"],
    },
  },
  {
    slug: "casaxa",
    name: "Casaxa",
    url: "https://www.casaxa.net/",
    domain: "casaxa.net",
    logo: { src: "https://www.casaxa.net/logo.png", background: "light", withName: true },
    facts: [
      { value: "12", en: "professional product categories", fr: "catégories métiers" },
      { value: "24h", en: "quote turnaround", fr: "pour recevoir un devis" },
      { value: "Web + app", en: "one product on every screen", fr: "un seul produit sur tous les écrans" },
    ],
    shots: [
      { id: "products", url: "https://www.casaxa.net/", click: "Produits", mobile: true, en: "Connected product catalogue", fr: "Catalogue produits connecté" },
      { id: "b2b", url: "https://www.casaxa.net/", click: "Login B2B", mobile: true, en: "Secure B2B customer portal", fr: "Portail client B2B sécurisé" },
      { id: "quote", url: "https://www.casaxa.net/", click: "Demander un devis", nudge: 380, en: "Quote request flow", fr: "Parcours de demande de devis" },
    ],
    en: {
      category: "B2B platform",
      sector: "Industrial & construction supply",
      description:
        "A connected catalogue for a professional B2B distributor: product categories, a secure B2B account for ordering and cart tracking, quote requests and WhatsApp support — delivered as both a web and a mobile app.",
      overview:
        "Casaxa supplies professional equipment for industry and construction. We built a connected catalogue with a separate B2B space where business customers order, follow their cart and request quotes — on the web and on mobile.",
      features: [
        "Product catalogue by professional category, with search",
        "Secure B2B login for business customers",
        "Centralised catalogue, order tracking and alerts",
        "Quote requests with a structured form",
        "Direct WhatsApp support",
        "Web and mobile app from one React Native codebase",
      ],
      tags: ["React Native", "B2B accounts", "Quote requests", "Web & mobile app"],
    },
    fr: {
      category: "Plateforme B2B",
      sector: "Distribution industrie & BTP",
      description:
        "Un catalogue connecté pour un distributeur professionnel B2B : catégories produits, espace B2B sécurisé pour commander et suivre le panier, demandes de devis et support WhatsApp — livré en application web et mobile.",
      overview:
        "Casaxa fournit du matériel professionnel pour l'industrie et le BTP. Nous avons construit un catalogue connecté avec un espace B2B séparé où les clients professionnels commandent, suivent leur panier et demandent des devis — sur le web comme sur mobile.",
      features: [
        "Catalogue produits par catégorie métier, avec recherche",
        "Connexion B2B sécurisée pour les clients professionnels",
        "Catalogue centralisé, suivi des commandes et alertes",
        "Demandes de devis via un formulaire structuré",
        "Support WhatsApp direct",
        "Application web et mobile à partir d'une seule base React Native",
      ],
      tags: ["React Native", "Espace B2B", "Demandes de devis", "Web & mobile"],
    },
  },
];

// Earlier builds without public screenshots, listed compactly under the showcase.
export const moreProjects = [
  {
    name: "VIAS Machine",
    url: "https://vias-machines.vercel.app/",
    en: { type: "Field operations web app", stack: "Supabase · Real-time admin dashboard" },
    fr: { type: "Application web terrain", stack: "Supabase · Dashboard admin temps réel" },
  },
  {
    name: "ERP Business Suite",
    en: { type: "ERP application", stack: "Spring Boot · React" },
    fr: { type: "Application ERP", stack: "Spring Boot · React" },
  },
];
