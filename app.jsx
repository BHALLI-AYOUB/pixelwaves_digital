import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const premiumEase = "cubic-bezier(0.4, 0, 0.2, 1)";

/* ─── DATA ─────────────────────────────────── */
const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projets",  label: "Projets" },
  { href: "#equipe",   label: "Équipe" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact",  label: "Contact" },
];

const brandLogoSources = ["./public/logo.png", "./logo.png"];

const services = [
  {
    title: "Sites vitrines premium",
    sub: "Présence & Image",
    description: "Des expériences de marque rapides, élégantes, mémorables — conçues pour convertir dès la première impression et imposer une autorité visuelle immédiate.",
    icon: "globe",
    imageSources: ["./public/sitevitrine.webp", "./sitevitrine.webp", "./public/sitevitrine.png", "./sitevitrine.png", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"],
    imagePosition: "top center",
    imageAlt: "Studio premium avec direction artistique et écrans de présentation",
    visualTag: "Brand & Luxe",
  },
  {
    title: "Plateformes web sur mesure",
    sub: "Produit & Croissance",
    description: "Des produits React robustes, pensés pour la croissance, l'autonomie de vos équipes et une architecture qui supporte l'évolution sans friction.",
    icon: "code",
    imageSources: ["./public/plateformweb.webp", "./plateformweb.webp", "./public/plateformweb.png", "./plateformweb.png", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"],
    imagePosition: "top center",
    imageAlt: "Dashboard produit et environnement de développement web moderne",
    visualTag: "Web Product",
  },
  {
    title: "Interfaces mobile-first",
    sub: "iOS & Android",
    description: "Des parcours fluides, des interactions nettes et une ergonomie pensée pour les usages réels. Performance native, rendu premium.",
    icon: "phone",
    imageSources: ["./public/android.webp", "./android.webp", "./public/android.png", "./android.png", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80"],
    imagePosition: "top center",
    imageAlt: "Smartphone affichant une interface mobile premium",
    visualTag: "Mobile UX",
  },
  {
    title: "Architecture & DevOps",
    sub: "Infrastructure & Scale",
    description: "Un socle technique stable, sécurisé et prêt à scaler sans dette inutile. CI/CD, Docker, cloud — tout ce qui libère votre croissance.",
    icon: "server",
    imageSources: ["./public/infrasturedevops.webp", "./infrasturedevops.webp", "./public/infrasturedevops.png", "./infrasturedevops.png", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80"],
    imagePosition: "top center",
    imageAlt: "Infrastructure cloud et serveurs pour architecture scalable",
    visualTag: "Cloud Stack",
  },
];

const reasons = [
  {
    title: "Positionnement premium",
    description: "Chaque écran, chaque mot et chaque animation sont calibrés pour inspirer confiance, valeur perçue et ambition de marque.",
  },
  {
    title: "Exécution rigoureuse",
    description: "Standards de qualité élevés, logique produit claire et souci obsessionnel du détail qui change réellement la perception.",
  },
  {
    title: "Technologie utile",
    description: "Nous faisons des choix techniques qui servent la vitesse, le SEO, la maintenance et les conversions — pas pour impressionner.",
  },
  {
    title: "Partenariat long terme",
    description: "PixelWave accompagne les marques ambitieuses au-delà du lancement pour faire évoluer leur présence avec cohérence et impact.",
  },
];

const projects = [
  {
    title: "Makan Luxury Motors",
    type: "Plateforme automobile premium",
    summary: "Plateforme web dynamique dédiée à la gestion de voitures de luxe, avec fonctionnalités liées à la vente et à l'achat de véhicules.",
    full: "Refonte d'une présence digitale orientée image de marque, storytelling et prise de rendez-vous avec une direction artistique luxe.",
    impacts: ["Image de marque plus statutaire", "Parcours de contact mieux cadré", "Stock mis en scène avec plus de désirabilité"],
    resultLead: "Résultats concrets",
    tags: ["Web dynamique", "Luxe", "CMS"],
    badge: "Projet réalisé",
    ctaLabel: "Voir le site live",
    href: "https://makanluxurymotors.com/",
    imageSources: ["./public/makanluxurymotors.webp", "./makanluxurymotors.webp", "./public/makanluxurymotors.png", "./makanluxurymotors.png", "./makan-preview.jpg"],
    imagePosition: "top center",
    imageAlt: "Capture du site Makan Luxury Motors",
  },
  {
    title: "ABFASTCAR",
    type: "Location de véhicules",
    summary: "Site web moderne pour une activité de location de voitures, pensé pour la présentation de flotte, la réservation et la conversion client.",
    full: "Conception d'une one-page stratégique combinant identité premium, architecture claire et messages orientés crédibilité pour capter des leads qualifiés.",
    impacts: ["Offre plus lisible dès le hero", "Flotte mieux valorisée", "CTA plus directs pour la réservation"],
    resultLead: "Résultats concrets",
    tags: ["Location", "Conversion", "Réservation"],
    badge: "Projet réalisé",
    ctaLabel: "Découvrir le site",
    href: "https://ffastcar.vercel.app/",
    imageSources: ["./public/fastcar.webp", "./fastcar.webp", "./public/fastcar.png", "./fastcar.png", "./ffast-preview.jpg"],
    imagePosition: "top center",
    imageAlt: "Capture du site ABFASTCAR",
  },
  {
    title: "VIAS Machine",
    type: "Application web Supabase",
    summary: "Application web de gestion et suivi en temps réel des machines de la société VIAS, avec formulaire de déclaration terrain et espace admin.",
    full: "Suivi en temps réel, formulaire de déclaration terrain et dashboard admin pour visualiser les déplacements et l'état du parc machine.",
    impacts: ["Déclaration terrain centralisée", "Suivi machine plus exploitable", "Vision admin unifiée en temps réel"],
    resultLead: "Résultats concrets",
    tags: ["Supabase", "Temps réel", "Dashboard admin"],
    badge: "Projet réalisé",
    ctaLabel: "Voir l'application",
    href: "https://vias-machines.vercel.app/",
    imageSources: ["./public/vias.webp", "./vias.webp", "./public/vias.png", "./vias.png", "./vias-preview.jpg"],
    imagePosition: "top center",
    imageAlt: "Capture de l'application VIAS Machine",
  },
  {
    title: "ERP Business Suite",
    type: "Application ERP Spring Boot + React",
    summary: "Application ERP développée avec Spring Boot et React pour centraliser les flux métier, les opérations et le pilotage quotidien.",
    full: "Architecture métier robuste, APIs structurées, interface React performante et dashboards orientés productivité pour une gestion ERP moderne.",
    impacts: ["Flux métier réunis dans un seul socle", "Back-office plus clair pour les équipes", "Pilotage quotidien mieux exploitable"],
    resultLead: "Résultats concrets",
    tags: ["Spring Boot", "React", "ERP"],
    badge: "Projet réalisé",
    ctaLabel: "Parler d'un projet similaire",
    imageSources: ["./public/erp.webp", "./erp.webp", "./public/erp.png", "./erp.png", "./erp-preview.svg"],
    imagePosition: "top center",
    imageAlt: "Capture de l'application ERP Business Suite",
  },
  {
    title: "Casaxa Stock Web",
    type: "Gestion de stock web",
    summary: "Application web de gestion de stock chez Casaxa pour suivre les articles, les inventaires, les mouvements et les alertes en temps réel.",
    full: "Dashboard web métier pour piloter les entrées, sorties, seuils critiques et inventaires avec une expérience claire, rapide et orientée exploitation.",
    impacts: ["Mouvements et seuils mieux visualisés", "Inventaires plus structurés", "Dashboard plus utile côté exploitation"],
    resultLead: "Résultats concrets",
    tags: ["Stock", "Web", "Dashboard"],
    badge: "Projet réalisé",
    ctaLabel: "Demander un projet similaire",
    imageSources: ["./public/casaxa.webp", "./casaxa.webp", "./public/casaxa.png", "./casaxa.png", "./casaxa-web-preview.svg"],
    imagePosition: "top center",
    imageAlt: "Capture de l'application web Casaxa de gestion de stock",
  },
  {
    title: "Casaxa Stock Mobile",
    type: "Gestion de stock mobile",
    summary: "Application mobile complémentaire à la plateforme web Casaxa pour les usages terrain, la saisie rapide et la synchronisation opérationnelle.",
    full: "Expérience mobile-first dédiée aux équipes terrain pour déclarer, consulter et synchroniser les mouvements de stock avec la plateforme web Casaxa.",
    impacts: ["Saisie terrain plus rapide", "Synchronisation plus fluide avec le web", "Usage mobile mieux adapté à l'opérationnel"],
    resultLead: "Résultats concrets",
    tags: ["Mobile", "Stock", "Synchronisation"],
    badge: "Team : Ayoub Bhalli",
    special: true,
    ctaLabel: "Parler d'un projet mobile",
    imageSources: ["./public/casaxamobile.webp", "./casaxamobile.webp", "./public/casaxamobile.png", "./casaxamobile.png", "./casaxa-mobile-preview.svg"],
    imagePosition: "top center",
    imageAlt: "Capture de l'application mobile Casaxa de gestion de stock",
  },
];

const team = [
  {
    name: "Ayoub Bhalli",
    role: "Full-Stack Web & Mobile",
    initials: "AB",
    imageSources: [
      "./public/ayoub-profile.jpg.png",
      "./ayoub-profile.jpg.png",
      "./public/ayoub-profile.jpg",
      "./ayoub-profile.jpg",
    ],
    imageAlt: "Photo de profil d'Ayoub Bhalli",
    bio: "Développeur Full-Stack spécialisé en solutions modernes, robustes et orientées métier. Background Java, Spring Boot, React et Flutter avec une sensibilité DevOps et Data.",
    skills: ["Java", "Spring Boot", "React", "Flutter", "Angular", "DevOps", "Azure", "Docker"],
    accentFrom: "#C9A84C",
    accentTo: "#6C3FE8",
  },
  {
    name: "Abdeljalil Ikhiar",
    role: "Développeur Full Stack",
    initials: "AI",
    imageSources: [
      "./public/abdeljalil.jfif",
      "./abdeljalil.jfif",
      "./public/abdeljalil.jpg",
      "./abdeljalil.jpg",
    ],
    imageAlt: "Photo de profil d'Abdeljalil Ikhiar",
    bio: "Conception et développement de solutions digitales performantes, de l'interface utilisateur à la logique métier et à l'intégration technique.",
    skills: ["Frontend", "Backend", "API", "UI/UX"],
    accentFrom: "#6C3FE8",
    accentTo: "#C9A84C",
  },
];

const metrics = [
  { value: 5,   suffix: "+", label: "projets premium livrés" },
  { value: 100, suffix: "%", label: "sur mesure & orienté résultats" },
  { value: 7,   suffix: "j", label: "pour lancer une vitrine agile" },
];

const aboutStats = [
  { value: "Design-first",  label: "Direction visuelle premium" },
  { value: "React",         label: "Base front-end moderne" },
  { value: "SEO-ready",     label: "Structure sémantique & performance" },
  { value: "Casablanca",    label: "Rayonnement local & international" },
];

const techSections = [
  {
    title: "Développement Full Stack",
    eyebrow: "Stack cœur",
    items: ["Java", "Spring Boot", "PHP", "Laravel", "Dart", "Flutter", "JavaScript", "TypeScript", "React", "Angular"],
  },
  {
    title: "DevOps & Cloud Infrastructure",
    eyebrow: "Delivery & scale",
    items: ["Docker", "GitHub Actions", "Azure", "Linux", "Nginx", "Git"],
  },
  {
    title: "Databases & Storage",
    eyebrow: "Data layer",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "Redis"],
  },
  {
    title: "Outils & Design",
    eyebrow: "Workflow",
    items: ["VS Code", "IntelliJ", "Postman", "Figma", "Frontend", "Backend", "API", "UI/UX"],
  },
];

const techCatalog = {
  "React": {
    icon: "react",
    color: "#61DAFB",
    ring: "rgba(97, 218, 251, 0.3)",
    glow: "rgba(97, 218, 251, 0.2)",
    bg: "linear-gradient(135deg, rgba(97, 218, 251, 0.16), rgba(97, 218, 251, 0.05))",
  },
  "Spring Boot": {
    icon: "spring",
    color: "#6DB33F",
    ring: "rgba(109, 179, 63, 0.32)",
    glow: "rgba(109, 179, 63, 0.2)",
    bg: "linear-gradient(135deg, rgba(109, 179, 63, 0.16), rgba(109, 179, 63, 0.05))",
  },
  "Azure": {
    icon: "azure",
    color: "#0078D4",
    ring: "rgba(0, 120, 212, 0.34)",
    glow: "rgba(0, 120, 212, 0.22)",
    bg: "linear-gradient(135deg, rgba(0, 120, 212, 0.18), rgba(0, 120, 212, 0.05))",
  },
  "Docker": {
    icon: "docker",
    color: "#2496ED",
    ring: "rgba(36, 150, 237, 0.34)",
    glow: "rgba(36, 150, 237, 0.2)",
    bg: "linear-gradient(135deg, rgba(36, 150, 237, 0.18), rgba(36, 150, 237, 0.05))",
  },
  "Flutter": {
    icon: "flutter",
    color: "#47C5FB",
    ring: "rgba(71, 197, 251, 0.34)",
    glow: "rgba(71, 197, 251, 0.22)",
    bg: "linear-gradient(135deg, rgba(71, 197, 251, 0.16), rgba(2, 119, 189, 0.06))",
  },
  "Java": {
    icon: "java",
    color: "#F89820",
    ring: "rgba(248, 152, 32, 0.34)",
    glow: "rgba(248, 152, 32, 0.2)",
    bg: "linear-gradient(135deg, rgba(248, 152, 32, 0.16), rgba(248, 152, 32, 0.05))",
  },
  "Angular": {
    icon: "angular",
    color: "#DD0031",
    ring: "rgba(221, 0, 49, 0.34)",
    glow: "rgba(221, 0, 49, 0.2)",
    bg: "linear-gradient(135deg, rgba(221, 0, 49, 0.18), rgba(221, 0, 49, 0.05))",
  },
  "PHP": {
    icon: "php",
    color: "#777BB4",
    ring: "rgba(119, 123, 180, 0.34)",
    glow: "rgba(119, 123, 180, 0.2)",
    bg: "linear-gradient(135deg, rgba(119, 123, 180, 0.18), rgba(119, 123, 180, 0.05))",
  },
  "Laravel": {
    icon: "laravel",
    color: "#FF2D20",
    ring: "rgba(255, 45, 32, 0.34)",
    glow: "rgba(255, 45, 32, 0.2)",
    bg: "linear-gradient(135deg, rgba(255, 45, 32, 0.18), rgba(255, 45, 32, 0.05))",
  },
  "Dart": {
    icon: "dart",
    color: "#0175C2",
    ring: "rgba(1, 117, 194, 0.34)",
    glow: "rgba(1, 117, 194, 0.2)",
    bg: "linear-gradient(135deg, rgba(1, 117, 194, 0.18), rgba(1, 117, 194, 0.05))",
  },
  "JavaScript": {
    icon: "javascript",
    color: "#F7DF1E",
    ring: "rgba(247, 223, 30, 0.36)",
    glow: "rgba(247, 223, 30, 0.2)",
    bg: "linear-gradient(135deg, rgba(247, 223, 30, 0.2), rgba(247, 223, 30, 0.06))",
  },
  "TypeScript": {
    icon: "typescript",
    color: "#3178C6",
    ring: "rgba(49, 120, 198, 0.34)",
    glow: "rgba(49, 120, 198, 0.2)",
    bg: "linear-gradient(135deg, rgba(49, 120, 198, 0.18), rgba(49, 120, 198, 0.05))",
  },
  "DevOps": {
    icon: "devops",
    color: "#A855F7",
    ring: "rgba(168, 85, 247, 0.34)",
    glow: "rgba(168, 85, 247, 0.2)",
    bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.16), rgba(168, 85, 247, 0.05))",
  },
  "Frontend": {
    icon: "frontend",
    color: "#FBBF24",
    ring: "rgba(251, 191, 36, 0.34)",
    glow: "rgba(251, 191, 36, 0.2)",
    bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(251, 191, 36, 0.05))",
  },
  "Backend": {
    icon: "backend",
    color: "#38BDF8",
    ring: "rgba(56, 189, 248, 0.34)",
    glow: "rgba(56, 189, 248, 0.2)",
    bg: "linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(56, 189, 248, 0.05))",
  },
  "API": {
    icon: "api",
    color: "#EAB308",
    ring: "rgba(234, 179, 8, 0.34)",
    glow: "rgba(234, 179, 8, 0.2)",
    bg: "linear-gradient(135deg, rgba(234, 179, 8, 0.16), rgba(234, 179, 8, 0.05))",
  },
  "UI/UX": {
    icon: "uiux",
    color: "#F472B6",
    ring: "rgba(244, 114, 182, 0.34)",
    glow: "rgba(244, 114, 182, 0.2)",
    bg: "linear-gradient(135deg, rgba(244, 114, 182, 0.16), rgba(244, 114, 182, 0.05))",
  },
  "GitHub Actions": {
    icon: "githubactions",
    color: "#2088FF",
    ring: "rgba(32, 136, 255, 0.34)",
    glow: "rgba(32, 136, 255, 0.2)",
    bg: "linear-gradient(135deg, rgba(32, 136, 255, 0.18), rgba(32, 136, 255, 0.05))",
  },
  "Linux": {
    icon: "linux",
    color: "#FACC15",
    ring: "rgba(250, 204, 21, 0.34)",
    glow: "rgba(250, 204, 21, 0.18)",
    bg: "linear-gradient(135deg, rgba(250, 204, 21, 0.18), rgba(250, 204, 21, 0.05))",
  },
  "Nginx": {
    icon: "nginx",
    color: "#00A63F",
    ring: "rgba(0, 166, 63, 0.34)",
    glow: "rgba(0, 166, 63, 0.2)",
    bg: "linear-gradient(135deg, rgba(0, 166, 63, 0.18), rgba(0, 166, 63, 0.05))",
  },
  "Git": {
    icon: "git",
    color: "#F05032",
    ring: "rgba(240, 80, 50, 0.34)",
    glow: "rgba(240, 80, 50, 0.2)",
    bg: "linear-gradient(135deg, rgba(240, 80, 50, 0.18), rgba(240, 80, 50, 0.05))",
  },
  "MySQL": {
    icon: "mysql",
    color: "#00758F",
    ring: "rgba(0, 117, 143, 0.34)",
    glow: "rgba(0, 117, 143, 0.2)",
    bg: "linear-gradient(135deg, rgba(0, 117, 143, 0.18), rgba(0, 117, 143, 0.05))",
  },
  "PostgreSQL": {
    icon: "postgresql",
    color: "#336791",
    ring: "rgba(51, 103, 145, 0.34)",
    glow: "rgba(51, 103, 145, 0.2)",
    bg: "linear-gradient(135deg, rgba(51, 103, 145, 0.18), rgba(51, 103, 145, 0.05))",
  },
  "MongoDB": {
    icon: "mongodb",
    color: "#13AA52",
    ring: "rgba(19, 170, 82, 0.34)",
    glow: "rgba(19, 170, 82, 0.2)",
    bg: "linear-gradient(135deg, rgba(19, 170, 82, 0.18), rgba(19, 170, 82, 0.05))",
  },
  "Firebase": {
    icon: "firebase",
    color: "#FFCA28",
    ring: "rgba(255, 202, 40, 0.34)",
    glow: "rgba(255, 202, 40, 0.2)",
    bg: "linear-gradient(135deg, rgba(255, 202, 40, 0.18), rgba(255, 202, 40, 0.05))",
  },
  "Supabase": {
    icon: "supabase",
    color: "#3ECF8E",
    ring: "rgba(62, 207, 142, 0.34)",
    glow: "rgba(62, 207, 142, 0.2)",
    bg: "linear-gradient(135deg, rgba(62, 207, 142, 0.18), rgba(62, 207, 142, 0.05))",
  },
  "Redis": {
    icon: "redis",
    color: "#DC382D",
    ring: "rgba(220, 56, 45, 0.34)",
    glow: "rgba(220, 56, 45, 0.2)",
    bg: "linear-gradient(135deg, rgba(220, 56, 45, 0.18), rgba(220, 56, 45, 0.05))",
  },
  "VS Code": {
    icon: "vscode",
    color: "#007ACC",
    ring: "rgba(0, 122, 204, 0.34)",
    glow: "rgba(0, 122, 204, 0.2)",
    bg: "linear-gradient(135deg, rgba(0, 122, 204, 0.18), rgba(0, 122, 204, 0.05))",
  },
  "IntelliJ": {
    icon: "intellij",
    color: "#FC4C02",
    ring: "rgba(252, 76, 2, 0.34)",
    glow: "rgba(252, 76, 2, 0.2)",
    bg: "linear-gradient(135deg, rgba(252, 76, 2, 0.18), rgba(168, 85, 247, 0.08))",
  },
  "Postman": {
    icon: "postman",
    color: "#FF6C37",
    ring: "rgba(255, 108, 55, 0.34)",
    glow: "rgba(255, 108, 55, 0.2)",
    bg: "linear-gradient(135deg, rgba(255, 108, 55, 0.18), rgba(255, 108, 55, 0.05))",
  },
  "Figma": {
    icon: "figma",
    color: "#A259FF",
    ring: "rgba(162, 89, 255, 0.34)",
    glow: "rgba(162, 89, 255, 0.2)",
    bg: "linear-gradient(135deg, rgba(162, 89, 255, 0.18), rgba(242, 78, 30, 0.08))",
  },
  "default": {
    icon: "api",
    color: "#C9A84C",
    ring: "rgba(201, 168, 76, 0.34)",
    glow: "rgba(201, 168, 76, 0.2)",
    bg: "linear-gradient(135deg, rgba(201, 168, 76, 0.16), rgba(201, 168, 76, 0.05))",
  },
};

const heroHighlights = [
  "Direction artistique premium",
  "Architecture web & mobile sur mesure",
  "SEO, performance & conversion",
  "Casablanca → rayonnement international",
];

const contactAssurances = [
  { value: "< 24h", label: "réponse sur devis" },
  { value: "WhatsApp", label: "contact direct" },
  { value: "Sur mesure", label: "approche projet" },
];

const contactDetails = [
  { label: "Email",   value: "pixelwaves_digital@outlook.com", href: "mailto:pixelwaves_digital@outlook.com", icon: "mail" },
  { label: "Téléphone", value: "+212 776-356930", href: "tel:+212776356930", icon: "phone" },
  { label: "Adresse", value: "Casablanca, Maroc", href: "https://maps.google.com/?q=Casablanca,Maroc", icon: "pin" },
];

const socialLinks = [
  {
    label: "Instagram",
    value: "@pixelwave_digital",
    href: "https://www.instagram.com/pixelwave_digital/",
    icon: "instagram",
    background: "linear-gradient(135deg, #FD1D1D 0%, #F77737 35%, #FCAF45 55%, #C13584 78%, #833AB4 100%)",
    color: "#FFFFFF",
  },
  {
    label: "LinkedIn",
    value: "pixelwaves-digital",
    href: "https://www.linkedin.com/company/pixelwaves-digital/",
    icon: "linkedin",
    background: "linear-gradient(135deg, #0A66C2 0%, #3B82F6 100%)",
    color: "#FFFFFF",
  },
  {
    label: "GitHub",
    value: "BHALLI-AYOUB",
    href: "https://github.com/BHALLI-AYOUB",
    icon: "github",
    background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
    color: "#FFFFFF",
  },
  {
    label: "WhatsApp",
    value: "+212 776-356930",
    href: "https://wa.me/212776356930",
    icon: "whatsapp",
    background: "linear-gradient(135deg, #25D366 0%, #16A34A 100%)",
    color: "#FFFFFF",
  },
];

const quickContactItems = [
  { label: "Téléphone", value: "+212 776-356930", href: "tel:+212776356930", icon: "phone" },
  { label: "Email", value: "pixelwaves_digital@outlook.com", href: "mailto:pixelwaves_digital@outlook.com", icon: "mail" },
  { label: "Adresse", value: "Casablanca, Maroc", href: "https://maps.google.com/?q=Casablanca,Maroc", icon: "pin" },
  { label: "Disponibilité", value: "Disponible 24/7", icon: "clock" },
];

const whatsappAppointmentHref = `https://wa.me/212776356930?text=${encodeURIComponent(
  "Bonjour PixelWave, je souhaite planifier un appel pour discuter de mon projet digital."
)}`;

const faqItems = [
  {
    question: "En combien de temps pouvez-vous lancer un projet ?",
    answer: "Pour une vitrine premium bien cadrée, nous pouvons lancer rapidement. Les projets plus complets, comme une application métier ou un espace client, suivent un calendrier structuré selon le périmètre.",
  },
  {
    question: "Travaillez-vous uniquement sur le design ou aussi sur la partie technique ?",
    answer: "Nous gérons la direction visuelle, l'intégration front-end, les bases techniques, les formulaires, l'optimisation responsive et la logique produit nécessaire à un rendu réellement exploitable.",
  },
  {
    question: "Est-ce que vous pouvez reprendre un site existant ?",
    answer: "Oui. Refonte visuelle, restructuration des sections, amélioration du message, nettoyage de l'expérience mobile et modernisation technique font partie des missions que nous menons régulièrement.",
  },
  {
    question: "Que se passe-t-il après la mise en ligne ?",
    answer: "Nous pouvons continuer sur l'optimisation, les évolutions, le suivi UX, les nouvelles sections, l'amélioration des conversions et le maintien d'un niveau de qualité cohérent dans le temps.",
  },
  {
    question: "Comment démarre la collaboration ?",
    answer: "Vous nous envoyez un brief via le formulaire ou WhatsApp, nous revenons avec une direction claire, puis nous cadrons le périmètre, les priorités et la meilleure approche pour votre présence digitale.",
  },
];

const clientLogos = [
  {
    name: "Makan Luxury Motors",
    mark: "MLM",
    sector: "Automobile premium",
    avatarSources: ["https://randomuser.me/api/portraits/women/44.jpg"],
    avatarAlt: "Avatar client Makan Luxury Motors",
    avatarFallback: "MLM",
  },
  {
    name: "ABFASTCAR",
    mark: "FFC",
    sector: "Location & conversion",
    avatarSources: ["https://randomuser.me/api/portraits/men/32.jpg"],
    avatarAlt: "Avatar client ABFASTCAR",
    avatarFallback: "FFC",
  },
  {
    name: "VIAS Machine",
    mark: "VIAS",
    sector: "Ops & suivi terrain",
    avatarSources: ["https://randomuser.me/api/portraits/men/75.jpg"],
    avatarAlt: "Avatar client VIAS Machine",
    avatarFallback: "VIAS",
  },
  {
    name: "Casaxa",
    mark: "CSX",
    sector: "Gestion de stock",
    avatarSources: ["https://randomuser.me/api/portraits/women/68.jpg"],
    avatarAlt: "Avatar client Casaxa",
    avatarFallback: "CSX",
  },
  {
    name: "ERP Business Suite",
    mark: "ERP",
    sector: "Pilotage métier",
    avatarSources: ["https://randomuser.me/api/portraits/men/54.jpg"],
    avatarAlt: "Avatar client ERP Business Suite",
    avatarFallback: "ERP",
  },
];

const testimonials = [
  {
    quote: "Une présence beaucoup plus crédible, un positionnement mieux cadré et un parcours de contact plus naturel dès les premiers écrans.",
    author: "Makan Luxury Motors",
    role: "Plateforme automobile premium",
    person: "Direction de marque",
    avatarSources: ["https://randomuser.me/api/portraits/women/44.jpg"],
    avatarAlt: "Avatar client pour le témoignage Makan Luxury Motors",
    avatarFallback: "ML",
    avatarPosition: "center",
    stars: 5,
    proof: "Image de marque clarifiée · storytelling luxe · prise de rendez-vous mieux mise en scène",
  },
  {
    quote: "Le site met mieux en valeur l'offre, simplifie la lecture de la flotte et donne une impression plus sérieuse dès l'arrivée sur la page.",
    author: "ABFASTCAR",
    role: "Location de véhicules",
    person: "Responsable acquisition",
    avatarSources: ["https://randomuser.me/api/portraits/men/32.jpg"],
    avatarAlt: "Avatar client pour le témoignage ABFASTCAR",
    avatarFallback: "FC",
    avatarPosition: "center",
    stars: 5,
    proof: "Présentation plus claire · crédibilité renforcée · conversion orientée lead",
  },
  {
    quote: "Le produit donne une vision plus exploitable du terrain et rend la déclaration quotidienne plus simple pour les équipes opérationnelles.",
    author: "VIAS Machine",
    role: "Application web terrain",
    person: "Pilotage opérationnel",
    avatarSources: ["https://randomuser.me/api/portraits/men/75.jpg"],
    avatarAlt: "Avatar client pour le témoignage VIAS Machine",
    avatarFallback: "VM",
    avatarPosition: "center",
    stars: 5,
    proof: "Suivi plus lisible · saisie plus rapide · pilotage admin unifié",
  },
];

const processSteps = [
  {
    number: "01",
    icon: "badge",
    title: "Cadrage & positionnement",
    description: "Nous clarifions votre offre, votre niveau de marque, votre cible et le bon angle de perception avant de produire la moindre interface.",
    points: ["Audit de l'image actuelle", "Objectif business clarifié", "Direction de message assumée"],
  },
  {
    number: "02",
    icon: "globe",
    title: "Direction visuelle premium",
    description: "Nous construisons une identité écran plus forte: hiérarchie, rythme, typographie, ton et ambiance pour que la valeur se perçoive immédiatement.",
    points: ["Moodboard & UI direction", "Architecture des sections", "Expérience plus désirable"],
  },
  {
    number: "03",
    icon: "code",
    title: "Production & intégration",
    description: "Le design prend vie dans une base propre, performante et évolutive, avec un niveau de détail qui tient aussi bien sur desktop que mobile.",
    points: ["React & Tailwind structurés", "Animations fluides", "Responsive précis"],
  },
  {
    number: "04",
    icon: "server",
    title: "Lancement & optimisation",
    description: "Nous livrons un site prêt à performer: vitesse, lisibilité, CTA clairs et capacité à soutenir la crédibilité commerciale dans le temps.",
    points: ["SEO & performance", "CTA plus convaincants", "Base prête à évoluer"],
  },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─── ICONS ─────────────────────────────────── */
function Icon({ name, className = "h-5 w-5" }) {
  const c = { className, fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": "true" };
  switch (name) {
    case "globe": return <svg {...c}><path d="M3 12h18"/><path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"/><circle cx="12" cy="12" r="9"/></svg>;
    case "code": return <svg {...c}><path d="m8 16-4-4 4-4"/><path d="m16 8 4 4-4 4"/><path d="m14 4-4 16"/></svg>;
    case "phone": return <svg {...c}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>;
    case "server": return <svg {...c}><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01"/></svg>;
    case "check": return <svg {...c}><path d="m5 12 4.2 4.2L19 6.5"/></svg>;
    case "arrow": return <svg {...c}><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>;
    case "mail": return <svg {...c}><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>;
    case "pin": return <svg {...c}><path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "clock": return <svg {...c}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.8v4.7l3.1 1.9"/></svg>;
    case "calendar": return <svg {...c}><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M8 3.5v3M16 3.5v3M4 9.5h16"/></svg>;
    case "badge": return <svg {...c}><path d="M12 3.8 7.4 5.7v4.8c0 3.1 2 5.9 4.6 6.9 2.6-1 4.6-3.8 4.6-6.9V5.7Z"/><path d="m9.6 10.6 1.6 1.6 3.2-3.3"/></svg>;
    case "menu": return <svg {...c}><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>;
    case "close": return <svg {...c}><path d="M6 6 18 18"/><path d="M18 6 6 18"/></svg>;
    case "link": return <svg {...c}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
    case "instagram": return <svg {...c}><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.5h.01"/></svg>;
    case "linkedin": return <svg {...c}><path d="M8 10v7"/><path d="M12 17v-4.2a2.3 2.3 0 0 1 4.6 0V17"/><path d="M8 7.5h.01"/><rect x="4" y="4" width="16" height="16" rx="2.5"/></svg>;
    case "github": return <svg {...c}><path d="M9 19c-4 1.2-4-2-6-2"/><path d="M15 21v-3.1a2.7 2.7 0 0 0-.8-2.1c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.2 1.2a11.1 11.1 0 0 0-6 0C6.8 3.5 5.8 3.8 5.8 3.8a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.5 10c0 4.5 2.7 5.5 5.3 5.8A2.7 2.7 0 0 0 9 17.9V21"/></svg>;
    case "whatsapp": return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.4 1.26 4.82L2 22l5.31-1.39A9.94 9.94 0 0 0 12 21.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04Zm0 18.1c-1.53 0-3.02-.41-4.33-1.18l-.31-.18-3.15.83.84-3.07-.2-.32A8.16 8.16 0 0 1 3.88 12c0-4.48 3.64-8.12 8.12-8.12 2.17 0 4.2.84 5.73 2.37A8.05 8.05 0 0 1 20.1 12c0 4.48-3.63 8.13-8.08 8.13Zm4.45-6.08c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.22-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.07 3.59.57.24 1.02.38 1.37.49.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.05-.1-.21-.16-.45-.28Z"/></svg>;
    default: return null;
  }
}

function TechLogo({ name, className = "h-5 w-5" }) {
  switch (name) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="9" ry="3.7" />
          <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "spring":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19.5 5.5c-6 .2-10.8 3.4-13 8.4 2.2 1.9 5.3 2.8 8.4 2.3 4.6-.8 7.7-4.4 8.1-10.7Z" fill="currentColor" stroke="none" />
          <path d="M8 14.4c2.8-1.2 5.5-3.3 8-6.2" stroke="#080810" />
        </svg>
      );
    case "azure":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M13.9 2.7 5.8 17.8h4.8L18.7 2.7Z" />
          <path d="m13.7 10.2 5.1 11.1H9.4Z" opacity="0.9" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <rect x="4" y="8" width="3" height="3" rx="0.5" />
          <rect x="7.5" y="8" width="3" height="3" rx="0.5" />
          <rect x="11" y="8" width="3" height="3" rx="0.5" />
          <rect x="7.5" y="4.5" width="3" height="3" rx="0.5" />
          <rect x="11" y="4.5" width="3" height="3" rx="0.5" />
          <path d="M3.3 13.4c.4 2.8 2.4 4.4 5.6 4.4h4.5c3.1 0 5.6-1.6 6.8-4.2-1.3.4-2.4.1-3.1-.5-.6-.5-.8-1.1-.9-1.8-.7.8-1.5 1.2-2.6 1.2H3.3Z" />
        </svg>
      );
    case "flutter":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M14.1 2.8 6 10.9l3 3 11.1-11.1Z" />
          <path d="m9 13.9 3.2 3.1 8-8.1h-6.1Z" opacity="0.95" />
          <path d="m12.2 17 2.8 2.8h-5.4l-1.3-1.3Z" opacity="0.78" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 4.5c1 1 .9 1.9 0 2.9-.7.9-.8 1.6.1 2.4" />
          <path d="M13 3c1.2 1 .9 2.1 0 3.2-.7.8-.7 1.5.2 2.2" />
          <path d="M7 11.5h8a0 0 0 0 1 0 0v2.4A3.1 3.1 0 0 1 11.9 17H10.1A3.1 3.1 0 0 1 7 13.9v-2.4a0 0 0 0 1 0 0Z" />
          <path d="M15 12h1.1a1.4 1.4 0 1 1 0 2.8H15" />
          <path d="M6 19c1.7 1 3.8 1.5 6 1.5s4.3-.5 6-1.5" />
        </svg>
      );
    case "angular":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M12 2.4 4.8 5l1.1 10L12 21.6l6.1-6.6 1.1-10Z" />
          <path fill="#080810" d="m12 6.4-3.6 8.8H10l.7-1.9h2.6l.7 1.9H15.6Zm-.1 3 1 2.7H11Z" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="9.2" ry="6.7" fill="currentColor" opacity="0.2" />
          <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="currentColor" fontFamily="Inter, sans-serif">php</text>
        </svg>
      );
    case "laravel":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 8.3 3.8-2.2 3.7 2.2v4.3l-3.7 2.2L5 12.6Z" />
          <path d="m12.5 8.2 3.7-2.1L20 8.3v4.3l-3.8 2.2-3.7-2.2Z" />
          <path d="M8.8 14.8v3.7l3.7 2.2 3.7-2.2v-3.7" />
        </svg>
      );
    case "dart":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M6.2 6.3 12 5l5.8 5.8-4.4 8.2H8.2L6.2 6.3Z" opacity="0.28" />
          <path d="M8.6 8.2 12 5l5.8 5.8H12Z" />
          <path d="m8.6 8.2 3.4 3.4v7.4L6.2 13.2Z" opacity="0.86" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2.4" fill="currentColor" />
          <text x="12" y="15.6" textAnchor="middle" fontSize="8.2" fontWeight="900" fill="#111827" fontFamily="Inter, sans-serif">JS</text>
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2.4" fill="currentColor" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="7.4" fontWeight="900" fill="#F8FAFC" fontFamily="Inter, sans-serif">TS</text>
        </svg>
      );
    case "devops":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 8c-2.3 0-4 1.7-4 4s1.7 4 4 4c1.4 0 2.6-.6 3.5-1.8l1-1.4C13.4 11 14.6 10.4 16 10.4c2.2 0 4 1.7 4 3.8S18.2 18 16 18c-1.4 0-2.6-.6-3.5-1.8l-1-1.4C10.6 13 9.4 12.4 8 12.4 5.8 12.4 4 14.1 4 16.2" />
          <path d="m17.8 8.2 2.2 2.2-2.2 2.2" />
        </svg>
      );
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="13.5" rx="2" />
          <path d="M3.5 9h17" />
          <path d="m10 12-2 2 2 2" />
          <path d="m14 12 2 2-2 2" />
        </svg>
      );
    case "backend":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="4.8" rx="1.4" />
          <rect x="4" y="10.2" width="16" height="4.8" rx="1.4" />
          <rect x="4" y="16.4" width="16" height="3.6" rx="1.4" />
          <path d="M8 6.4h.01M8 12.6h.01M8 18.2h.01" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6.2" cy="12" r="2.2" />
          <circle cx="17.8" cy="6.2" r="2.2" />
          <circle cx="17.8" cy="17.8" r="2.2" />
          <path d="M8.3 11.2 15.7 7M8.3 12.8 15.7 17" />
        </svg>
      );
    case "uiux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3.5 18.5 10 12 20.5 5.5 10 12 3.5Z" />
          <path d="M12 7.2v5.2" />
          <path d="M9.8 12.5 12 14.6l2.2-2.1" />
        </svg>
      );
    case "githubactions":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="7.2" cy="7.2" r="2.1" />
          <circle cx="16.8" cy="7.2" r="2.1" />
          <circle cx="12" cy="16.8" r="2.1" />
          <path d="M8.9 8.3 10.7 10M15.1 8.3 13.3 10M12 14.7v-2.3" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5c2.2 0 3.6 2.2 3.6 5.2 0 1.3-.2 2.5-.7 3.6-.6 1.5-1.6 2.4-2.9 2.4s-2.3-.9-2.9-2.4c-.5-1.1-.7-2.3-.7-3.6C8.4 7.2 9.8 5 12 5Z" />
          <path d="M9.6 18.2 8.1 20M14.4 18.2l1.5 1.8M10.3 8.8h.01M13.7 8.8h.01" />
          <path d="M10.7 11.6c.8.5 1.8.5 2.6 0" />
        </svg>
      );
    case "nginx":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M12 2.6 20 7v10L12 21.4 4 17V7Z" />
          <path fill="#0A0A0F" d="M9 16.9V7.5h1.5l4.5 5.4V7.5H15v8.7h-1.4L9.9 11v5.9Z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M12 2.8 21.2 12 12 21.2 2.8 12Z" />
          <path fill="#0A0A0F" d="M14.8 15.3a1.5 1.5 0 1 1-1.8-2v-2l-1.5-1.5a1.5 1.5 0 1 1 .8-.8l1.7 1.7V13a1.5 1.5 0 0 1 .8 2.3Z" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 15c2.5-4.6 6.2-6.7 10.8-6.5-1.4.8-2.1 1.8-2.4 2.8 1.5.1 2.7.7 3.6 1.8" />
          <path d="M5.5 15.2c.8 1 1.7 1.8 2.9 2.2M16.8 8.7l1.6-1.6M10.8 17.6l.8 1.6" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8.8 17.8c-1.8-1.6-2.7-3.8-2.6-6.5.1-3.8 2.5-6.1 5.6-6.1s5.2 2.2 5.2 5.8c0 2.5-.8 4.7-2.5 6.4" />
          <path d="M10.2 18.6c.9-.2 1.6-.7 2-1.4.3-.6.4-1.2.4-2V9.6c0-1.1.8-1.6 1.7-1.8" />
          <path d="M9.2 10.5c.9 0 1.5.7 1.5 1.6 0 .9-.6 1.6-1.5 1.6" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M12 3.3c2.2 2.3 3.5 5.3 3.5 8.6 0 4.1-1.8 6.9-3.5 8.8-1.7-1.9-3.5-4.7-3.5-8.8 0-3.3 1.3-6.3 3.5-8.6Z" />
          <path fill="#D1FAE5" d="M12 6.6c.6 1.2.9 2.6.9 4.3 0 2.7-.3 5-.9 7.4-.6-2.4-.9-4.7-.9-7.4 0-1.7.3-3.1.9-4.3Z" opacity="0.45" />
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M6.1 17.9 10.2 4.5c.2-.6 1-.7 1.3-.2l2.1 3.3Z" opacity="0.8" />
          <path fill="currentColor" d="m5.8 17.7 9.6-9.1c.4-.4 1.1-.2 1.2.4l1.6 8.7Z" />
          <path fill="#0A0A0F" d="M11.2 20.4 5.8 17.7l13.8-.1Z" opacity="0.22" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="M14.8 3.8H8.7a1.5 1.5 0 0 0-1.2.6L4.8 8.2c-.7.9-.1 2.2 1.1 2.2h4.6l-3.7 5.5c-.7 1 0 2.4 1.2 2.4H14a1.5 1.5 0 0 0 1.3-.7l2.9-4.5c.6-1 0-2.2-1.1-2.2h-4.8l3.6-5.2c.7-1 0-2.3-1.3-2.3Z" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="m6 8.4 6-2 6 2-6 2.1Z" />
          <path fill="currentColor" d="m6 11.8 6 2 6-2" opacity="0.88" />
          <path fill="currentColor" d="m6 15.2 6 2 6-2" opacity="0.72" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="currentColor" d="m17.8 3.8-7.4 7 4.5 4.1 3-1.8V3.8Z" />
          <path fill="currentColor" d="m7 8.3 3.4 2.5-3.4 2.9-2-1.3a1.3 1.3 0 0 1-.1-2.1Z" opacity="0.82" />
          <path fill="currentColor" d="M10.3 10.8 7 13.7l7 5.1 3.8-1.8V7.1Z" opacity="0.94" />
        </svg>
      );
    case "intellij":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="ij-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <path fill="url(#ij-grad)" d="M5 5h14v14H5Z" />
          <path fill="#0A0A0F" d="M8 8h8v8H8Z" />
          <text x="12" y="14.8" textAnchor="middle" fontSize="5.8" fontWeight="900" fill="#F8FAFC" fontFamily="Inter, sans-serif">IJ</text>
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="7.1" />
          <path d="m10.2 13.8 5.8-3.2" />
          <circle cx="10.1" cy="13.9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="8.2" y="3.2" width="7.6" height="5.4" rx="2.7" fill="#F24E1E" />
          <rect x="8.2" y="8.6" width="7.6" height="5.4" rx="2.7" fill="#A259FF" />
          <rect x="8.2" y="14" width="7.6" height="5.4" rx="2.7" fill="#0ACF83" />
          <rect x="4.4" y="3.2" width="7.6" height="5.4" rx="2.7" fill="#FF7262" />
          <circle cx="15.8" cy="11.3" r="3.8" fill="#1ABCFE" />
        </svg>
      );
    default:
      return <Icon name="code" className={className} />;
  }
}

function TechBadge({ name, variant = "marquee" }) {
  const tech = techCatalog[name] || techCatalog.default;
  return (
    <span
      className={`tech-badge ${variant === "skill" ? "tech-badge-skill" : "tech-badge-marquee"}`}
      style={{
        "--tech-color": tech.color,
        "--tech-ring": tech.ring,
        "--tech-glow": tech.glow,
        "--tech-bg": tech.bg,
      }}
      data-label={name}
      title={name}
      aria-label={name}
    >
      <TechLogo name={tech.icon} className={variant === "skill" ? "h-5 w-5" : "h-6 w-6"} />
      <span className="sr-only">{name}</span>
    </span>
  );
}

function TechTile({ name, compact = false }) {
  const tech = techCatalog[name] || techCatalog.default;
  return (
    <div
      className={`tech-tile${compact ? " tech-tile-compact" : ""}`}
      style={{
        "--tech-color": tech.color,
        "--tech-ring": tech.ring,
        "--tech-glow": tech.glow,
        "--tech-bg": tech.bg,
      }}
    >
      <div className="tech-tile-icon">
        <TechLogo name={tech.icon} className={compact ? "h-5 w-5" : "h-7 w-7"} />
      </div>
      <div className="tech-tile-label">{name}</div>
    </div>
  );
}

function ProgressiveImage({ sources, alt, className, style, onExhausted, loading = "lazy", fetchPriority = "auto", decoding = "async" }) {
  const validSources = Array.isArray(sources) ? sources.filter(Boolean) : [sources].filter(Boolean);
  const sourceKey = validSources.join("|");
  const [index, setIndex] = useState(0);
  const currentSrc = validSources[index] || validSources[0] || "";

  useEffect(() => {
    setIndex(0);
  }, [sourceKey]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      onError={() => {
        setIndex((current) => {
          if (current < validSources.length - 1) return current + 1;
          onExhausted?.();
          return current;
        });
      }}
    />
  );
}

function PortraitAvatar({ sources, alt, fallback, className = "", imageStyle }) {
  const [showFallback, setShowFallback] = useState(false);
  const sourceKey = Array.isArray(sources) ? sources.filter(Boolean).join("|") : String(sources || "");

  useEffect(() => {
    setShowFallback(false);
  }, [sourceKey, fallback]);

  if (!sourceKey || showFallback) {
    return (
      <div className={`portrait-avatar portrait-avatar-fallback ${className}`}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={`portrait-avatar ${className}`}>
      <ProgressiveImage
        sources={sources}
        alt={alt}
        className="portrait-avatar-image"
        style={imageStyle}
        onExhausted={() => setShowFallback(true)}
      />
    </div>
  );
}

function BrandMark({ variant = "nav" }) {
  const [showFallback, setShowFallback] = useState(false);
  const [index, setIndex] = useState(0);
  const currentSrc = brandLogoSources[index] || brandLogoSources[0];

  useEffect(() => {
    setShowFallback(false);
    setIndex(0);
  }, [variant]);

  if (showFallback) {
    return (
      <span className={`brand-mark-fallback brand-mark-fallback-${variant}`}>
        Pixel<span>Wave</span>
      </span>
    );
  }

  return (
    <span className={`brand-mark brand-mark-${variant}`}>
      <img
        src={currentSrc}
        alt="Logo PixelWave"
        className="brand-mark-image"
        loading="eager"
        onError={() => {
          setIndex((current) => {
            if (current < brandLogoSources.length - 1) return current + 1;
            setShowFallback(true);
            return current;
          });
        }}
      />
    </span>
  );
}

function TeamAvatar({ member }) {
  const [showFallback, setShowFallback] = useState(false);
  const sources = member.imageSources || [];
  const hasSources = Array.isArray(sources) ? sources.length > 0 : Boolean(sources);

  useEffect(() => {
    setShowFallback(false);
  }, [member.name, member.imageSources?.join?.("|")]);

  if (!hasSources || showFallback) {
    return (
      <div
        className="team-avatar-fallback"
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${member.accentFrom} 0%, ${member.accentTo} 100%)`,
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 800,
          color: "#09090E",
        }}
      >
        {member.initials}
      </div>
    );
  }

  return (
    <div
      className="team-avatar-fallback"
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        flexShrink: 0,
        overflow: "hidden",
        border: "1px solid rgba(201, 162, 39, 0.18)",
        boxShadow: "0 12px 28px rgba(0,0,0,.24), 0 0 0 1px rgba(255,255,255,.04) inset",
        background: "rgba(12,12,22,.9)",
      }}
    >
      <ProgressiveImage
        sources={sources}
        alt={member.imageAlt || member.name}
        className="team-avatar-image"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        onExhausted={() => setShowFallback(true)}
      />
    </div>
  );
}

/* ─── HOOKS ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("visible"));
      return undefined;
    }

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useProcessSectionReveal() {
  useEffect(() => {
    const section = document.querySelector(".process-section");
    if (!section) return undefined;

    if (prefersReducedMotion()) {
      section.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);
}

function usePremiumCursor() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return undefined;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const enterInteractive = () => document.body.classList.add("cursor-hover");
    const leaveInteractive = () => document.body.classList.remove("cursor-hover");
    const enterEditable = () => {
      document.body.classList.add("cursor-hidden", "cursor-text-mode");
      document.body.classList.remove("cursor-hover");
    };
    const leaveEditable = () => {
      document.body.classList.remove("cursor-hidden", "cursor-text-mode");
    };
    const pressCursor = () => document.body.classList.add("cursor-pressing");
    const releaseCursor = () => document.body.classList.remove("cursor-pressing");

    const interactiveElements = Array.from(
      document.querySelectorAll("a, button, .project-card, .service-card, .cta-primary, .cta-secondary, .wa-float")
    );
    const editableElements = Array.from(
      document.querySelectorAll("input, textarea, select, [contenteditable='true']")
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", enterInteractive);
      element.addEventListener("mouseleave", leaveInteractive);
      element.addEventListener("mousedown", pressCursor);
      element.addEventListener("mouseup", releaseCursor);
    });

    editableElements.forEach((element) => {
      element.addEventListener("mouseenter", enterEditable);
      element.addEventListener("mouseleave", leaveEditable);
      element.addEventListener("focus", enterEditable);
      element.addEventListener("blur", leaveEditable);
    });

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.remove("cursor-hidden");
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
    };

    const onLeave = () => {
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
      document.body.classList.remove("cursor-hover", "cursor-pressing", "cursor-hidden", "cursor-text-mode");
    };

    const onScroll = () => {
      document.body.classList.add("cursor-hidden");
      window.clearTimeout(onScroll.timeoutId);
      onScroll.timeoutId = window.setTimeout(() => {
        document.body.classList.remove("cursor-hidden");
      }, 120);
    };
    onScroll.timeoutId = 0;

    const tick = () => {
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;

      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(var(--cursor-dot-scale, 1))`;
      ring.style.transform = `translate3d(${ringX - 14}px, ${ringY - 14}px, 0) scale(var(--cursor-ring-scale, 1))`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", enterInteractive);
        element.removeEventListener("mouseleave", leaveInteractive);
        element.removeEventListener("mousedown", pressCursor);
        element.removeEventListener("mouseup", releaseCursor);
      });
      editableElements.forEach((element) => {
        element.removeEventListener("mouseenter", enterEditable);
        element.removeEventListener("mouseleave", leaveEditable);
        element.removeEventListener("focus", enterEditable);
        element.removeEventListener("blur", leaveEditable);
      });
      window.clearTimeout(onScroll.timeoutId);
      document.body.classList.remove("has-custom-cursor", "cursor-hover", "cursor-hidden", "cursor-text-mode", "cursor-pressing");
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("#services");
  useEffect(() => {
    const targets = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return active;
}

function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");

    if (!canvas || !parent || !context) return undefined;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.5 + Math.random(),
      alpha: 0.3 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.00055,
      speedY: (Math.random() - 0.5) * 0.00055,
      color: Math.random() > 0.35 ? "201,162,39" : "244,240,230",
      depth: 0.5 + Math.random() * 1.5,
    }));

    let width = 0;
    let height = 0;
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const onMove = (event) => {
      pointerX = (event.clientX - width / 2) * 0.02;
      pointerY = (event.clientY - height / 2) * 0.02;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > 1.05) particle.x = -0.05;
        if (particle.x < -0.05) particle.x = 1.05;
        if (particle.y > 1.05) particle.y = -0.05;
        if (particle.y < -0.05) particle.y = 1.05;

        const x = particle.x * width + pointerX * particle.depth;
        const y = particle.y * height + pointerY * particle.depth;

        context.beginPath();
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      frameId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}

/* ─── COUNTUP ─────────────────────────────────── */
function CountUp({ value, suffix, label }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }

    const el = ref.current; if (!el) return;
    let started = false, raf = 0;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1500, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * e));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: .5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="num-accent">{display}{suffix}</div>
      <div className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>{label}</div>
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  useEffect(() => { const h = () => setScrolled(scrollY > 20); h(); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="shell navbar-shell">
        {/* Logo */}
        <a href="/" aria-label="Accueil PixelWave">
          <BrandMark variant="nav" />
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hide-mobile" aria-label="Navigation principale">
          {navLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${isActive ? " is-active" : ""}`}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "var(--pw-white)" : "var(--pw-muted)",
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hide-mobile">
          <a href="#contact" className="cta-primary btn-primary" style={{ fontSize: 13, padding: "11px 24px" }}>Demander un devis</a>
        </div>

        {/* Hamburger */}
        <button type="button" aria-label={open ? "Fermer" : "Menu"}
          onClick={() => setOpen((v) => !v)}
          style={{ display: "none", width: 44, height: 44, borderRadius: "50%", alignItems: "center", justifyContent: "center", border: "1px solid var(--pw-border)", background: "rgba(255,255,255,.05)", color: "var(--pw-white)", cursor: "pointer" }}
          className="show-mobile-flex">
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 400 : 0, opacity: open ? 1 : 0,
        transition: `max-height .5s ${premiumEase}, opacity .4s ${premiumEase}`,
        borderTop: "1px solid var(--pw-border)", background: "rgba(8,8,16,.95)", backdropFilter: "blur(22px)",
      }}>
        <div className="shell" style={{ paddingTop: 16, paddingBottom: 20, display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              padding: "12px 16px", borderRadius: 14, fontSize: 15, fontWeight: 600,
              color: "var(--pw-muted)", transition: `background .2s ${premiumEase}, color .2s ${premiumEase}`,
            }}>{l.label}</a>
          ))}
          <a href="#contact" className="cta-primary btn-primary" style={{ marginTop: 8, textAlign: "center" }} onClick={() => setOpen(false)}>Demander un devis</a>
        </div>
      </div>

      <style>{`.show-mobile-flex { display: none !important; } @media(max-width:1023px){ .hide-mobile{display:none!important}.show-mobile-flex{display:flex!important} }`}</style>
    </header>
  );
}

/* ─── TECH STACK ─────────────────────────────────── */
function TechStackSection() {
  return (
    <section className="section">
      <div className="shell">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow">STACK & TECHNOLOGIES</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Des technologies{" "}
            <span className="text-shimmer">maîtrisées et bien choisies.</span>
          </h2>
          <p style={{ maxWidth: 720, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)" }}>
            Nous concevons des stacks cohérentes, lisibles et prêtes à produire vite: front-end moderne, back-end robuste, cloud propre et outils de livraison sérieux.
          </p>
        </div>

        <div className="tech-stack-wrap">
          {techSections.map((group, index) => (
            <div key={group.title} className={`tech-category-card reveal delay-${Math.min(index + 1, 5)}`}>
              <div className="tech-category-head">
                <span className="tech-category-eyebrow">{group.eyebrow}</span>
                <h3 className="tech-category-title">{group.title}</h3>
              </div>
              <div className="tech-tiles-grid">
                {group.items.map((item) => (
                  <TechTile key={`${group.title}-${item}`} name={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-divider" />
      </div>
    </section>
  );
}

function HeroShowcase() {
  const featuredProjects = projects.slice(0, 3);
  const [primary, secondary, tertiary] = featuredProjects;

  return (
    <div className="hero-showcase reveal delay-3">
      <div className="hero-showcase-topbar">
        <div>
          <div className="hero-showcase-kicker">Selection premium</div>
          <div className="hero-showcase-title">Présence premium, produit clair, image forte.</div>
        </div>
        <span className="hero-showcase-chip">Portfolio live</span>
      </div>

      <a
        href={primary.href}
        target="_blank"
        rel="noreferrer"
        className="hero-showcase-main"
        aria-label={`Voir le projet ${primary.title}`}
      >
        <ProgressiveImage
          sources={primary.imageSources || [primary.imageUrl]}
          alt={primary.imageAlt || primary.title}
          className="hero-showcase-main-image"
          style={{ objectPosition: primary.imagePosition || "center" }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="hero-showcase-main-overlay" />
        <div className="hero-showcase-main-copy">
          <span className="hero-showcase-project-type">{primary.type}</span>
          <h3>{primary.title}</h3>
          <p>{primary.summary}</p>
        </div>
      </a>

      <div className="hero-showcase-stack">
        {[secondary, tertiary].map((project) => (
          <a
            key={project.title}
            href={project.href || "#contact"}
            target={project.href ? "_blank" : undefined}
            rel="noreferrer"
            className="hero-showcase-mini"
            aria-label={`Découvrir ${project.title}`}
          >
            <ProgressiveImage
              sources={project.imageSources || [project.imageUrl]}
              alt={project.imageAlt || project.title}
              className="hero-showcase-mini-image"
              style={{ objectPosition: project.imagePosition || "center" }}
              loading="eager"
              fetchPriority="high"
            />
            <div className="hero-showcase-mini-overlay" />
            <div className="hero-showcase-mini-copy">
              <span>{project.type}</span>
              <strong>{project.title}</strong>
            </div>
          </a>
        ))}
      </div>

      <div className="hero-showcase-footer">
        {["Luxe", "Lead Gen", "Dashboards", "Mobile"].map((item) => (
          <span key={item} className="hero-showcase-chip is-soft">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ─────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Backgrounds */}
      <HeroParticles />
      <div className="grid-pattern" style={{ opacity: .52 }} />
      <div style={{ position: "absolute", left: "50%", top: "-18%", width: "clamp(320px,48vw,760px)", height: "clamp(320px,48vw,760px)", borderRadius: "50%", background: "rgba(201,162,39,.08)", filter: "blur(150px)", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-8%", bottom: "-10%", width: "clamp(280px,42vw,560px)", height: "clamp(280px,42vw,560px)", borderRadius: "50%", background: "rgba(108,63,232,.1)", filter: "blur(170px)", pointerEvents: "none" }} />
      {/* Decorative rings */}
      <div className="hero-ring" style={{ width: "clamp(400px,60vw,820px)", height: "clamp(400px,60vw,820px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring" style={{ width: "clamp(260px,40vw,580px)", height: "clamp(260px,40vw,580px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animationDelay: "3s" }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", inset: "auto 0 0", height: 140, background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />

      <div className="shell" style={{ position: "relative", zIndex: 10, paddingTop: 100, paddingBottom: 40 }}>
        <div className="hero-layout">
          <div className="hero-copy reveal">

            {/* Eyebrow */}
            <div className="hero-eyebrow-badge" style={{ display: "inline-flex" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--pw-gold)" }}>
                ✦&nbsp; AGENCE DIGITALE PREMIUM &nbsp;—&nbsp; CASABLANCA, MAROC
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              color: "var(--pw-white)",
              marginTop: 32,
            }}>
              <span style={{ display: "block" }}>Nous ne créons pas</span>
              <span style={{ display: "block", marginTop: 6 }}>
                des{" "}
                <em style={{ fontWeight: 600, fontSize: "1.04em", color: "var(--pw-gold-light)", letterSpacing: "-0.01em" }}>sites web.</em>
              </span>
              <span className="text-shimmer" style={{
                display: "block", marginTop: 6,
                fontFamily: "var(--font-display)", fontWeight: 800,
              }}>
                Nous créons des empires digitaux.
              </span>
            </h1>

            {/* Sub */}
            <p className="hero-lead">
              PixelWave conçoit des expériences digitales premium pour les marques qui veulent{" "}
              <em style={{ color: "var(--pw-gold-light)" }}>paraître plus fortes,</em>{" "}
              vendre mieux et imposer une présence en ligne irréprochable.
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <a href="#contact" className="cta-primary btn-primary" style={{ minWidth: 210 }}>Demander un devis</a>
              <a href="#projets" className="cta-secondary" style={{ minWidth: 210 }}>Voir nos réalisations</a>
            </div>

            <div className="hero-signal-grid">
              {heroHighlights.map((item) => (
                <div key={item} className="hero-signal-card">
                  <span className="hero-signal-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroShowcase />
        </div>

        {/* Stats */}
        <div className="reveal delay-2 hero-metrics-shell">
          <div className="hero-metrics-panel">
            {metrics.map((m, i) => (
              <div key={m.label} style={{ position: "relative" }}>
                {i > 0 && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 1, height: 48, background: "rgba(201,162,39,.12)" }} />}
                <CountUp value={m.value} suffix={m.suffix} label={m.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─────────────────────────────────── */
function ClientProofSection() {
  return (
    <section className="section">
      <div className="shell">
        <div className="trust-grid">
          <div className="reveal">
            <span className="eyebrow">TÉMOIGNAGES & COLLABORATIONS</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Une image forte, oui.{" "}
              <span className="text-gold-grad">Mais surtout une confiance plus immédiate.</span>
            </h2>
            <p style={{ marginTop: 18, maxWidth: 620, fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)" }}>
              Nos collaborations améliorent la perception, clarifient l'offre et rendent la prise de contact plus naturelle. Le design attire, mais la clarté et la crédibilité convertissent.
            </p>

            <div className="client-logo-wall">
              {clientLogos.map((client) => (
                <div key={client.name} className="client-logo-tile premium-card reveal">
                  <PortraitAvatar
                    sources={client.avatarSources}
                    alt={client.avatarAlt}
                    fallback={client.avatarFallback || client.mark}
                    className="client-logo-avatar"
                  />
                  <div>
                    <div className="client-logo-name">{client.name}</div>
                    <div className="client-logo-sector">{client.sector}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <article key={item.author} className={`testimonial-card premium-card reveal delay-${Math.min(index + 1, 4)}`}>
                <div className="testimonial-card-head">
                  <div className="testimonial-stars" aria-label={`${item.stars || 5} étoiles`}>
                    {Array.from({ length: item.stars || 5 }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>
                  <div className="testimonial-quote-mark">“</div>
                </div>
                <div className="testimonial-role">{item.role}</div>
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-meta">
                  <div className="testimonial-person">
                    <PortraitAvatar
                      sources={item.avatarSources}
                      alt={item.avatarAlt}
                      fallback={item.avatarFallback}
                      className="testimonial-avatar"
                      imageStyle={{ objectPosition: item.avatarPosition || "center" }}
                    />
                    <div className="testimonial-person-copy">
                      <strong>{item.person}</strong>
                      <span>{item.author}</span>
                    </div>
                  </div>
                  <span className="testimonial-proof">{item.proof}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }) {
  return (
    <article className={`premium-card service-card reveal delay-${delay}`} style={{ padding: 0 }}>
      <div className="service-media">
        <ProgressiveImage
          sources={service.imageSources || [service.imageUrl]}
          alt={service.imageAlt}
          className="service-image"
          style={{ objectPosition: service.imagePosition || "center" }}
        />
        <div className="service-media-overlay" />
        <div className="service-media-top">
          <span className="service-visual-chip">Visuel PixelWave</span>
          <span className="service-visual-chip is-muted">{service.visualTag}</span>
        </div>
        <div className="card-icon service-icon-float" style={{
          width: 56, height: 56, borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, rgba(201,162,39,.18), rgba(107,63,232,.18))",
          border: "1px solid rgba(201,162,39,.18)",
          color: "var(--pw-gold-light)",
        }}>
          <Icon name={service.icon} className="h-6 w-6" />
        </div>
      </div>

      <div className="service-card-body">
        <div className="service-accent-line" />
        <div className="service-card-meta">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--pw-gold)" }}>
            {service.sub}
          </div>
          <span className="service-kicker-pill">PixelWave</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2vw,22px)", fontWeight: 700, color: "var(--pw-white)", lineHeight: 1.2, marginBottom: 14 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--pw-muted)" }}>{service.description}</p>
      </div>
    </article>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">CE QUE NOUS FAISONS</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Nos <span className="text-gold-grad">Services</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "16px auto 0", fontSize: 16, lineHeight: 1.8, color: "var(--text-2)" }}>
            Chaque prestation est conçue pour aligner votre image, votre technologie et votre ambition.
          </p>
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))" }}>
          {services.map((s, i) => <ServiceCard key={s.title} service={s} delay={i + 1} />)}
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

/* ─── WHY ─────────────────────────────────── */
function ProcessSection() {
  return (
    <section className="process-section section section-alt">
      <div className="shell">
        <div className="process-intro" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">PROCESS PREMIUM</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Une méthode claire pour livrer{" "}
            <span className="text-shimmer">un rendu plus fort, plus net, plus crédible.</span>
          </h2>
          <p style={{ maxWidth: 700, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)" }}>
            Nous ne passons pas directement à l'exécution. Chaque mission suit un chemin précis pour aligner perception de marque, clarté commerciale et qualité technique.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className="process-card premium-card"
              style={{ "--process-delay": `${index * 100}ms` }}
            >
              <div className="process-card-top">
                <span className="process-number">{step.number}</span>
                <span className="process-icon">
                  <Icon name={step.icon} className="process-icon-glyph h-5 w-5" />
                </span>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-copy">{step.description}</p>
              <div className="process-points">
                {step.points.map((point, pointIndex) => (
                  <span
                    key={point}
                    className="process-pill"
                    style={{ "--pill-delay": `${pointIndex * 50}ms` }}
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section section-alt">
      <div className="shell" style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px),1fr))", alignItems: "start" }}>
        <div className="reveal">
          <span className="eyebrow">POURQUOI PIXELWAVE</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Une agence pensée pour les marques qui{" "}
            <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold-light)" }}>refusent le moyen.</em>
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.85, color: "var(--text-2)", maxWidth: 440 }}>
            Notre approche mêle direction artistique premium, exécution technique précise et compréhension du business pour transformer une simple présence web en un véritable actif de marque.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {reasons.map((item, i) => (
            <div key={item.title} className={`reveal premium-card delay-${i + 1}`} style={{ padding: "22px 24px" }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.25)", color: "var(--gold)",
                }}>
                  <Icon name="check" className="h-4 w-4" />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--gold-light)", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-2)" }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}

/* ─── PROJECTS ─────────────────────────────────── */
function ProjectCard({ project }) {
  const href = project.href || "#contact";
  const ctaLabel = project.ctaLabel || (project.href ? "Voir le projet live" : "Parler d'un projet similaire");
  const proofLabel = project.href ? "Version live disponible" : "Projet détaillé sur demande";

  return (
    <article className="project-card premium-card reveal group">
      <div className="project-img-wrap">
        <ProgressiveImage
          sources={project.imageSources || [project.imageUrl]}
          alt={project.imageAlt || project.title}
          className="project-img"
          style={{ objectPosition: project.imagePosition || "center" }}
        />
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
          <span className="project-badge">
            {!project.special && <span className="project-badge-dot" />}
            {project.badge}
          </span>
        </div>
        <div style={{ position: "absolute", left: 16, bottom: 16, zIndex: 2, fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(244,240,230,.76)" }}>
          {project.type}
        </div>
        <div className="project-overlay">
          <span className="project-label">Projet réalisé</span>
          <h3 className="project-overlay-title">{project.title}</h3>
          <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.75, color: "rgba(244,240,230,.8)" }}>{project.full}</p>
          <a href={href} target={project.href ? "_blank" : undefined} rel="noreferrer" className="project-inline-link">
            {ctaLabel} <span aria-hidden="true">{project.href ? "↗" : "→"}</span>
          </a>
        </div>
      </div>

      <div className="project-card-body">
        <div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-summary">{project.summary}</p>
        </div>

        <div className="project-results-wrap">
          <div className="project-results-label">{project.resultLead || "Résultats concrets"}</div>
          <div className="project-impact-grid">
            {(project.impacts || []).map((impact) => (
              <span key={impact} className="project-impact-pill">{impact}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 7 }}>
          {project.tags.map((t) => (
            <span key={t} className="tag-badge">{t}</span>
          ))}
        </div>

        <div className="project-card-footer">
          <a
            href={href}
            target={project.href ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={`Voir le projet ${project.title}`}
            className="project-card-cta"
          >
            <span>{ctaLabel}</span>
            <Icon name={project.href ? "link" : "arrow"} className="h-4 w-4" />
          </a>
          <span className="project-card-proof">{proofLabel}</span>
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projets" className="section">
      <div className="shell">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">NOS RÉALISATIONS</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Des projets conçus pour{" "}
            <span className="text-shimmer">marquer les esprits.</span>
          </h2>
          <p style={{ maxWidth: 640, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)" }}>
            Nous présentons ici des cas concrets: image renforcée, expérience plus claire, pilotage métier mieux structuré et CTA pensés pour déclencher l'action plus vite.
          </p>
        </div>
        <div className="projects-proof-strip reveal delay-1">
          {["Présence premium", "Conversion plus claire", "Web, mobile & ERP", "Déploiements concrets"].map((item) => (
            <span key={item} className="projects-proof-pill">{item}</span>
          ))}
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px),1fr))" }}>
          {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

/* ─── TEAM ─────────────────────────────────── */
function TeamSection() {
  return (
    <section id="equipe" className="section section-alt">
      <div className="shell">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">NOTRE ÉQUIPE</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Une cellule{" "}
            <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold-light)" }}>compacte, rapide</em>{" "}
            et exigeante.
          </h2>
        </div>

        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))" }}>
          {team.map((m) => (
            <article key={m.name} className="team-card reveal shadow-premium" style={{ padding: "clamp(24px,4vw,36px)", position: "relative", overflow: "hidden" }}>
              {/* Left gold bar */}
              <span style={{ position: "absolute", inset: "0 auto 0 0", width: 2, background: "linear-gradient(to bottom, var(--gold), var(--violet))" }} />
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <TeamAvatar member={m} />
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{m.name}</h3>
                  <p style={{ marginTop: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>{m.role}</p>
                </div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--text-2)", marginBottom: 20 }}>{m.bio}</p>
              <div className="team-skill-grid">
                {m.skills.map((s) => (
                  <TechTile key={s} name={s} compact />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────── */
function AboutSection() {
  return (
    <section id="a-propos" className="section">
      <div className="shell" style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px),1fr))", alignItems: "center" }}>
        <div className="reveal">
          <span className="eyebrow">À PROPOS</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            PixelWave transforme la{" "}
            <span className="text-gold-grad">clarté stratégique</span>{" "}
            en présence digitale mémorable.
          </h2>
          <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.85, color: "var(--text-2)" }}>
            Nous accompagnons les entreprises, studios et marques ambitieuses qui veulent un site à la hauteur de leur positionnement. Notre valeur ne tient pas seulement au design, mais à la cohérence entre message, perception, performance et impact commercial.
          </p>
          <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.85, color: "var(--text-2)" }}>
            Résultat : un site plus net, plus crédible, plus rapide et plus apte à soutenir une croissance durable. <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold-light)" }}>Basés à Casablanca, nous rayonnons à l'international.</em>
          </p>
        </div>

        <div className="reveal premium-card delay-2" style={{ padding: "clamp(20px,4vw,32px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {aboutStats.map((s) => (
              <div key={s.label} className="about-stat-card">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: "var(--gold-light)", marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-2)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section-alt">
      <div className="shell">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">FAQ PREMIUM</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "var(--text)", marginTop: 20, letterSpacing: "-0.03em" }}>
            Les questions qui reviennent{" "}
            <span className="text-gold-grad">avant de passer à l'action.</span>
          </h2>
          <p style={{ maxWidth: 700, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)" }}>
            Délais, méthode, refonte, accompagnement et lancement: voici ce que les marques ambitieuses veulent comprendre avant de confier leur présence digitale.
          </p>
        </div>

        <div className="faq-grid">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.question} className={`faq-item premium-card reveal delay-${Math.min(index + 1, 5)}${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIndex((current) => current === index ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─────────────────────────────────── */
function FinalCta() {
  return (
    <section className="section section-alt">
      <div className="shell">
        <div className="reveal corner-frame" style={{
          borderRadius: 28, overflow: "hidden", padding: "clamp(40px,7vw,72px) clamp(24px,6vw,64px)",
          textAlign: "center",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,.08), rgba(8,8,14,.95) 65%)",
          border: "1px solid rgba(201,168,76,.2)",
          boxShadow: "0 30px 70px rgba(0,0,0,.4)",
        }}>
          <span className="corner-accent top-right" />
          <span className="corner-accent bottom-left" />

          <span className="eyebrow">PRÊT À PASSER UN CAP</span>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.05em",
            fontSize: "clamp(30px,5vw,56px)", marginTop: 20, lineHeight: 1.1, maxWidth: 820, margin: "20px auto 0",
          }}>
            <span className="text-shimmer">Construisons une présence digitale qui impose instantanément votre valeur.</span>
          </h2>
          <p style={{ maxWidth: 580, margin: "22px auto 0", fontSize: 16, lineHeight: 1.85, color: "var(--text-2)" }}>
            Que vous lanciez une marque, repositionniez votre image ou vouliez un site plus puissant — PixelWave conçoit un rendu premium pensé pour performer dès sa mise en ligne.
          </p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <a href="#contact" className="cta-primary" style={{ minWidth: 210 }}>Demander un devis</a>
            <a href={whatsappAppointmentHref} target="_blank" rel="noreferrer" className="cta-secondary" style={{ minWidth: 210 }}>
              Planifier un appel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", projet: "", budget: "", delai: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.nom.trim()) nextErrors.nom = "Ajoutez votre nom.";
    if (!form.email.trim()) nextErrors.email = "Ajoutez votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Entrez un email valide.";
    if (!form.projet.trim()) nextErrors.projet = "Sélectionnez un type de projet.";
    if (!form.message.trim()) nextErrors.message = "Décrivez votre besoin.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: "Quelques champs sont à compléter avant l'envoi." });
      return;
    }

    const briefLines = [
      "Bonjour PixelWave,",
      "",
      "Je souhaite vous transmettre un brief projet :",
      `Nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.telephone || "Non renseigné"}`,
      `Type de projet : ${form.projet}`,
      `Budget indicatif : ${form.budget || "À définir"}`,
      `Délai souhaité : ${form.delai || "À définir"}`,
      "",
      "Message :",
      form.message,
    ];

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "pixelwave-website",
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Impossible d'envoyer votre demande pour le moment.");
      }

      setStatus({
        type: "success",
        message: payload.message || "Votre demande a bien été enregistrée. Nous revenons vers vous rapidement.",
      });
      setForm({ nom: "", email: "", telephone: "", projet: "", budget: "", delai: "", message: "" });
    } catch (error) {
      const whatsappHref = `https://wa.me/212776356930?text=${encodeURIComponent(briefLines.join("\n"))}`;
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      setStatus({
        type: "error",
        message: "Le contact direct a rencontré un souci. WhatsApp vient de s'ouvrir avec votre brief prérempli pour ne pas perdre votre demande.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="contact-showcase reveal">
          <div className="contact-showcase-brand">
            <span className="eyebrow">CONTACT</span>
            <h2 className="contact-showcase-heading">
              Donnons forme à votre{" "}
              <span className="text-gold-grad">prochain projet.</span>
            </h2>
            <p className="contact-showcase-copy">
              Partagez votre ambition, vos objectifs et le type d'expérience que vous souhaitez lancer. Nous revenons vers vous avec une direction claire, premium et orientée conversion.
            </p>
            <div className="contact-brand-actions">
              <a
                href="https://wa.me/212776356930"
                target="_blank"
                rel="noreferrer"
                className="contact-trust-pill"
              >
                <Icon name="badge" className="h-4 w-4" />
                <span>Service premium garanti</span>
              </a>
              <a
                href={whatsappAppointmentHref}
                target="_blank"
                rel="noreferrer"
                className="contact-booking-cta"
              >
                <Icon name="calendar" className="h-4 w-4" />
                <span>Planifier un appel WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="contact-showcase-column">
            <div className="contact-column-title">Contact rapide</div>
            <div className="contact-quick-list">
              {quickContactItems.map((item) => {
                const content = (
                  <>
                    <span className="contact-quick-icon">
                      <Icon name={item.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="contact-quick-label">{item.label}</div>
                      <div className="contact-quick-value">{item.value}</div>
                    </div>
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "Adresse" ? "_blank" : undefined}
                      rel="noreferrer"
                      className="contact-quick-item"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={item.label} className="contact-quick-item">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-showcase-column">
            <div className="contact-column-title">Suivez-nous</div>
            <div className="contact-social-grid">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir ${item.label} PixelWave`}
                  className="contact-social-tile"
                  style={{ "--social-bg": item.background, "--social-color": item.color }}
                  title={item.label}
                >
                  <Icon name={item.icon} className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-shell reveal delay-2">
          <div className="contact-form-head">
            <div>
              <div className="contact-form-kicker">Demande de projet</div>
              <h3 className="contact-form-title">Décrivez votre besoin, nous structurons la suite.</h3>
              <p className="contact-form-copy">
                Un message clair suffit pour démarrer. Nous analysons votre besoin, votre positionnement et le type d'expérience à produire.
              </p>
            </div>
            <div className="contact-form-assurances">
              {contactAssurances.map((item) => (
                <span key={item.label} className="contact-form-chip">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="contact-form-actions">
            <a href={whatsappAppointmentHref} target="_blank" rel="noreferrer" className="contact-inline-btn">
              <Icon name="calendar" className="h-4 w-4" />
              <span>Réserver un appel</span>
            </a>
            <a href="mailto:pixelwaves_digital@outlook.com" className="contact-inline-btn is-muted">
              <Icon name="mail" className="h-4 w-4" />
              <span>Préférer l'email</span>
            </a>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
              {[
                { id: "nom", type: "text", label: "Votre nom", required: true, icon: "badge" },
                { id: "email", type: "email", label: "Votre email", required: true, icon: "mail" },
              ].map(({ id, type, label, required, icon }) => (
                <div key={id} className={`field-group${errors[id] ? " has-error" : ""}`}>
                  <span className="field-icon" aria-hidden="true">
                    <Icon name={icon} className="h-4 w-4" />
                  </span>
                  <input id={id} name={id} type={type} placeholder=" " value={form[id]} onChange={update} className={`field-input${form[id] ? " has-value" : ""}`} required={required} />
                  <label htmlFor={id} className="field-label">{label}</label>
                  {errors[id] && <span className="field-error">{errors[id]}</span>}
                </div>
              ))}
            </div>
            <div className="field-group">
              <span className="field-icon" aria-hidden="true">
                <Icon name="phone" className="h-4 w-4" />
              </span>
              <input id="telephone" name="telephone" type="tel" placeholder=" " value={form.telephone} onChange={update} className={`field-input${form.telephone ? " has-value" : ""}`} />
              <label htmlFor="telephone" className="field-label">Téléphone</label>
            </div>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
              <div className={`field-group${errors.projet ? " has-error" : ""}`} style={{ position: "relative" }}>
                <span className="field-icon" aria-hidden="true">
                  <Icon name="code" className="h-4 w-4" />
                </span>
                <select id="projet" name="projet" value={form.projet} onChange={update} className={`field-input${form.projet ? " has-value" : ""}`} style={{ appearance: "none" }} required>
                  <option value="" disabled>Sélectionner</option>
                  <option>Site vitrine premium</option>
                  <option>Application web sur mesure</option>
                  <option>Application mobile</option>
                  <option>Hébergement & DevOps</option>
                  <option>Refonte digitale</option>
                </select>
                <label htmlFor="projet" className="field-label">Type de projet</label>
                <span className="field-select-caret" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--gold)" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                </span>
                {errors.projet && <span className="field-error">{errors.projet}</span>}
              </div>
              <div className="field-group" style={{ position: "relative" }}>
                <span className="field-icon" aria-hidden="true">
                  <Icon name="calendar" className="h-4 w-4" />
                </span>
                <select id="delai" name="delai" value={form.delai} onChange={update} className={`field-input${form.delai ? " has-value" : ""}`} style={{ appearance: "none" }}>
                  <option value="" disabled>Sélectionner</option>
                  <option>ASAP</option>
                  <option>Dans les 2 semaines</option>
                  <option>Dans le mois</option>
                  <option>Projet à planifier</option>
                </select>
                <label htmlFor="delai" className="field-label">Délai souhaité</label>
                <span className="field-select-caret" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--gold)" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                </span>
              </div>
            </div>
            <div className="field-group" style={{ position: "relative" }}>
              <span className="field-icon" aria-hidden="true">
                <Icon name="badge" className="h-4 w-4" />
              </span>
              <select id="budget" name="budget" value={form.budget} onChange={update} className={`field-input${form.budget ? " has-value" : ""}`} style={{ appearance: "none" }}>
                <option value="" disabled>Sélectionner</option>
                <option>Moins de 10k MAD</option>
                <option>10k – 25k MAD</option>
                <option>25k – 50k MAD</option>
                <option>50k+ MAD</option>
              </select>
              <label htmlFor="budget" className="field-label">Budget indicatif</label>
              <span className="field-select-caret" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--gold)" }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
              </span>
            </div>
            <div className={`field-group${errors.message ? " has-error" : ""}`}>
              <span className="field-icon field-icon-textarea" aria-hidden="true">
                <Icon name="mail" className="h-4 w-4" />
              </span>
              <textarea id="message" name="message" placeholder=" " value={form.message} onChange={update} className={`field-input textarea${form.message ? " has-value" : ""}`} required />
              <label htmlFor="message" className="field-label">Votre message</label>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
            {status.type !== "idle" && (
              <div className={`contact-form-status ${status.type === "success" ? "is-success" : "is-error"}`} aria-live="polite">
                <span className="contact-form-status-dot" aria-hidden="true" />
                <span>{status.message}</span>
              </div>
            )}
            <div className="contact-form-footer">
              <p className="contact-form-note">
                Brief structuré, prise de contact directe, retour clair sous 24h.
              </p>
              <button type="submit" className="contact-submit-btn cta-primary" disabled={isSubmitting}>
                <span>{isSubmitting ? "Envoi en cours..." : "Envoyer le brief"}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#07070F", paddingTop: 48, paddingBottom: 28, marginTop: 24 }}>
      <div className="shell">
        {/* Gold line */}
        <div className="glow-line" style={{ marginBottom: 40 }} />
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))" }}>
          {/* Brand */}
          <div>
            <a href="#top" aria-label="Retour en haut - PixelWave">
              <BrandMark variant="footer" />
            </a>
            <p style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.8, color: "var(--text-2)", maxWidth: 280 }}>
              Agence digitale premium à Casablanca. Design, technologie et stratégie pour des présences web qui inspirent confiance et ambition.
            </p>
            <p style={{ marginTop: 12, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--text-3)", fontStyle: "italic" }}>
              — Nous créons des empires digitaux.
            </p>
          </div>
          {/* Nav */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 18 }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} style={{ fontSize: 14, color: "var(--text-2)", transition: "color .2s", fontWeight: 500 }}>{l.label}</a>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 18 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--text-2)" }}>
              <a href="mailto:pixelwaves_digital@outlook.com" style={{ transition: "color .2s" }}>pixelwaves_digital@outlook.com</a>
              <a href="tel:+212776356930" style={{ transition: "color .2s" }}>+212 776-356930</a>
              <span>Casablanca, Maroc</span>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 36, paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex", flexWrap: "wrap", gap: 8,
          alignItems: "center", justifyContent: "center",
          fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text-3)",
        }}>
          © 2026 PixelWave. Tous droits réservés.
          <span>•</span>
          <a href="./mentions-legales.html" style={{ transition: "color .2s" }}>Mentions légales</a>
          <span>•</span>
          <a href="./confidentialite.html" style={{ transition: "color .2s" }}>Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── FLOATING WHATSAPP ─────────────────────────── */
function FloatingWA() {
  return (
    <a href="https://wa.me/212776356930" target="_blank" rel="noreferrer"
      aria-label="Contacter PixelWave sur WhatsApp"
      className="wa-float">
      <Icon name="whatsapp" className="h-8 w-8" />
    </a>
  );
}

function CustomCursor() {
  return (
    <>
      <div id="cursorDot" className="cursor-dot" aria-hidden="true" />
      <div id="cursorRing" className="cursor-ring" aria-hidden="true" />
    </>
  );
}

/* ─── APP ─────────────────────────────────── */
function App() {
  useReveal();
  useProcessSectionReveal();
  usePremiumCursor();
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ClientProofSection />
        <TechStackSection />
        <ServicesSection />
        <ProcessSection />
        <WhySection />
        <ProjectsSection />
        <TeamSection />
        <AboutSection />
        <FaqSection />
        <FinalCta />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
